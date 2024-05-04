package com.anntraders.order.sqs;


import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.*;

import com.anntraders.order.model.OrderExpense;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageQueueService {

    @Value("${app.config.message.queue.topic}")
    private String messageQueueTopic;

    private final AmazonSQS amazonSQSClient;

    public void createMessageQueue() {

        log.info("Creating message queue on AWS SQS");

        CreateQueueRequest request = new CreateQueueRequest();
        request.setQueueName(messageQueueTopic);

        try {
            CreateQueueResult queue = amazonSQSClient.createQueue(request);
            log.info("Create Queue Response {}", queue.getQueueUrl());
        } catch (QueueNameExistsException e) {
            log.error("Queue Name Exists {}", e.getErrorMessage());
        }

    }

    public void publishExpense(OrderExpense orderExpense) {
        try {
            GetQueueUrlResult queueUrl = amazonSQSClient.getQueueUrl(messageQueueTopic);
            log.info("Reading SQS Queue done: URL {}", queueUrl.getQueueUrl());
            String messageBody;
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                messageBody = objectMapper.writeValueAsString(orderExpense);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            SendMessageRequest sendMessageRequest = new SendMessageRequest();
            sendMessageRequest.setMessageBody(messageBody);
            sendMessageRequest.setMessageGroupId("UPDATE_PRODUCT_AMOUNT");
            sendMessageRequest.setMessageDeduplicationId(Base64.getEncoder().encodeToString(new Date().toString().getBytes(StandardCharsets.UTF_8)));
            sendMessageRequest.setQueueUrl(queueUrl.getQueueUrl());
            amazonSQSClient.sendMessage(sendMessageRequest);

        } catch (QueueDoesNotExistException | InvalidMessageContentsException e) {
            log.error("Queue does not exist {}", e.getMessage());
        }

    }
}

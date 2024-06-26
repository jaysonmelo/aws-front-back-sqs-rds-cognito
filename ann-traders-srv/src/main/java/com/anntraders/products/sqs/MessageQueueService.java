package com.anntraders.products.sqs;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.QueueDoesNotExistException;
import com.amazonaws.services.sqs.model.ReceiveMessageResult;

import com.anntraders.products.model.OrderExpense;
import com.anntraders.products.model.Product;
import com.anntraders.products.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageQueueService {

    @Autowired
    private ProductService productService;

    @Value("${app.config.message.queue.topic}")
    private String messageQueueTopic;

    private final AmazonSQS amazonSQSClient;

    @Scheduled(fixedDelay = 5000) //executes on every 5 second gap.
    public void receiveMessages() {
        try {
            String queueUrl = amazonSQSClient.getQueueUrl(messageQueueTopic).getQueueUrl();
            log.info("Reading SQS Queue done: URL {}", queueUrl);

            ReceiveMessageResult receiveMessageResult = amazonSQSClient.receiveMessage(queueUrl);

            if (!receiveMessageResult.getMessages().isEmpty()) {
                Message message = receiveMessageResult.getMessages().get(0);
                log.info("Incoming Message From SQS {}", message.getMessageId());
                log.info("Message Body {}", message.getBody());
                processInvoice(message.getBody());
                amazonSQSClient.deleteMessage(queueUrl, message.getReceiptHandle());
            }

        } catch (QueueDoesNotExistException e) {
            log.error("Queue does not exist {}", e.getMessage());
        }
    }

    private void processInvoice(String body) {
        log.info("Processing invoice generation and sending invoice emails from here..");
        ObjectMapper mapper = new ObjectMapper();
        OrderExpense orderExpense = new OrderExpense();
        try {
            orderExpense = mapper.readValue(body, OrderExpense.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Product product = productService.getProduct(orderExpense.getProductId());
        Integer totalItem = product.getTotalItem() - orderExpense.getAmount();
        product.setTotalItem(totalItem);
        product.setUpdatedBy("aws_queue_service");
        productService.updateProduct(product.getId(), product);
    }

}
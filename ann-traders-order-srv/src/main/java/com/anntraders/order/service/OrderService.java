package com.anntraders.order.service;

import com.anntraders.order.model.Order;
import com.anntraders.order.model.OrderExpense;
import com.anntraders.order.repository.OrderRepository;
import com.anntraders.order.sqs.MessageQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MessageQueueService messageQueueService;

    public Order saveOrder(Order order) {
        OrderExpense orderExpense = new OrderExpense(order.getProductId(), order.getAmount());
        messageQueueService.publishExpense(orderExpense);
        return orderRepository.save(order);
    }

    public Order getOrder(long productId) {
        return orderRepository.findById(productId).orElseThrow(() -> new RuntimeException("Not Found"));
    }

    public List<Order> getOrdersByUser(String user) {
        return orderRepository.getOrderByUser(user);
    }
}


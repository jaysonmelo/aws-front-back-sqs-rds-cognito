package com.anntraders.order.controller;

import com.anntraders.order.model.Order;
import com.anntraders.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public ResponseEntity<Order> saveProduct(@RequestBody Order order) {
        Order savedProduct = orderService.saveOrder(order);
      return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/order")
    public ResponseEntity<Order> getOrder(@RequestParam(name = "orderId") long orderId) {
        Order order = orderService.getOrder(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/orders")
    public List<Order> getOrders(@RequestParam(name = "createdBy") String user) {
        return orderService.getOrdersByUser(user);
    }



}

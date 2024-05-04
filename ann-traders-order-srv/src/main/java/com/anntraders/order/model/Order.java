package com.anntraders.order.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "order_product")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "created_by")
    private String createdBy;

}

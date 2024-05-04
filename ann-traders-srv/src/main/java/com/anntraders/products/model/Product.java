package com.anntraders.products.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "descripton")
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "total_item")
    private Integer totalItem;

    @Column(name = "updated_by")
    private String updatedBy;
}

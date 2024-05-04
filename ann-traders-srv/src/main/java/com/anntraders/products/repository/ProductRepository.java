package com.anntraders.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.anntraders.products.model.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM product WHERE product_name like %:productName%", nativeQuery = true)
    List<Product> getProductsByName(String productName);
}

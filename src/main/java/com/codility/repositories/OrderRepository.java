package com.codility.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codility.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	
	public Set<Order> findByUsername(String username);
	
}

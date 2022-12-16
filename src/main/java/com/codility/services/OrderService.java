package com.codility.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codility.models.Order;
import com.codility.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepo;

	public Set<Order> getOrdersByUsername(String username) {
		return orderRepo.findByUsername(username);
	}

	public Order saveOrder(Order order) {
		return orderRepo.save(order);
	}

	public Order getOrder(Long orderId) {
		return orderRepo.findById(orderId).orElse(null);
	}
}

package com.codility.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private OrderService orderService;

	public int getNumberOfItemsBought(String username) {
		return (int) orderService.getOrdersByUsername(username).stream()
				.map(order -> order.getItems().size())
				.reduce(0, (a, b) -> a + b);
	}
	
	public int getNumberOfOrdersPlaced(String username) {
		return orderService.getOrdersByUsername(username).size();
	}
}

package com.codility.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codility.models.Order;
import com.codility.services.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping("")
	public Order saveOrder(@RequestBody Order order) {
		return orderService.saveOrder(order);
	}
	
	@GetMapping("/{orderId}/items")
	public Map<String, Object> totalItemsBought(@PathVariable Long orderId) {
		Order order = orderService.getOrder(orderId);
		Map<String, Object> response = new HashMap<>();
		response.put("orderId", order.getOrderId());
		response.put("items", order.getItems());
		response.put("total", order.getItems().size());
		return response;
	}
}

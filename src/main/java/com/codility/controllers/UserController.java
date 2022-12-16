package com.codility.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codility.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/{username}/items/total")
	public Map<String, Integer> totalItemsBought(@PathVariable String username) {
		Map<String, Integer> response = new HashMap<>();
		response.put("totalItemsBought", userService.getNumberOfItemsBought(username));
		return response;
	}
	
	@GetMapping("/{username}/orders/total")
	public Map<String, Integer> totalOrdersPlaced(@PathVariable String username) {
		Map<String, Integer> response = new HashMap<>();
		response.put("totalOrdersPlaced", userService.getNumberOfOrdersPlaced(username));
		return response;
	}
}

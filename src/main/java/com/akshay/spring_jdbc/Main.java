package com.akshay.spring_jdbc;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class Main {

	public static void main(String[] args) {
		ApplicationContext context = new AnnotationConfigApplicationContext(JdbcTemplateConfig.class);
		JdbcTemplate jdbcTemplate = context.getBean("getJdbcTemplate", JdbcTemplate.class);

		String query = "create table if not exists person(id int primary key, name text, age int)";
		jdbcTemplate.execute(query);
	}
}

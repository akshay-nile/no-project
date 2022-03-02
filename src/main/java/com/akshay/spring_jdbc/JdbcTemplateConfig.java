package com.akshay.spring_jdbc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class JdbcTemplateConfig {

	@Bean
	public JdbcTemplate getJdbcTemplate() {
		DriverManagerDataSource ds = new DriverManagerDataSource();
		ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
		ds.setUrl("jdbc:mysql://192.168.43.154:3306/test");
		ds.setUsername("root");
		ds.setPassword("root");

		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		jdbcTemplate.setDataSource(ds);

		return jdbcTemplate;
	}
}

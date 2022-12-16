package com.codility.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codility.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>  {
	
}

package com.velankani.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velankani.dao.UserDAO;
import com.velankani.hibernateModel.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDAO userDAO;
	
	@Transactional
	public void addUser(User user) {
		// TODO Auto-generated method stub
		
		userDAO.addUser(user);
		
	}

	@Transactional
	public List<User> getUsers() {
		// TODO Auto-generated method stub
		return userDAO.getUsers();
	}

}

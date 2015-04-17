package com.velankani.service;


import java.util.List;

import com.velankani.hibernateModel.User;

public interface UserService {

	public void addUser(User user);
	public List<User> getUsers();
}

package com.velankani.dao;


import java.util.List;

import com.velankani.hibernateModel.User;

public interface UserDAO {
	public void addUser(User user);
	public List<User> getUsers();
}

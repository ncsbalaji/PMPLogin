package com.velankani.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.velankani.hibernateModel.User;
@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
    private SessionFactory sessionFactory;
	
	
	public void addUser(User user) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(user);
	}


	public List<User> getUsers() {
		// TODO Auto-generated method stub
		List<User> users = this.sessionFactory.getCurrentSession().createQuery("from User").list();
		return users;
	}

}

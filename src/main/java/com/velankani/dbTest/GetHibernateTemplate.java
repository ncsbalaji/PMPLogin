package com.velankani.dbTest;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;

public class GetHibernateTemplate {
	
	HibernateTemplate template;
	public void setSessionFactory(SessionFactory sessionFactory){
		this.template = new HibernateTemplate(sessionFactory);
	}

}

package com.velankani.dbTest;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.velankani.hibernateModel.Customer;
import com.velankani.hibernateModel.Project;
import com.velankani.hibernateModel.ProjectStatus;
import com.velankani.hibernateModel.User;


public class DbInit{

	/**
	 * @param args
	 */	
	public static void InitiateNewDatabase() {/*
		// TODO Auto-generated method stub
		ClassPathXmlApplicationContext factory = new ClassPathXmlApplicationContext("dispatcher-servlet.xml");
		GetHibernateTemplate gTemplate = (GetHibernateTemplate)factory.getBean("hibernateTemplate");
		HibernateTemplate hTemplate=gTemplate.template;	
		//used to initiate database
		
		
		//adding users
		User user1 = new User("Chetan", "Rekha","otherdetails","java","otherdetails1","otherdetails2");
		User user2 = new User("Afsar", "Rekha","otherdetails","java","otherdetails1","otherdetails2"); 
		User user3 = new User("Rekha", "RajSingh","otherdetails","java","otherdetails1","otherdetails2");
		User user4 = new User("Mari", "RajSingh","otherdetails","java","otherdetails1","otherdetails2");
		hTemplate.save(user1);
		hTemplate.save(user2);
		hTemplate.save(user3);
		hTemplate.save(user4);
		
		//adding Clients
	    Client client1 = new Client("Cisco");
		Client client2 = new Client("Infinera");
		Client client3 = new Client("Airwana");
		Client client4 = new Client("TCL");
		hTemplate.save(client1);
		hTemplate.save(client2);
		hTemplate.save(client3);
		hTemplate.save(client4);
		
		
		
		Customer customer1 = new Customer("Cisco","ciscoPOC@cisco.com","Banglaore");
		Customer customer2 = new Customer("Infinera","InfineraPOC@Infinera.com","Banglaore");
		Customer customer3 = new Customer("Airvana ","AirvanaPOC@Airvana.com","Banglaore");
		Customer customer4 = new Customer("TATA","TATApoc@Airvana.com","Banglaore");
		hTemplate.save(customer1);
		hTemplate.save(customer2);
		hTemplate.save(customer3);
		hTemplate.save(customer4);
		
		
		
		//adding Projects
		Project project1 = new Project("project1","customer1","Rekha","sowRef1","customerPOC1","projectDetails1",
				"NMS","15-03-2015", "25-03-2015",1,2,client1);
		Project project2 = new Project("project2","customer2","Rekha","sowRef2","customerPOC2","projectDetails2",
				"NMS","15-03-2015", "25-03-2015",1,2,client1);
		Project project3 = new Project("project3","customer3","Mari","sowRef1","customerPOC2","projectDetails3",
				"EMS","15-03-2015", "25-03-2015",3,2,client3);
		Project project4 = new Project("project4","customer4","Mari","sowRef2","customerPOC1","projectDetails4",
				"EMS","15-03-2015", "25-03-2015",3,2,client3);
		hTemplate.save(project1);
		hTemplate.save(project2);
		hTemplate.save(project3);
		hTemplate.save(project4);
		
		//adding projectStatus
		//for project1
		ProjectStatus projectStatus1 = new ProjectStatus("OSS","Overall Risk","red","status1","comment1",1,project1);
		ProjectStatus projectStatus2 = new ProjectStatus("OSS","People","green","status2","comment3",1,project1);
		ProjectStatus projectStatus3 = new ProjectStatus("OSS","Schedule","yellow","status3","comment3",1,project1);
		ProjectStatus projectStatus4 = new ProjectStatus("OSS","Effort","gray","status4","comment4",1,project1);
		ProjectStatus projectStatus5 = new ProjectStatus("OSS","SLA","red","status5","comment5",1,project1);
		ProjectStatus projectStatus6 = new ProjectStatus("OSS","Others(Specifics)","green","status2","comment3",1,project1);
		ProjectStatus projectStatus7 = new ProjectStatus("OSS","Financials","yellow","status3","comment3",1,project1);
		ProjectStatus projectStatus8 = new ProjectStatus("OSS","Staffing","gray","status4","comment4",1,project1);
		ProjectStatus projectStatus9 = new ProjectStatus("OSS","Risk","red","status5","comment5",1,project1);
		
		//for project2
		ProjectStatus projectStatus10 = new ProjectStatus("BSS","Overall Risk","red","status1","comment1",2,project2);
		ProjectStatus projectStatus11 = new ProjectStatus("BSS","People","green","status2","comment3",2,project2);
		ProjectStatus projectStatus12 = new ProjectStatus("BSS","Schedule","yellow","status3","comment3",2,project2);
		ProjectStatus projectStatus13 = new ProjectStatus("BSS","Effort","gray","status4","comment4",2,project2);
		ProjectStatus projectStatus14 = new ProjectStatus("BSS","SLA","red","status5","comment5",2,project2);
		ProjectStatus projectStatus15 = new ProjectStatus("BSS","Others(Specifics)","green","status2","comment3",2,project2);
		ProjectStatus projectStatus16 = new ProjectStatus("BSS","Financials","yellow","status3","comment3",2,project2);
		ProjectStatus projectStatus17 = new ProjectStatus("BSS","Staffing","gray","status4","comment4",2,project2);
		ProjectStatus projectStatus18 = new ProjectStatus("BSS","Risk","red","status5","comment5",2,project2);
		
		//for project3
		ProjectStatus projectStatus19 = new ProjectStatus("BSS","Risk","red","status5","comment5",3,project3);
		
		hTemplate.save(projectStatus1);
		hTemplate.save(projectStatus2);
		hTemplate.save(projectStatus3);
		hTemplate.save(projectStatus4);
		hTemplate.save(projectStatus5);
		hTemplate.save(projectStatus6);
		hTemplate.save(projectStatus7);
		hTemplate.save(projectStatus8);
		hTemplate.save(projectStatus9);
		hTemplate.save(projectStatus10);
		hTemplate.save(projectStatus11);
		hTemplate.save(projectStatus12);
		hTemplate.save(projectStatus13);
		hTemplate.save(projectStatus14);
		hTemplate.save(projectStatus15);
		hTemplate.save(projectStatus16);
		hTemplate.save(projectStatus17);
		hTemplate.save(projectStatus18);
		hTemplate.save(projectStatus19);
		
	*/
		// TODO Auto-generated method stub
				ClassPathXmlApplicationContext factory = new ClassPathXmlApplicationContext("dispatcher-servlet.xml");
				GetHibernateTemplate gTemplate = (GetHibernateTemplate)factory.getBean("hibernateTemplate");
				HibernateTemplate hTemplate=gTemplate.template;	
				//used to initiate database
				
				
				//adding users
				User user1 = new User("Ramu", "RajSingh","otherdetails","java","otherdetails1","otherdetails2");
				User user2 = new User("Venkatesh", "RajSingh","otherdetails","java","otherdetails1","otherdetails2"); 
				User user3 = new User("Rekha", "RajSingh","otherdetails","java","otherdetails1","otherdetails2");
				User user4 = new User("Mari", "RajSingh","otherdetails","java","otherdetails1","otherdetails2");
				hTemplate.save(user1);
				hTemplate.save(user2);
				hTemplate.save(user3);
				hTemplate.save(user4);
				
				//adding Clients
			    /*Client client1 = new Client("Cisco");
				Client client2 = new Client("Infinera");
				Client client3 = new Client("Airwana");
				Client client4 = new Client("TCL");
				hTemplate.save(client1);
				hTemplate.save(client2);
				hTemplate.save(client3);
				hTemplate.save(client4);*/
				
				
				
				Customer customer1 = new Customer("Cisco","ciscoPOC@cisco.com","Banglaore");
				Customer customer2 = new Customer("Infinera","InfineraPOC@Infinera.com","Banglaore");
				Customer customer3 = new Customer("Airvana ","AirvanaPOC@Airvana.com","Banglaore");
				Customer customer4 = new Customer("TATA","TATApoc@Airvana.com","Banglaore");
				hTemplate.save(customer1);
				hTemplate.save(customer2);
				hTemplate.save(customer3);
				hTemplate.save(customer4);
				
				
				
				//adding Projects
				Project project1 = new Project("project1","customer1","Rekha","sowRef1","customerPOC1","projectDetails1",
						"NMS","15-03-2015", "25-03-2015",1,2,customer1);
				Project project2 = new Project("project2","customer2","Rekha","sowRef2","customerPOC2","projectDetails2",
						"NMS","15-03-2015", "25-03-2015",1,2,customer1);
				Project project3 = new Project("project3","customer3","Mari","sowRef1","customerPOC2","projectDetails3",
						"EMS","15-03-2015", "25-03-2015",3,2,customer3);
				Project project4 = new Project("project4","customer4","Mari","sowRef2","customerPOC1","projectDetails4",
						"EMS","15-03-2015", "25-03-2015",3,2,customer3);
				hTemplate.save(project1);
				hTemplate.save(project2);
				hTemplate.save(project3);
				hTemplate.save(project4);
				
				//adding projectStatus
				//for project1
				ProjectStatus projectStatus1 = new ProjectStatus("OSS","Overall Risk","red","status1","comment1",1,1,project1);
				ProjectStatus projectStatus2 = new ProjectStatus("OSS","People","green","status2","comment3",1,1,project1);
				ProjectStatus projectStatus3 = new ProjectStatus("OSS","Schedule","yellow","status3","comment3",1,1,project1);
				ProjectStatus projectStatus4 = new ProjectStatus("OSS","Effort","gray","status4","comment4",1,1,project1);
				ProjectStatus projectStatus5 = new ProjectStatus("OSS","SLA","red","status5","comment5",1,1,project1);
				ProjectStatus projectStatus6 = new ProjectStatus("OSS","Others(Specifics)","green","status2","comment3",1,1,project1);
				ProjectStatus projectStatus7 = new ProjectStatus("OSS","Financials","yellow","status3","comment3",1,1,project1);
				ProjectStatus projectStatus8 = new ProjectStatus("OSS","Staffing","gray","status4","comment4",1,1,project1);
				ProjectStatus projectStatus9 = new ProjectStatus("OSS","Risk","red","status5","comment5",1,1,project1);
				
				//for project2
				ProjectStatus projectStatus10 = new ProjectStatus("BSS","Overall Risk","red","status1","comment1",2,1,project2);
				ProjectStatus projectStatus11 = new ProjectStatus("BSS","People","green","status2","comment3",2,1,project2);
				ProjectStatus projectStatus12 = new ProjectStatus("BSS","Schedule","yellow","status3","comment3",2,1,project2);
				ProjectStatus projectStatus13 = new ProjectStatus("BSS","Effort","gray","status4","comment4",2,1,project2);
				ProjectStatus projectStatus14 = new ProjectStatus("BSS","SLA","red","status5","comment5",2,1,project2);
				ProjectStatus projectStatus15 = new ProjectStatus("BSS","Others(Specifics)","green","status2","comment3",2,1,project2);
				ProjectStatus projectStatus16 = new ProjectStatus("BSS","Financials","yellow","status3","comment3",2,1,project2);
				ProjectStatus projectStatus17 = new ProjectStatus("BSS","Staffing","gray","status4","comment4",2,1,project2);
				ProjectStatus projectStatus18 = new ProjectStatus("BSS","Risk","red","status5","comment5",2,1,project2);
				
				//for project3
				ProjectStatus projectStatus20 = new ProjectStatus("BSS","Overall Risk","red","status1","comment1",3,1,project3);
				ProjectStatus projectStatus21 = new ProjectStatus("BSS","People","green","status2","comment3",3,1,project3);
				ProjectStatus projectStatus22 = new ProjectStatus("BSS","Schedule","yellow","status3","comment3",3,1,project3);
				ProjectStatus projectStatus23 = new ProjectStatus("BSS","Effort","gray","status4","comment4",3,1,project3);
				ProjectStatus projectStatus24 = new ProjectStatus("BSS","SLA","red","status5","comment5",3,1,project3);
				ProjectStatus projectStatus25 = new ProjectStatus("BSS","Others(Specifics)","green","status2","comment3",3,1,project3);
				ProjectStatus projectStatus26 = new ProjectStatus("BSS","Financials","yellow","status3","comment3",3,1,project3);
				ProjectStatus projectStatus27 = new ProjectStatus("BSS","Staffing","gray","status4","comment4",3,1,project3);
				ProjectStatus projectStatus19 = new ProjectStatus("BSS","Risk","red","status5","comment5",3,1,project3);
				
				
				//for project4
				ProjectStatus projectStatus28 = new ProjectStatus("BSS","Overall Risk","red","status1","comment1",4,1,project4);
				ProjectStatus projectStatus29 = new ProjectStatus("BSS","People","green","status2","comment3",4,1,project4);
				ProjectStatus projectStatus30 = new ProjectStatus("BSS","Schedule","yellow","status3","comment3",4,1,project4);
				ProjectStatus projectStatus31 = new ProjectStatus("BSS","Effort","gray","status4","comment4",4,1,project4);
				ProjectStatus projectStatus32 = new ProjectStatus("BSS","SLA","red","status5","comment5",4,1,project4);
				ProjectStatus projectStatus33 = new ProjectStatus("BSS","Others(Specifics)","green","status2","comment3",4,1,project4);
				ProjectStatus projectStatus34 = new ProjectStatus("BSS","Financials","yellow","status3","comment3",4,1,project4);
				ProjectStatus projectStatus35 = new ProjectStatus("BSS","Staffing","gray","status4","comment4",4,1,project4);
				ProjectStatus projectStatus36 = new ProjectStatus("BSS","Risk","red","status5","comment5",4,1,project4);
				
				hTemplate.save(projectStatus1);
				hTemplate.save(projectStatus2);
				hTemplate.save(projectStatus3);
				hTemplate.save(projectStatus4);
				hTemplate.save(projectStatus5);
				hTemplate.save(projectStatus6);
				hTemplate.save(projectStatus7);
				hTemplate.save(projectStatus8);
				hTemplate.save(projectStatus9);
				hTemplate.save(projectStatus10);
				hTemplate.save(projectStatus11);
				hTemplate.save(projectStatus12);
				hTemplate.save(projectStatus13);
				hTemplate.save(projectStatus14);
				hTemplate.save(projectStatus15);
				hTemplate.save(projectStatus16);
				hTemplate.save(projectStatus17);
				hTemplate.save(projectStatus18);
				hTemplate.save(projectStatus19);
				hTemplate.save(projectStatus20);
				hTemplate.save(projectStatus21);
				hTemplate.save(projectStatus22);
				hTemplate.save(projectStatus23);
				hTemplate.save(projectStatus24);
				hTemplate.save(projectStatus25);
				hTemplate.save(projectStatus26);
				hTemplate.save(projectStatus27);
				hTemplate.save(projectStatus28);
				hTemplate.save(projectStatus29);
				hTemplate.save(projectStatus30);
				hTemplate.save(projectStatus31);
				hTemplate.save(projectStatus32);
				hTemplate.save(projectStatus33);
				hTemplate.save(projectStatus34);
				hTemplate.save(projectStatus35);
				hTemplate.save(projectStatus36);
		}
	
	public static void main(String args[]){
		
		InitiateNewDatabase();
		
		/*ClassPathXmlApplicationContext factory = new ClassPathXmlApplicationContext("dispatcher-servlet.xml");
		GetHibernateTemplate gTemplate = (GetHibernateTemplate)factory.getBean("hibernateTemplate");
		HibernateTemplate hTemplate=gTemplate.template;	
		
		

		// TODO Auto-generated method stub
		
		Session session = hTemplate.getSessionFactory().openSession();
		Transaction tx = session.beginTransaction();
		
		DetachedCriteria maxWeekCount = DetachedCriteria.forClass(ProjectStatus.class)
										.setProjection(Projections.max("weekCount"))
										.add(Property.forName("project_ProjectStatus_Id").eq(7l));
		@SuppressWarnings("unchecked")
		List<ProjectStatus> psList = session.createCriteria(ProjectStatus.class)
				.add(Property.forName("weekCount").eq(maxWeekCount))
				.add(Restrictions.eq("project_ProjectStatus_Id", 7l))
				.list();
		
		for(ProjectStatus ps : psList){
			System.out.println(ps.getProjectStatusId()+","+ps.getArea()+","+ps.getComment()+","+ps.getDepartment()+","+ps.getProject_ProjectStatus_Id());
		}
		
		
		session.save(project);
		
		
		tx.commit();
		session.close();*/
		
	
		/*List<Client> clients =  hTemplate.find(" from Client");
		for(Client client: clients){
			System.out.println(client.getClientName());
			for(Project project: client.getProjects()){
				System.out.println(project.getProjectName());
				
				for(ProjectStatus projectStatus: project.getProjectStatusList()){
					
					System.out.println(projectStatus.getDepartment());
					
				}
				
			}
		}*/
	}

}

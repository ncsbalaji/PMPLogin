package com.velankani.dao;
/**
 * @author Chetan.Nekkanti
 */
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.velankani.hibernateModel.Customer;
import com.velankani.hibernateModel.Project;
import com.velankani.hibernateModel.ProjectStatus;
import com.velankani.viewPojo.CustomerDetails;
import com.velankani.viewPojo.LogisticsFormData;
import com.velankani.viewPojo.ProjectStatusView;

@Repository
public class ProjectDAOImpl implements ProjectDAO {
	
	@Autowired
    private SessionFactory sessionFactory;

	public void addProject(Project project) {
		// TODO Auto-generated method stub
		ProjectStatus projectStatus1 = new ProjectStatus("OSS","Overall Risk","green","status1",null, 1,project.dummyWeakCount,null);
		ProjectStatus projectStatus2 = new ProjectStatus("OSS","People","green","status2",null, 1,project.dummyWeakCount,null);
		ProjectStatus projectStatus3 = new ProjectStatus("OSS","Schedule","green","status3", null, 1,project.dummyWeakCount,null);
		ProjectStatus projectStatus4 = new ProjectStatus("OSS","Effort","green","status4",null, 1,project.dummyWeakCount,null);
		ProjectStatus projectStatus5 = new ProjectStatus("OSS","SLA","green","status5",null, 1,project.dummyWeakCount,null);
		ProjectStatus projectStatus6 = new ProjectStatus("OSS","Others(Specifics)","green","status2",null, 1, project.dummyWeakCount,null);
		ProjectStatus projectStatus7 = new ProjectStatus("OSS","Financials","green","status3",null,1, project.dummyWeakCount,null);
		ProjectStatus projectStatus8 = new ProjectStatus("OSS","Staffing","green","status4",null,1, project.dummyWeakCount,null);
		ProjectStatus projectStatus9 = new ProjectStatus("OSS","Risk","green","status5",null, 1,project.dummyWeakCount,null);
		List<ProjectStatus> projectStatusList = new ArrayList<ProjectStatus>();
		projectStatusList.add(projectStatus1);
		projectStatusList.add(projectStatus2);
		projectStatusList.add(projectStatus3);
		projectStatusList.add(projectStatus4);
		projectStatusList.add(projectStatus5);
		projectStatusList.add(projectStatus6);
		projectStatusList.add(projectStatus7);
		projectStatusList.add(projectStatus8);
		projectStatusList.add(projectStatus9);
		
		System.out.println("week count in dao layer:"+project.dummyWeakCount);
		
		project.setProjectStatusList(projectStatusList);
		
		this.sessionFactory.getCurrentSession().save(project);
	}

	public List<Project> getAllProjects() {
		@SuppressWarnings("unchecked")
		List<Project> projects = this.sessionFactory.getCurrentSession().createQuery("from Project").list();
		
		System.out.println("------"+projects.get(0).getCustomerName());
		System.out.println(projects.size());
		return projects;
	}
	
	public List<ProjectStatus> getAllProjectStatus() {
		@SuppressWarnings("unchecked")
		List<ProjectStatus> projectStatusList = this.sessionFactory.getCurrentSession().createQuery("from ProjectStatus").list();
		
		System.out.println("------"+projectStatusList.get(0).getDepartment());
		System.out.println(projectStatusList.size());
		return projectStatusList;
	}

	public void doBatchUpdate(List<ProjectStatusView> projects) {
		// TODO Auto-generated method stub
		
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		
		int count = projects.size();
		
		for(ProjectStatusView psv: projects){
			
			Query query = session.createQuery(" update ProjectStatus set rag= :rag, comment= :comment "
					+ "where projectStatusId= :projectStatusId ");
			query.setParameter("rag", psv.rag);
			query.setParameter("comment", psv.comment);
			query.setParameter("projectStatusId", psv.id);
			
			query.executeUpdate();
			
			if(count % 10 == 0){
				session.flush();
				session.clear();
			}
			
		}
		
		tx.commit();
		session.close();
		
	}

	public List<Customer> getTreeData() {
		@SuppressWarnings("unchecked")
		List<Customer> clients = this.sessionFactory.getCurrentSession().createQuery(" from Customer").list();
		System.out.println("----------"+clients.get(0).getCustomerName());
		System.out.println(clients.size());
		return clients;
	}

	public void deleteProject(Long projectId) {
		// TODO Auto-generated method stub
		
	}

	public List<Customer> getCustomers() {
		@SuppressWarnings("unchecked")
		List<Customer> customers = this.sessionFactory.getCurrentSession().createQuery("from Customer").list();
		System.out.println("----------"+customers.get(0).getCustomerName());
		return customers;
	}
	
	public List<ProjectStatusView> getProjectStatus(String projectId, String weekCount){
		
		@SuppressWarnings("unchecked")
		List<ProjectStatus> psList = this.sessionFactory.getCurrentSession().
									createQuery(" from ProjectStatus"
											+ " where "
											+ "project_ProjectStatus_Id= :project_ProjectStatus_Id "
											+ " and weekCount= :weekCount ").
									setParameter("project_ProjectStatus_Id", Long.parseLong(projectId)).
									setParameter("weekCount", Integer.parseInt(weekCount)).
									list();
		
		List<ProjectStatusView> psv = new ArrayList<ProjectStatusView>();
		for(ProjectStatus ps: psList){
			psv.add(new ProjectStatusView(ps.getProjectStatusId(), ps.getArea(), ps.getRag(), ps.getComment()));
		}
		
		return psv;
		
	}
	
	public Project getProject(String projectId){
		return (Project)this.sessionFactory.getCurrentSession().get(Project.class, Long.parseLong(projectId));
	}
	
	public void updateProject(LogisticsFormData project){

		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();

		session.createQuery(" update Project set projectName= :projectName, "
				+ " projectManager= :projectManager, sowRef= :sowRef, customerPOC= :customerPOC, "
				+ " projectDetails= :projectDetails, technologies= :technologies, "
				+ " startDate= :startDate, endDate= :endDate,user_Project_Id= :projectMangerId "
				+ " where projectId= :projectId").
				setParameter("projectName",    	project.projectName).
				setParameter("projectManager", 	project.projectManger).
				setParameter("projectMangerId", project.projectMangerId).
				setParameter("customerPOC",    	project.customerPocName).
				setParameter("sowRef",         	project.sowRef).
				setParameter("projectDetails", 	project.projectDetails).
				setParameter("technologies", 	project.projectTechnologies).
				setParameter("startDate", 		project.start_date).
				setParameter("endDate",			project.end_date).
				setParameter("projectId", 		Long.parseLong(project.projectId)).executeUpdate();

		tx.commit();
		session.close();

	}

	public void addorUpdateCustomers(CustomerDetails details) {
		// TODO Auto-generated method stub
		System.out.println("Add customer project DAO");
		Customer customer = new Customer();
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		customer.setCustomerId(details.getCustomerId());
		customer.setCustomerName(details.getCustomerName());
		customer.setCustomerPOC(details.getCustomerPOC());
		customer.setCustomerAddr(details.getCustomerAddr());
		System.out.println(customer.getCustomerName());
		session.saveOrUpdate(customer);
		
		tx.commit();
		session.close();
	}
	
	public List<ProjectStatus> getLatestWeekProjectStatusList(String projectId){
		Session session = this.sessionFactory.getCurrentSession();
		
		DetachedCriteria maxWeekCount = DetachedCriteria.forClass(ProjectStatus.class)
										.setProjection(Projections.max("weekCount"))
										.add(Property.forName("project_ProjectStatus_Id").eq(Long.parseLong(projectId)));
		@SuppressWarnings("unchecked")
		List<ProjectStatus> psList = session.createCriteria(ProjectStatus.class)
				.add(Property.forName("weekCount").eq(maxWeekCount))
				.add(Restrictions.eq("project_ProjectStatus_Id", Long.parseLong(projectId)))
				.list();
		
		for(ProjectStatus ps : psList){
			System.out.println(ps.getProjectStatusId()+","+ps.getArea()+","+ps.getComment()+","+ps.getDepartment()+","+ps.getProject_ProjectStatus_Id());
		}
		return psList;
	}
	
	public void saveProjectStatusList(List <ProjectStatus> psList, String projectId, String weekCount){
		
		List <ProjectStatus> newPSList = new ArrayList<ProjectStatus>();
		
		for(ProjectStatus ps : psList){
				newPSList.add(new ProjectStatus(ps.getDepartment(), ps.getArea(), ps.getRag(), ps.getStatus(), 
								ps.getComment(), Long.parseLong(projectId), Integer.parseInt(weekCount), null));
		}
		
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		
		int count = newPSList.size();
		
		for(ProjectStatus ps : newPSList){
			
			session.save(ps);
			
			if(count % 10 == 0){
				session.flush();
				session.clear();
			}
			
		}
		
		tx.commit();
		session.close();
		
	}
	
	public void removeCustomer(long customerId) {
		// TODO Auto-generated method stub
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		Customer customer  = (Customer)session.get(Customer.class, customerId);
		session.delete(customer);
		tx.commit();
	}
	
	public List<Customer> getCustomer(String customerName){
		@SuppressWarnings("unchecked")
		List<Customer> clients = this.sessionFactory.getCurrentSession().createQuery(" from Customer where customerName= :customerName").
																		setParameter("customerName", customerName).																			
																			list();
		return clients;
	}
	
	
}

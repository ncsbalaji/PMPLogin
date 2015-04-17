package com.velankani.service;
/**
 * @author Chetan.Nekkanti
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velankani.dao.ProjectDAO;
import com.velankani.hibernateModel.Customer;
import com.velankani.hibernateModel.Project;
import com.velankani.hibernateModel.ProjectStatus;
import com.velankani.viewPojo.CustomerDetails;
import com.velankani.viewPojo.LogisticsFormData;
import com.velankani.viewPojo.ProjectStatusView;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectDAO projectDAO;
	
	@Transactional
	public void addProject(Project project) {
		// TODO Auto-generated method stub
		projectDAO.addProject(project);
	}

	@Transactional
	public List<Project> getAllProjects() {
		// TODO Auto-generated method stub
		return projectDAO.getAllProjects();
	}

	@Transactional
	public void deleteProject(Long projectId) {
		// TODO Auto-generated method stub
		projectDAO.deleteProject(projectId);
	}

	@Transactional
	public void doBatchUpdate(List<ProjectStatusView> projects) {
		projectDAO.doBatchUpdate(projects);
		
	}
	
	@Transactional
	public List<Customer> getTreeData() {
		// TODO Auto-generated method stub
		return projectDAO.getTreeData();
	}

	@Transactional
	public List<ProjectStatus> getAllProjectStatus() {
		// TODO Auto-generated method stub
		return projectDAO.getAllProjectStatus();
	}

	@Transactional
	public List<Customer> getCustomers() {
		// TODO Auto-generated method stub
		return projectDAO.getCustomers();
	}

	@Transactional
	public List<ProjectStatusView> getProjectStatus(String projectId, String weekCount) {
		// TODO Auto-generated method stub
		return projectDAO.getProjectStatus(projectId, weekCount);
	}

	@Transactional
	public Project getProject(String projectId) {
		// TODO Auto-generated method stub
		return projectDAO.getProject(projectId);
	}

	@Transactional
	public void updateProject(LogisticsFormData project) {
		projectDAO.updateProject(project);
		
	}

	@Transactional
	public void addorUpdateCustomers(CustomerDetails details) {
		// TODO Auto-generated method stub
		projectDAO.addorUpdateCustomers(details);
	}
	
	@Transactional
	public List<ProjectStatus> getLatestWeekProjectStatusList(String projectId){
		return projectDAO.getLatestWeekProjectStatusList(projectId);
	}
	
	@Transactional
	public void saveProjectStatusList(List <ProjectStatus> psList, String projectId, String weekCount){
		projectDAO.saveProjectStatusList(psList, projectId, weekCount);
	}
	
	@Transactional
	public void removeCustomer(long customerId) {
		// TODO Auto-generated method stub
		projectDAO.removeCustomer(customerId);
	}
	
	@Transactional
	public List<Customer> getCustomer(String customerName){
		return projectDAO.getCustomer(customerName);
	}
}

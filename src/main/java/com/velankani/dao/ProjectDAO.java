package com.velankani.dao;
/**
 * @author Chetan.Nekkanti
 */
import java.util.List;

import com.velankani.hibernateModel.Customer;
import com.velankani.hibernateModel.Project;
import com.velankani.hibernateModel.ProjectStatus;
import com.velankani.viewPojo.CustomerDetails;
import com.velankani.viewPojo.LogisticsFormData;
import com.velankani.viewPojo.ProjectStatusView;

public interface ProjectDAO {

	public void addProject(Project project);
	public List<Project> getAllProjects();
	public void deleteProject(Long projectId);
	public void doBatchUpdate(List<ProjectStatusView> projects);
	public List<Customer> getTreeData();
	public List<ProjectStatus> getAllProjectStatus();
	public List<Customer> getCustomers();
	public List<ProjectStatusView> getProjectStatus(String projectId, String weekCount);
	public Project getProject(String projectId);
	public void updateProject(LogisticsFormData project);
	public void addorUpdateCustomers(CustomerDetails details);
	public List<ProjectStatus> getLatestWeekProjectStatusList(String projectId);
	public void saveProjectStatusList(List <ProjectStatus> psList, String projectId, String weekCount);
	public void removeCustomer(long customerId);
	public List<Customer> getCustomer(String customerName);
}

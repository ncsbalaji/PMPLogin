package com.velankani.hibernateModel;
/**
 * @author Chetan.Nekkanti
 */
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "Project")
public class Project {

	@Override
	public String toString() {
		return "Project [projectId=" + projectId + ", projectName="
				+ projectName + ", customerName=" + customerName
				+ ", projectManager=" + projectManager + ", sowRef=" + sowRef
				+ ", customerPOC=" + customerPOC + ", projectDetails="
				+ projectDetails + ", technologies=" + technologies
				+ ", startDate=" + startDate + ", endDate=" + endDate
				+ ", client_Project_Id=" + client_Project_Id
				+ ", user_Project_Id=" + user_Project_Id + ", customer=" + customer
				+ ", user=" + user + ", projectStatusList=" + projectStatusList
				+ "]";
	}

	@Id
    @GeneratedValue
    @Column
	private long projectId;
	
	@Column
	private String projectName;
	
	@Column
	private String customerName;
	
	@Column
	private String projectManager;
	
	@Column
	private String sowRef;
	
	@Column
	private String customerPOC;
	
	@Column
	private String projectDetails;
	
	@Column
	private String technologies;
	
	@Column
	private String startDate;
	
	@Column
	private String endDate;
	
	@Column
	private long client_Project_Id;
	
	@Column
	private long user_Project_Id;
	
	public int dummyWeakCount;
	
	@ManyToOne
	@JoinColumn(name = "client_Project_Id", insertable = false, updatable = false)
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name = "user_Project_Id", insertable = false, updatable = false )
	private User user;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "project_ProjectStatus_Id")
	private List<ProjectStatus> projectStatusList;

	public Project(String projectName, String customerName,
			String projectManager, String sowRef, String customerPOC,
			String projectDetails, String technologies, String startDate,
			String endDate, long client_Project_Id, long user_Project_Id,
			Customer customer) {
		this.projectName = projectName;
		this.customerName = customerName;
		this.projectManager = projectManager;
		this.sowRef = sowRef;
		this.customerPOC = customerPOC;
		this.projectDetails = projectDetails;
		this.technologies = technologies;
		this.startDate = startDate;
		this.endDate = endDate;
		this.client_Project_Id = client_Project_Id;
		this.user_Project_Id = user_Project_Id;
		this.customer = customer;
	}

	public Project() {
	}

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(String projectManager) {
		this.projectManager = projectManager;
	}

	public String getSowRef() {
		return sowRef;
	}

	public void setSowRef(String sowRef) {
		this.sowRef = sowRef;
	}

	public String getCustomerPOC() {
		return customerPOC;
	}

	public void setCustomerPOC(String customerPOC) {
		this.customerPOC = customerPOC;
	}

	public String getProjectDetails() {
		return projectDetails;
	}

	public void setProjectDetails(String projectDetails) {
		this.projectDetails = projectDetails;
	}

	public String getTechnologies() {
		return technologies;
	}

	public void setTechnologies(String technologies) {
		this.technologies = technologies;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public long getClient_Project_Id() {
		return client_Project_Id;
	}

	public void setClient_Project_Id(long client_Project_Id) {
		this.client_Project_Id = client_Project_Id;
	}

	public long getUser_Project_Id() {
		return user_Project_Id;
	}

	public void setUser_Project_Id(long user_Project_Id) {
		this.user_Project_Id = user_Project_Id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<ProjectStatus> getProjectStatusList() {
		return projectStatusList;
	}

	public void setProjectStatusList(List<ProjectStatus> projectStatusList) {
		this.projectStatusList = projectStatusList;
	}
	
}

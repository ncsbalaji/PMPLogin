package com.velankani.hibernateModel;
/**
 * @author Chetan.Nekkanti
 */
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ProjectStatus")
public class ProjectStatus {

	@Id
    @GeneratedValue
	@Column(updatable = false)
	private long projectStatusId;
	
	@Column(updatable = false)
	private String department;
	
	@Column(updatable = false)
	private String area;
	
	@Column
	private String rag;
	
	@Column(updatable = false)
	private String status;
	
	@Column
	private String comment;	
	
	@Column
	private int weekCount;	
	
	@Column(updatable = false)
	private long project_ProjectStatus_Id;
	
	@ManyToOne( fetch = FetchType.LAZY)
	@JoinColumn(name = "project_ProjectStatus_Id", insertable = false, updatable = false)
	private Project project;
	
	public ProjectStatus() {
	}

	public ProjectStatus(String department, String area, String rag,
			String status, String comment, long project_ProjectStatus_Id, int weekCount,
			Project project) {
		this.department = department;
		this.area = area;
		this.rag = rag;
		this.status = status;
		this.comment = comment;
		this.project_ProjectStatus_Id = project_ProjectStatus_Id;
		this.project = project;
		this.weekCount = weekCount;
	}

	public long getProjectStatusId() {
		return projectStatusId;
	}

	public void setProjectStatusId(long projectStatusId) {
		this.projectStatusId = projectStatusId;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getRag() {
		return rag;
	}

	public void setRag(String rag) {
		this.rag = rag;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public long getProject_ProjectStatus_Id() {
		return project_ProjectStatus_Id;
	}

	public void setProject_ProjectStatus_Id(long project_ProjectStatus_Id) {
		this.project_ProjectStatus_Id = project_ProjectStatus_Id;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public int getWeekCount() {
		return weekCount;
	}

	public void setWeekCount(int weekCount) {
		this.weekCount = weekCount;
	}
	
	
}

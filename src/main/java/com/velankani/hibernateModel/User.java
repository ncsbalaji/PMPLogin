package com.velankani.hibernateModel;
/**
 * @author Chetan.Nekkanti
 */
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User {
	
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName
				+ ", ReportingTo=" + ReportingTo + ", otherDetails="
				+ otherDetails + ", technologies=" + technologies
				+ ", otherDetails1=" + otherDetails1 + ", otherDetails2="
				+ otherDetails2 + ", projects=" + projects + "]";
	}
	@Id
    @GeneratedValue
    @Column
	private long userId;
	
	@Column
	private String userName;
	
	@Column
	private String ReportingTo;
	
	@Column
	private String otherDetails;
	
	@Column
	private String technologies;
	
	@Column
	private String otherDetails1;
	
	@Column
	private String otherDetails2;
	
	@OneToMany
	@JoinColumn( name = "user_Project_Id", insertable = false, updatable = false )
	private List<Project> projects;
	
	public User(String userName, String reportingTo, String otherDetails,
			String technologies, String otherDetails1, String otherDetails2) {
		this.userName = userName;
		ReportingTo = reportingTo;
		this.otherDetails = otherDetails;
		this.technologies = technologies;
		this.otherDetails1 = otherDetails1;
		this.otherDetails2 = otherDetails2;
	}
	public User() {
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getReportingTo() {
		return ReportingTo;
	}
	public void setReportingTo(String reportingTo) {
		ReportingTo = reportingTo;
	}
	public String getOtherDetails() {
		return otherDetails;
	}
	public void setOtherDetails(String otherDetails) {
		this.otherDetails = otherDetails;
	}
	public String getTechnologies() {
		return technologies;
	}
	public void setTechnologies(String technologies) {
		this.technologies = technologies;
	}
	public String getOtherDetails1() {
		return otherDetails1;
	}
	public void setOtherDetails1(String otherDetails1) {
		this.otherDetails1 = otherDetails1;
	}
	public String getOtherDetails2() {
		return otherDetails2;
	}
	public void setOtherDetails2(String otherDetails2) {
		this.otherDetails2 = otherDetails2;
	}
	
}

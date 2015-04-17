package com.velankani.hibernateModel;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name ="Customer")
public class Customer {

	public Customer(String customerName, String customerPOC,
			String customerAddr) {
		super();
	    this.customerName = customerName;
		this.customerPOC = customerPOC;
		this.customerAddr = customerAddr;
	}

	@Id
	@GeneratedValue
	@Column(name = "customerId")
	private long customerId;
	
	@Column
	private String customerName;
	
	@Column
	private String customerPOC;
	
	@Column
	private String customerAddr;
	
	@OneToMany( fetch = FetchType.EAGER)
	@JoinColumn(name = "client_Project_Id" )
	private List<Project> projects;
	
	public Customer() {
		
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerPOC() {
		return customerPOC;
	}

	public void setCustomerPOC(String customerPOC) {
		this.customerPOC = customerPOC;
	}

	public String getCustomerAddr() {
		return customerAddr;
	}

	public void setCustomerAddr(String customerAddr) {
		this.customerAddr = customerAddr;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	
	
}

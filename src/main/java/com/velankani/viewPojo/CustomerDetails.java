package com.velankani.viewPojo;


public class CustomerDetails {

	
	private long customerId;
	
	private String customerName;
	

	private String customerPOC;
	
	private String customerAddr;

	public CustomerDetails(long customerId, String customerName, String customerPOC,
			String customerAddr) {
		super();
		this.customerId= customerId;
		this.customerName = customerName;
		this.customerPOC = customerPOC;
		this.customerAddr = customerAddr;
	}

	public CustomerDetails() {
	
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

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	
	
	
	
	
}

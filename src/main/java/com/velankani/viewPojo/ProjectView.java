/**
 * 
 */
package com.velankani.viewPojo;


/**
 * @author chaten.nekkanti
 *
 */
public class ProjectView {

	
	public String projectName;	
	
	public String sowRef;
	
	 
	public String customerPOC;
	
	 
	public String projectDetails;
	
	 
	public String technologies;
	
	 
	public String startDate;
	
	 
	public String endDate;
	
	 
	public long client_Project_Id;
	
	 
	public long user_Project_Id;
	
	public String dummyWeakCount;

	public ProjectView(String projectName, String sowRef,
			String customerPOC, String projectDetails, String technologies,
			String startDate, String endDate, long client_Project_Id,
			long user_Project_Id, String dummyWeakCount) {
		super();
		this.projectName = projectName;
		this.sowRef = sowRef;
		this.customerPOC = customerPOC;
		this.projectDetails = projectDetails;
		this.technologies = technologies;
		this.startDate = startDate;
		this.endDate = endDate;
		this.client_Project_Id = client_Project_Id;
		this.user_Project_Id = user_Project_Id;
		this.dummyWeakCount = dummyWeakCount;
	}

	public ProjectView() {
		super();
	}
	
	
}

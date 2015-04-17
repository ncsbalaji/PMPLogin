/**
 * 
 */
package com.velankani.viewPojo;


/**
 * @author chaten.nekkanti
 *
 */
public class LogisticsFormData {
	
	public String projectId;
	public String projectName;
	public String projectManger;
	public long projectMangerId;
	public String sowRef;
	public String customerPocName;
	public String projectDetails;
	public String projectTechnologies;
	public String start_date;
	public String end_date;
	
	
	public LogisticsFormData(String projectId, String projectName,long projectMangerId,
			
			String projectManger, String sowRef, String customerPocName,
			String projectDetails, String projectTechnologies,
			String start_date, String end_date) {
		super();
		this.projectId = projectId;
		this.projectName = projectName;
		this.projectManger = projectManger;
		this.projectMangerId = projectMangerId;
		this.sowRef = sowRef;
		this.customerPocName = customerPocName;
		this.projectDetails = projectDetails;
		this.projectTechnologies = projectTechnologies;
		this.start_date = start_date;
		this.end_date = end_date;
	}


	public LogisticsFormData() {
		super();
	}
	
	/*public LogisticsFormData(String projectName, String projectManger,
			String sowRef, String customerPocName, String projectDetails,
			String projectTechnologies, String start_date, String end_date) {
		super();
		this.projectName = projectName;
		this.projectManger = projectManger;
		this.sowRef = sowRef;
		this.customerPocName = customerPocName;
		this.projectDetails = projectDetails;
		this.projectTechnologies = projectTechnologies;
		this.start_date = start_date;
		this.end_date = end_date;
	}*/
	
	
	
	
	/*public Date start_date;
	public Date end_date;
	
	public LogisticsFormData(String projectName, String projectManger,
			String sowRef, String customerPocName, String projectDetails,
			String projectTechnologies, Date start_date, Date end_date) {
		super();
		this.projectName = projectName;
		this.projectManger = projectManger;
		this.sowRef = sowRef;
		this.customerPocName = customerPocName;
		this.projectDetails = projectDetails;
		this.projectTechnologies = projectTechnologies;
		this.start_date = start_date;
		this.end_date = end_date;
	}*/
	
	
	
	
}

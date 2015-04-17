/**
 * 
 */
package com.velankani.viewPojo;

/**
 * @author chaten.nekkanti
 *
 */
public class OverallProjectStatus {


	public String projectName;
	public String risk;
	public String overallRisk;
	public String people;
	public String schedule;
	public String effort;
	public String sla;
	public String others;
	public String financials;
	public String staffing;
	
	public OverallProjectStatus() {
		super();
	}
	public OverallProjectStatus(String projectName, String risk,
			String overallRisk, String people, String schedule, String effort,
			String sla, String others, String financials, String staffing) {
		super();
		this.projectName = projectName;
		this.risk = risk;
		this.overallRisk = overallRisk;
		this.people = people;
		this.schedule = schedule;
		this.effort = effort;
		this.sla = sla;
		this.others = others;
		this.financials = financials;
		this.staffing = staffing;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getRisk() {
		return risk;
	}
	public void setRisk(String risk) {
		this.risk = risk;
	}
	public String getOverallRisk() {
		return overallRisk;
	}
	public void setOverallRisk(String overallRisk) {
		this.overallRisk = overallRisk;
	}
	public String getPeople() {
		return people;
	}
	public void setPeople(String people) {
		this.people = people;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public String getEffort() {
		return effort;
	}
	public void setEffort(String effort) {
		this.effort = effort;
	}
	public String getSla() {
		return sla;
	}
	public void setSla(String sla) {
		this.sla = sla;
	}
	public String getOthers() {
		return others;
	}
	public void setOthers(String others) {
		this.others = others;
	}
	public String getFinancials() {
		return financials;
	}
	public void setFinancials(String financials) {
		this.financials = financials;
	}
	public String getStaffing() {
		return staffing;
	}
	public void setStaffing(String staffing) {
		this.staffing = staffing;
	}
	
	
	
}

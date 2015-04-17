/**
 * 
 */
package com.velankani.viewPojo;

/**
 * @author chaten.nekkanti
 *
 */
public class ProjectStatusView {
	
	public long id;
	public String area;
	public String rag;
	public String comment;
	public ProjectStatusView(long id, String area, String rag, String comment) {
		super();
		this.id = id;
		this.area = area;
		this.rag = rag;
		this.comment = comment;
	}
	
	
	public ProjectStatusView() {
		super();
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}	
	
	

	
}

/**
 * 
 */
package com.velankani.viewPojo;

import java.util.ArrayList;
import java.util.List;

/**
 * @author chaten.nekkanti
 *
 */
public class ProjectTreeData {

	public String id;
	public String text;
	public String expanded= "true";
	public List<ProjectSubTreeData> children;
	public ProjectTreeData(String id) {
		children = new ArrayList<ProjectSubTreeData>();
		children.add(new ProjectSubTreeData(id, "Logistics"));
		children.add(new ProjectSubTreeData(id, "Current Status"));
	} 
	
	
}

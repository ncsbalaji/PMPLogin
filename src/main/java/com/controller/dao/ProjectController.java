package com.controller.dao;

/**
 * @author Chetan.Nekkanti
 */
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.controller.login.RoleController;
import com.springmvc.model.ProjectIntermediate;
import com.velankani.hibernateModel.Customer;
import com.velankani.hibernateModel.Project;
import com.velankani.hibernateModel.ProjectStatus;
import com.velankani.hibernateModel.User;
import com.velankani.service.ProjectService;
import com.velankani.service.UserService;
import com.velankani.viewPojo.ClientTreeData;
import com.velankani.viewPojo.CustomerDetails;
import com.velankani.viewPojo.CustomerDropDown;
import com.velankani.viewPojo.LogisticsFormData;
import com.velankani.viewPojo.LogisticsFormDataResponse;
import com.velankani.viewPojo.OverallProjectStatus;
import com.velankani.viewPojo.ProjectStatusView;
import com.velankani.viewPojo.ProjectTreeData;
import com.velankani.viewPojo.ProjectView;
import com.velankani.viewPojo.UserDropDown;


@Controller
@RequestMapping(value = "/projects")
public class ProjectController {
	
	static Logger log = Logger.getLogger(ProjectController.class.getName());

	@Autowired
	private ProjectService projectService;
	
    @Autowired
	private UserService userService;
	
    @RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseBody
	public void createProduct(@RequestBody ProjectView pv) {
    	Project project = new Project(pv.projectName, null, null, pv.sowRef, pv.customerPOC, 
    			pv.projectDetails, pv.technologies, pv.startDate, pv.endDate, pv.client_Project_Id, 
    			pv.user_Project_Id, null);
    	project.dummyWeakCount = Integer.parseInt(pv.dummyWeakCount);
		System.out.println("project creation "+project.dummyWeakCount);
		log.info(project.getCustomerName());
		//System.out.println(request.getParameter("projectName"));
		//project.setUser_Project_Id(3);
		//project.setClient_Project_Id(1);
		projectService.addProject(project);
		log.info(project.toString());
	}

	@RequestMapping(value = "edit/{id}", method = RequestMethod.PUT)
	public void editProduct(@PathVariable int id,
			@RequestBody Project product) {
		//product.setId(id);
		//return productService.update(product);
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
	public void deleteProduct(@PathVariable int id) {
		projectService.deleteProject(new Long(id));
	}

	@RequestMapping(value = "read/", method = RequestMethod.GET)
	@ResponseBody
	public List<ProjectStatusView> allProjects() {
		List<ProjectStatusView> projectStatusViews = new ArrayList<ProjectStatusView>();
		 for(ProjectStatus pStatus: projectService.getAllProjectStatus()){
			 ProjectStatusView psView = new ProjectStatusView(pStatus.getProjectStatusId(),pStatus.getArea(),
					 													pStatus.getRag(), pStatus.getComment());
			 projectStatusViews.add(psView);
		 }
		 return projectStatusViews;
	}
	
	@RequestMapping(value = "submit.htm", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void updateProjectStatusData(@RequestBody ProjectIntermediate projects){
		
		log.info("submit data called");
		
		for(ProjectStatusView psView: projects){
			log.info(psView.area);
		}
		
		projectService.doBatchUpdate(projects);
		/*String jsonData = "  ";
		System.out.println("Object data" +jsonData.toString());
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			Project[] projectsArray = mapper.readValue(jsonData.toString(), Project[].class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	}

	@RequestMapping(value = "treeData/")
	@ResponseBody
	public List<ClientTreeData> getTreeData() {
		/*List<Client> clients = projectService.getTreeData();
		System.out.println(clients.size()+""+clients.get(0).getClientId());

		List<String> list1 = new ArrayList<String>();
		list1.add("client");
		List<Client> clients2 = new ArrayList<Client>();
		clients2 = clients;
		return clients2;*/
		List<ClientTreeData> clientList = new ArrayList<ClientTreeData>();
		List<Customer> clients = projectService.getTreeData();
		for(Customer client: clients){
			ClientTreeData children = new ClientTreeData();
			children.client_id = Long.toString(client.getCustomerId());
			children.text = client.getCustomerName();
			List<Project>projects = client.getProjects();
			List<ProjectTreeData> projectList = new ArrayList<ProjectTreeData>();

			addProjects(projects, projectList);
			children.children =projectList;

			clientList.add(children);

		}
		return clientList;
	}

	/**
	 * @param projects
	 * @param projectList
	 */
	private void addProjects(List<Project> projects,
			List<ProjectTreeData> projectList) {
		for(Project project: projects){
			ProjectTreeData children = new ProjectTreeData(Long.toString(project.getProjectId()));
			children.id = Long.toString(project.getProjectId());
			children.text = project.getProjectName();
			projectList.add(children);
		}
	}
	
	@RequestMapping(value = "userRegistration/", method = RequestMethod.POST)
	@ResponseBody
	public void createUser(User user) {
		log.info("got user details");
		log.info(user.toString());
		userService.addUser(user);
		
	}
	
	@RequestMapping(value = "clientdropdown/")
	@ResponseBody
	public List<CustomerDropDown> getCustomers() {
		log.info("customers fetching");
		List<CustomerDropDown> clients = new ArrayList<CustomerDropDown>();  
		
		for (Customer customer : projectService.getCustomers()) {
			CustomerDropDown customerdd = new CustomerDropDown();
			customerdd.setClientId(customer.getCustomerId());
			customerdd.setClientName(customer.getCustomerName());
			log.info(customer.getCustomerName());
			clients.add(customerdd);
		}
		System.out.println(clients);
		return clients;
	}
	
	@RequestMapping(value = "userdropdown/")
	@ResponseBody
	public List<UserDropDown> getUsers() {
		log.info("users fetching");
		List<UserDropDown> users = new ArrayList<UserDropDown>();
		
		for (User user : userService.getUsers()) {
			UserDropDown userdd = new UserDropDown();
			userdd.setUserId(user.getUserId());
			userdd.setUserName(user.getUserName());
			users.add(userdd);
			
		}
		
		return users;
	}
	
	@RequestMapping(value = "customerDetails/")
	@ResponseBody
	public List<CustomerDetails> getCustomerDetails(){
		
		List<CustomerDetails> customers = new ArrayList<CustomerDetails>();
	/*	CustomerDetails customer1 = new CustomerDetails("Cisco", "CiscoPOC@Cisco.com","Bangalore");
		CustomerDetails customer2 = new CustomerDetails("Airwana", "AirwanaPOC@Airwana.com","Bangalore");
		CustomerDetails customer3 = new CustomerDetails("Infinera", "InfineraPOC@Infinera.com","Bangalore");
		customers.add(customer1);
		customers.add(customer2);
		customers.add(customer3);*/

		
		for (Customer customer : projectService.getCustomers()) {
			CustomerDetails customerdetails = new CustomerDetails();
			customerdetails.setCustomerId(customer.getCustomerId());
			customerdetails.setCustomerName(customer.getCustomerName());
			customerdetails.setCustomerPOC(customer.getCustomerPOC());
			customerdetails.setCustomerAddr(customer.getCustomerAddr());
			log.info(customer.getCustomerName());
			customers.add(customerdetails);
		}
		
		return customers;
		}
	
	@RequestMapping(value = "addcustomerDetails/")
	@ResponseBody
	public void addCustomerDetails( @RequestBody CustomerDetails details){
		log.info("updating customer details");
		log.info(details.getCustomerPOC());
		projectService.addorUpdateCustomers(details);
	}
	
	@RequestMapping(value = "getStatus", method = RequestMethod.GET)
	@ResponseBody
	public List<ProjectStatusView> getProjectStatus(@RequestParam String projectId, String status, String weekCount) {
		log.info("projectId: "+projectId+" weekCount: "+weekCount);

		return projectService.getProjectStatus(projectId, weekCount);
	}


	@RequestMapping(value = "getLogisticsFormData", method = RequestMethod.GET)
	@ResponseBody
	public LogisticsFormDataResponse getProjectLogisticsStatusFormData(@RequestParam String projectId) throws ParseException {
		log.info("FormData method projectId: "+projectId);
		Project project = projectService.getProject(projectId);
		LogisticsFormData lfd = new LogisticsFormData(projectId,project.getProjectName(),project.getUser_Project_Id(), project.getUser().getUserName(), 
				project.getSowRef(), project.getCustomerPOC(), project.getProjectDetails(), 
				project.getTechnologies(),  
				project.getStartDate(), 
				project.getEndDate());
		/*LogisticsFormData lfd = new LogisticsFormData(project.getProjectName(), project.getProjectManager(), 
										project.getSowRef(), project.getCustomerPOC(), project.getProjectDetails(), 
										project.getTechnologies(),  new SimpleDateFormat("dd-mm-yyy").parse(project.getStartDate()), new SimpleDateFormat("dd-mm-yyy").parse(project.getEndDate()));*/
		LogisticsFormDataResponse lfdr = new LogisticsFormDataResponse();
		lfdr.data = lfd;
		return lfdr;
	}
	
	@RequestMapping(value = "saveform", method = RequestMethod.POST)
	@ResponseBody
	public void updateProjectForm( @RequestBody LogisticsFormData project){

		log.info("saveform calledc "+project.projectName +" "+project.projectId);
		projectService.updateProject(project);

	}
	
	@RequestMapping(value = "copyRecentWeekStatus", method = RequestMethod.POST)
	@ResponseBody
	public void copyRecentWeekStatus(@RequestParam String projectId, String status, String weekCount){
		
		log.info(" in copyRecentWeekStatus method :"+projectId+","+status+"," +","+weekCount);
		List<ProjectStatus> psList = projectService.getLatestWeekProjectStatusList(projectId);
		projectService.saveProjectStatusList(psList, projectId, weekCount);	
	
	}
	
	@RequestMapping(value = "removeCustomer", method = RequestMethod.GET)
	@ResponseBody
	public void removeCustomer(@RequestParam long customerId){
		
		log.info("removing customer");
		log.info(""+customerId);
		projectService.removeCustomer(customerId);
	}
	
	@RequestMapping(value = "getOverallStatus", method = RequestMethod.GET)
	@ResponseBody
	public List<OverallProjectStatus> getOverallStatus(@RequestParam String customerName, String status) {
		List<OverallProjectStatus> opsList = new ArrayList<OverallProjectStatus>();
		
		log.info("customerName: "+customerName);
		List<Customer> customers = projectService.getCustomer(customerName);
		List<Project> projects = customers.get(0).getProjects();
		
		for(Project project: projects){
			List<ProjectStatus> pslist= projectService.getLatestWeekProjectStatusList(Long.toString(project.getProjectId()));
			OverallProjectStatus ops = new OverallProjectStatus();
			
			for(ProjectStatus ps : pslist){
				ops.setProjectName(project.getProjectName());
				
				if(ps.getArea().equals("Overall Risk")){
					ops.setOverallRisk(ps.getRag());
				} else if(ps.getArea().equals("People")){
					ops.setPeople(ps.getRag());
				} else if(ps.getArea().equals("Schedule")){
					ops.setSchedule(ps.getRag());
				} else if(ps.getArea().equals("Effort")){
					ops.setEffort(ps.getRag());
				} else if(ps.getArea().equals("SLA")){
					ops.setSla(ps.getRag());
				} else if(ps.getArea().equals("Others(Specifics)")){
					ops.setOthers(ps.getRag());
				} else if(ps.getArea().equals("Financials")){
					ops.setFinancials(ps.getRag());
				} else if(ps.getArea().equals("Staffing")){
					ops.setStaffing(ps.getRag());
				} else if(ps.getArea().equals("Risk")){
					ops.setRisk(ps.getRag());
				} 
				
			}
			
			opsList.add(ops);
			
		}
		
		return opsList;
	}
	@RequestMapping(value="logindetails/", method = RequestMethod.GET)
    @ResponseBody
    public String printUser() {


		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String  name = auth.getName(); //get logged in username

		log.info(name);
		return name;


	}
}

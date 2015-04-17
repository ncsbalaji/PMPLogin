package com.controller.login;
/**
 * @author Chetan.Nekkanti
 */
import javax.servlet.http.HttpServletRequest;
import java.util.logging.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RoleController {
	
	static Logger log = Logger.getLogger(RoleController.class.getName());
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(ModelMap model) {
    	log.info("login  called");
		return "login";
	}

    @RequestMapping(value = "/accessdenied", method = RequestMethod.GET)
	public String loginerror(ModelMap model) {
    	System.out.println("accessdenied  called");
		model.addAttribute("error", "true");
		return "denied";
	}
    
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(ModelMap model, HttpServletRequest request) {
    	
    	request.getSession().invalidate();
    	log.info("LOGOUT CALLED");
		return "logout";
	}
    
   /* @RequestMapping(value = "/main", method = RequestMethod.POST)
   	public String listEmployees(ModelMap map) {
    	System.out.println("main post  called");
       	map.addAttribute("message", "Only you are authenticated and authorized to view this page.");
   		return "index";
   	}*/
    
    @RequestMapping(value = "/main", method = RequestMethod.GET)
   	public String listEmployeess(ModelMap map) {
    	System.out.println("main get  called");
       	map.addAttribute("message", "Only you are authenticated and authorized to view this page.");
   		return "index";
   	}
    
}

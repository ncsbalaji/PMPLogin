package com.springmvc;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;

public class ActiveRoleAllocation implements UserDetailsContextMapper{

    public UserDetails mapUserFromContext(DirContextOperations ctx,
            String username, Collection<? extends GrantedAuthority> authority) {
        List<GrantedAuthority> mappedAuthorities = new ArrayList<GrantedAuthority>();


        for (GrantedAuthority granted : authority) {
            System.out.println(granted.getAuthority());
            
           

            if (granted.getAuthority().equalsIgnoreCase("ENGG")) {
                mappedAuthorities.add(new GrantedAuthority(){
                    private static final long serialVersionUID = 4356967414267942910L;

                    public String getAuthority() {
                        return "ROLE_ADMIN";
                    } 

                });
            } /*else if(granted.getAuthority().equalsIgnoreCase("MY ADMIN GROUP")) {
                mappedAuthorities.add(new GrantedAuthority() {
                    private static final long serialVersionUID = -5167156646226168080L;

                    @Override
                    public String getAuthority() {
                        return "ROLE_ADMIN";
                    }
                });
            }*/
        }
       return new User(username, "", true, true, true, true, mappedAuthorities);

    }

    public void mapUserToContext(UserDetails arg0, DirContextAdapter arg1) {
        // TODO Auto-generated method stub
        
    }

}

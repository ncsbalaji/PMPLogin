<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Dash board</title>
     <script type="text/javascript" src="resources/ext-4.2.1/ext-all.js"></script> 
    <script type="text/javascript" src="resources/ext-4.2.1/ext-theme-neptune.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/ext-4.2.1/ext-theme-neptune-all.css"> 
    
    <style>
	  element.style {
	  right: auto;
	  left: 0px;
	  top: 31px;
	  width: 1366px;	
		} 
	 </style>
	 
	<style type="text/css">
	.black {
	    background: #000;
	    color:#FFF;
	}
	.red{
		background: #FA5882;
		/*color:#000000;*/
	}
	.green{
		background: #BCF5A9;
		/* color:#000000; */
	}
	.yellow{
		background: #F3F781;
		/* color:#000000; */
	}
	.gray{
		background: #C0C0C0;
		/* color:#000000; */
	}
	.nocss{
	}
	.redcolored {
        color: red;
         }
	
	</style>

    <script type="text/javascript" src="resources/app.js"></script>
    
</head>
<body>
<div id= 'mainpage'></div>
<%-- <a href="${pageContext.request.contextPath}/j_spring_security_logout">Log Out</a> --%>

</body>
</html>
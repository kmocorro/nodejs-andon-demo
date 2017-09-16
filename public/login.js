$('document').ready(function()
{ 
     /* validation */
	 $("#login_form").validate({
      rules:
	  {
			text: {
            	required: true
			},
			
			password: {
				required: true
			},
            
            number: {
                required: true,
                number: true
				},
				
	   },
       messages:
	   {
            password:{
                      required: "Enter your password"
                     },
            employee_id: "Enter your valid Id number (ex. 12345)",
       },
	   submitHandler: submitForm	
       });  
	   /* validation */
	   
	   /* login submit */
	   function submitForm()
	   {		
			var data = $("#login_form").serialize();
			
			$.ajax({
				
			type : 'POST',
			url  : '/login/sups/validate', // api url
			data : data,
			beforeSend: function()
			{	
				$("#error").fadeOut();
				$("#btn-login").html('sending ...');
			},
			success :  function(response)
			   {						
					if(response=="ok"){

						$("#btn-login").html('<img src="btn-ajax-loader.gif" /> Checking your info...');
						setTimeout(' window.location.href = "/home"; ',3000);
					}
					else{
									
						$("#error").fadeIn(1000, function(){						
				            $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
						    $("#btn-login").html('Log In');
                        });
                        
                        $("#employee_id").click(function() {
                            $(this).closest('form').find("input[type=text], textarea").val("");
                        });
					}
			  }
			});
				return false;
		}
	   /* login submit */	  
	   
});
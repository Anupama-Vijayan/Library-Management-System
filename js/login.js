/*!

 */
$(function () {
    var user = {},
        flg = {};
	var username;
	var password;
    init();
	//flg.name = 0; valid username
  // href
	//.focusout
    $("#name").keyup(function () {
        var len = $('#name').val().length;
		username = $('#name').val();
		if(flg.logt == 0)
		{
			if (len > 13 || len == 0) {
				$('#name').css('background', 'rgb(255, 214, 190)');
				blsp();
				if (len != 0) {
					$('#nameal').css('color', 'rgb(255, 57, 19)').text('ID: Too long').fadeIn()
				} else {
					$('#nameal').css('color', 'rgb(255, 57, 19)').text('ID: Null').fadeIn()
				}
				flg.name = 1
			} 
			else {
			   $.ajax({
				type: 'POST', // use either POST or GET
				url: 'username_check.php',
				dataType: 'json', // the expected return datatype from php
				data: {'username': username , 'id': 1},//in php we can $_POST['input_year']; the first variable 
				success: function (data) 
				{
					if (data.status=='success') //status is proper of the json object, which we gave in php code in above script
					{
						$('#name').css('background', 'rgb(255, 255, 255)');
						$('#nameal').css('color', 'rgb(17, 170, 42)').text('User ID: Ok').fadeIn();
						flg.name = 0;
						tcheck()
						//window.location='home.php'; 
					}
					else if(data.status == 'failed')
					{
						$('#nameal').css('color', 'rgb(255, 57, 19)').text('User ID: User ID does not Exist').fadeIn()
					}
				},
				error: function (e) {
					console.log('error:'+e);
				}
			});
			}
		}
    });
    $("#pass").keyup(function () {
        var len = $('#pass').val().length;
		password = $('#pass').val();
		//part of login
		if(len == 0) 
		{
			flg.pass = 1;
			tcheck()
		}
		else
		{
			flg.pass = 0;
			tcheck()
		}
    });

		//for highlight the button "signup" or login 
    function tcheck() {
		//both user id and password 
        if (flg.name == 0 && flg.pass == 0) {
            $('#signupb').css('opacity', '1').css('cursor', 'pointer')
        } else {
            blsp()
        }
    }
	//after signup is clicked
    $('#signupb').click(function () {
        if (flg.name == 0 && flg.pass == 0) 
		{
            $('#sumsk').fadeIn(); //sending message
            $('#name, #pass, #logint, #nameal, #passal, #signupb').css('opacity', '0.2');
            $('#close').fadeIn();
			
			//process sign up
				$.ajax({
				type: 'POST', // use either POST or GET
				url: 'login_db.php', //store 
				dataType: 'json', // the expected return datatype from php
				data: {'username': username , 'pswd': password},//in php we can $_POST['input_year']; the first variable 
				success: function (data) 
				{
					if (data.status =='success') //status is proper of the json object, which we gave in php code in above script
					{
						//alert(data.type);
						
						if(data.type == 0) //general user
						{
							window.location= 'first.php'
						}
						else if(data.type == 1)
						{
							window.location = 'admin.php'
						}
						
					}
					else if(data.status == 'failed')
					{
						alert(data.status);
						//$('#nameal').css('color', 'rgb(255, 57, 19)').text('User ID: User ID Already Exist').fadeIn()
					}
				},
				error: function (data , e) {
					alert(data.status);
					console.log('error:'+e);
				}
			});
        }
    });
	
	//X mark
    $('#close').click(function () {
        init();
        initub();
        $('#close').hide()
    });

    function init() {
        flg.logt = 0
		flg.name = 1; // name null
		flg.pass = 1; //password null
		$('#userbox').css('height', '260px');
    }
	 function initub() {
        flg.name = -1;
        flg.pass = -1;
        $('#sumsk').hide();
        $('#nameal').hide();
        $('#passal').hide();
		$('#userbox').css('height', '260px');
        $('#name, #pass, #logint, #nameal, #passal, #signupb').css('opacity', '1');
        $('#name').css('background', 'rgb(255, 255, 255)');
        $('#pass').css('background', 'rgb(255, 255, 255)');
        $('#signupb').css('opacity', '0.2').css('cursor', 'default');
        $('#name, #pass').val('')
    }

  
	//unable singup and login button as the necessary fields are not complete
    function blsp() {
        $('#signupb').css('opacity', '0.2').css('cursor', 'default')
    }
});
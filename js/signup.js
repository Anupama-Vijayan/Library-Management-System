/*

 */
$(function () {
    var user = {},
        flg = {};
	var username;
	var password;
	var firstname;
	var lastname;
	var phonenumber;
    init();
       
	//.focusout
    $("#name").focusout(function () {
        var len = $('#name').val().length;
		username = $('#name').val();
		if (len > 13 || len == 0) 
		{
				$('#name').css('background', 'rgb(255, 214, 190)');
				blsp();
				if (len != 0) 
				{
					$('#nameal').css('color', 'rgb(255, 57, 19)').text('User ID: Too long').fadeIn()
				} else {
					$('#nameal').css('color', 'rgb(255, 57, 19)').text('User ID: Null').fadeIn()
				}
				flg.name = 1
		} 
		else 
		{
			   $.ajax({
				type: 'POST', // use either POST or GET
				url: 'username_check.php',
				dataType: 'json', // the expected return datatype from php
				data: {'username': username, 'id': 2},//in php we can $_POST['input_year']; the first variable 
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
						$('#name').css('background', 'rgb(255, 214, 190)');
						blsp();
						$('#nameal').css('color', 'rgb(255, 57, 19)').text('User ID: User ID Already Exist').fadeIn()
					}
				},
				error: function (e) {
					console.log('error:'+e);
				}
			});
			}
    });
	$("#fname").focusout(function(){
		var len = $('#fname').val().length;
		firstname = $('#fname').val();
		if (len > 0 && firstname.match(/[A-z]/))
		{
			$('#fname').css('background', 'rgb(255, 255, 255)');
					$('#fnameal').css('color', 'rgb(17, 170, 42)').text('First Name: Ok').fadeIn();
					flg.fname = 0;
					tcheck()
		}
		else
		{
			$('#fname').css('background', 'rgb(255, 214, 190)');
				blsp();
			$('#fnameal').css('color', 'rgb(255, 57, 19)').text('First Name: Null').fadeIn()	
		}
		
	});
	$("#lname").focusout(function(){
		var len = $('#lname').val().length;
		lastname =  $('#lname').val();
		if (len > 0 && lastname.match(/[A-z]/))
		{
			$('#lname').css('background', 'rgb(255, 255, 255)');
					$('#lnameal').css('color', 'rgb(17, 170, 42)').text('Last Name: Ok').fadeIn();
					flg.lname = 0;
					tcheck()
		}
		else
		{
			$('#lname').css('background', 'rgb(255, 214, 190)');
				blsp();
			$('#lnameal').css('color', 'rgb(255, 57, 19)').text('Last Name: Null').fadeIn()	
		}
		
	});
	$("#pnum").focusout(function(){
		var len = $('#pnum').val().length;
		phonenumber = $('#pnum').val();
		if (len == 10 && phonenumber.match(/\d/))
		{
			$('#pnum').css('background', 'rgb(255, 255, 255)');
					$('#pnumal').css('color', 'rgb(17, 170, 42)').text('Phone Number: Ok').fadeIn();
					flg.pnum = 0;
					tcheck()
		}
		else
		{
			
			$('#pnum').css('background', 'rgb(255, 214, 190)');
				blsp();
			if(len == 0)
			{
				$('#pnumal').css('color', 'rgb(255, 57, 19)').text('Phone Number: Null').fadeIn()
			}
			else if(len > 10 || len <10)
			{
				$('#pnumal').css('color', 'rgb(255, 57, 19)').text('Phone Number: 10 digits for valid number ').fadeIn()
			}
		}
		
	});
    $("#pass").keyup(function () {
        var len = $('#pass').val().length;
		password = $('#pass').val();
		 //sign up only need to check the strength 
			if (len == 0) 
			{
				$('#pass').css('background', 'rgb(255, 214, 190)');
				blsp();
				if (len != 0) {
					$('#passal').css('color', 'rgb(255, 57, 19)').text('Password: Too long').fadeIn()
				} else {
					$('#passal').css('color', 'rgb(255, 57, 19)').text('Password: Null').fadeIn()
				}
				flg.pass = 1
			} 
			else if(len < 6)
			{
				$('#pass').css('background', 'rgb(255, 214, 190)');
				blsp();
				$('#passal').css('color', 'rgb(255, 57, 19)').text('Password: 6 characters minimum').fadeIn()
				flg.pass = 1

			}
			else 
			{
				if(password.match(/\d/) && password.match(/[A-z]/))
				{
					$('#pass').css('background', 'rgb(255, 255, 255)');
					$('#passal').css('color', 'rgb(17, 170, 42)').text('Password: Ok').fadeIn();
					flg.pass = 0;
					tcheck()
				}
				else
				{
					$('#passal').css('color', 'rgb(255, 57, 19)').text('Password: Atleast one number and one letter needed').fadeIn()	
				}
			}
    });

    function tcheck() {
        if (flg.name == 0 && flg.pass == 0 && flg.fname == 0 && flg.lname == 0 && flg.pnum == 0)
		{
            $('#signupb').css('opacity', '1').css('cursor', 'pointer')
        } else {
            blsp()
        }
    }
	//after signup is clicked
    $('#signupb').click(function () {
        if (flg.name == 0 && flg.pass == 0 && flg.fname == 0 && flg.lname == 0 && flg.pnum == 0) 
		{
            $('#sumsk').fadeIn(); //sending message
            $('#name, #pass, #fname, #lname, #pnum, #logint, #nameal, #passal, #fnameal, #lnameal, #pnumal, #signupb').css('opacity', '0.2');
            $('#close').fadeIn()	
			//process sign up
				$.ajax({
				type: 'POST', // use either POST or GET
				url: 'signup.php', //store 
				dataType: 'json', // the expected return datatype from php
				data: {'username': username , 'pswd': password , 'fname': firstname, 'lname': lastname,'pnum': phonenumber},//in php we can $_POST['input_year']; the first variable 
				success: function (data) 
				{
					if (data.status =='success') //status is proper of the json object, which we gave in php code in above script
					{
						alert(data.status);
						window.location='login.html' ////../html/login.html' 
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
    $('#close').click(function () {
        init();
        initub();
        $('#close').hide()
    });

    function init() {
        flg.logt = 0;
		flg.name = 1;
        flg.pass = 1;
		flg.fname = 1;
		flg.lname = 1;
		flg.pnum = 1
    }

    function initub() {
        flg.name = -1;
        flg.pass = -1;
		flg.fname = -1;
		flg.lname = -1;
		flg.pnum = -1;
        $('#sumsk').hide();
        $('#nameal').hide();
        $('#passal').hide();
		$('#fnameal').hide();
        $('#lnameal').hide();
		$('#pnumal').hide();
        $('#name, #pass, #fname, #lname, #pnum, #logint, #nameal, #passal, #fnameal, #lnameal, #pnumal, #signupb').css('opacity', '1');
        $('#name').css('background', 'rgb(255, 255, 255)');
        $('#pass').css('background', 'rgb(255, 255, 255)');
		$('#fname').css('background', 'rgb(255, 255, 255)');
        $('#lname').css('background', 'rgb(255, 255, 255)');
		$('#pnum').css('background', 'rgb(255, 255, 255)');
		
        $('#signupb').css('opacity', '0.2').css('cursor', 'default');
        $('#name, #pass, #fname, #lname, #pnum').val('')
    }

	//unable singup and login button as the necessary fields are not complete
    function blsp() {
        $('#signupb').css('opacity', '0.2').css('cursor', 'default')
    }
});
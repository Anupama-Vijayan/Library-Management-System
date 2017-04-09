<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "root"; //change to cvgr1234 or root
	$dbname = "library";
	$username = $_POST["username"]; //years entered in text box
	$flag = $_POST["id"]; //1 is login 2 is signup
	console.log('Hello console!');
// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	else
	{
		//echo "succesfully connection";
	}
	//$sql = "SELECT Username FROM user WHERE username = '$username'";
	$sql = "SELECT Username FROM user_profile WHERE username = '$username'";
	//echo $sql;
	$result = $conn->query($sql);

	if ($result->num_rows > 0) 
	{
		//username already existing
		if( $flag == 1) //login
		{
			$response_array['status'] = 'success';
		}
		else //signup 
		{
			$response_array['status'] = 'failed'; 
		}
	} 
	else 
	{
		if($flag == 1) //login
		{
			$response_array['status'] = 'failed'; 
		}
		else
		{ //user name is available
			$response_array['status'] = 'success'; 
		}
		
	}
	 echo json_encode($response_array);
	$conn->close();
?>
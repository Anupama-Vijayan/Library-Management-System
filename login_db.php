<?php
session_start();

header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root"; //change to cvgr1234 or root
	$dbname = "library";
	$username = $_POST["username"]; //years entered in text box
	$pswd = $_POST["pswd"];
	
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	else
	{
		//echo "succesfully connection";
	}

	$sql = "SELECT * FROM user_profile WHERE username = '$username' AND password='$pswd'";
	//echo $sql;
	$result = $conn->query($sql);
	
	//$num_row = mysqli_num_rows($result);

		if( $result->num_rows >= 1 ) 
		{
			$row = $result->fetch_assoc();
			//temp variable
			$name =$row['Username'];
			$fname = $row['FName'];
			$type = $row['User_Type'];
			$id = $row['ID'];
			//echo 'true';
			$_SESSION['user_name']=$name;
			$_SESSION['first_name'] = $fname;
			$_SESSION['user_type'] = $type;
			$_SESSION['ID'] = $id;
			$_SESSION['logged'] = true;
			$response_array['status'] = 'success';
			$response_array['user_name'] = $name;
			$response_array['first_name'] = $fname;
			$response_array['type'] = $type;
			$response_array['id'] = $id;
			
			
					/*	if($row['ID'] == 1)
					{ //1 will be admin
						
					}
					else if($row['ID'] == 0)
					{//general user redirect to homepage
						
					}*/
		}
		/*else{
			echo 'false';
			// back to login
			$redirectURL = "../html/login.html";
			header('Location: '.$redirectURL);
		} */
		else 
		{
			$response_array['status'] = 'failed';
			$response_array['type'] = 3;
		}
		echo json_encode($response_array); // writing the final_array after reteriving the popular names  as JSON object
		$conn->close();
?>
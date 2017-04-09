<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "root"; //change to cvgr1234 or root
	$dbname = "library";
	
	$name = $_SESSION['username'];
	$pwd = $_SESSION['password'];
	$fname = $_SESSION['firstname'];
	$lname = $_SESSION['lastname'];
	$pnum = $_SESSION['phonenumber'] ;
	
	//echo("<script>console.log('PHP: ".$_SESSION['username'].$_SESSION['password']."');</script>");
// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	header('Content-type: application/json');
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	else
	{
		//echo "succesfully connection";
	}
	//INSERT INTO `user_profile`(`ID`, `Username`, `Password`, `FName`, `LName`, `Pnum`, `User_Type`) VALUES (2,'red','asdf123','Red','White', '213123123',0)
	$sql = "INSERT INTO `user_profile`(Username, Password, FName, LName, Pnum, User_Type) VALUES ('$name','$pwd','$fname','$lname','$pnum',0)";
	//$sql = "SELECT Username FROM user_profile WHERE username = '$username'";
	//echo $sql;
	$result = $conn->query($sql);
		
	if ($result) {
		//successful insert
		$response_array['status'] = 'success'; 
		//once successful update logged session variable to true then redirect to html
	} 
	else 
	{
		$response_array['status'] = 'failed'; 
	}
	 //echo json_encode($response_array);
	// $response_array['status'] = 'success'; 
	 echo json_encode($response_array);
	$conn->close();
?>
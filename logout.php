<?php
session_start();
unset($_SESSION['user_name']);
session_destroy();
session_commit();
header('Location: first.php');
?>
<?php
/**
 * 
 * Function which establish a connection to a data center
 * 
 * @param String $file (database config file path)
 * @return connection object
 * 
 * @access public
 * @package tdtm.serverSide.storage.database
 * @author Vincent Vallet
 * @version 1.0
 */
function dbconnect($file = "./serverSide/storage/database/connect_info.php")
{
	include($file);
	try
	{
		$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
		return new PDO('mysql:host='.$Host.';dbname='.$DB, $Name, $Pass, $pdo_options);
	}
	catch (Exception $e) //problem with database
	{
        die('Error : ' . $e->getMessage());
	}
}
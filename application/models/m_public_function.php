<?php

class M_public_function extends CI_Model{

	function __construct(){
		parent::__construct();
	}
	
	function stringnumber_tofloat($strnum){
		$trans = array('Rp'=>'', ' '=>'', '.'=>'', ','=>'.');
		$result = strtr($strnum, $trans);
		return floatval($result);
	}
	
}
?>
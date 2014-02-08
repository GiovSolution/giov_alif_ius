<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class C_public_function extends CI_Controller {
	
	function __construct(){
		parent::__construct();		
		$this->load->model('m_public_function', '', TRUE);
	}
	
}
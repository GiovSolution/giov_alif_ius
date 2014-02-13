<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_gudang
 * 
 * Table	: gudang
 *  
 * @author masongbee
 *
 */
class M_gudang extends CI_Model{

	function __construct(){
		parent::__construct();
	}
	
	/**
	 * Fungsi	: getAll
	 * 
	 * Untuk mengambil all-data
	 * 
	 * @param number $start
	 * @param number $page
	 * @param number $limit
	 * @return json
	 */
	function getAll($start, $page, $limit, $query, $filter){
		$select = "SELECT gudang_id,gudang_nama,gudang_posisi,gudang_aktif,gudang_creator,gudang_date_create,gudang_update,gudang_date_update,gudang_revised";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from 		= " FROM gudang";
		$orderby 	= " ORDER BY gudang_id";
		$limited 	= " LIMIT ".$start.",".$limit;
		
		// For simple search 
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " gudang_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_nama) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_posisi) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_aktif) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_creator) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_date_create) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_update) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_date_update) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(gudang_revised) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			$from = substr($from,0,strlen($from) -2);
			$from .= ")";
		}
		
		$sql = $select.$from.$orderby.$limited;
		$sql_total = $selecttotal.$from;
		
		$result  = $this->db->query($sql)->result();
		$total  = $this->db->query($sql_total)->row()->total;
		
		$data   = array();
		foreach($result as $row){
			$data[] = $row;
		}
		
		$json	= array(
			'success'   => TRUE,
			'message'   => "Loaded data",
			'total'     => $total,
			'data'      => $data
		);
		
		return $json;
	}
	
	/**
	 * Fungsi	: save
	 * 
	 * Untuk menambah data baru atau mengubah data lama
	 * 
	 * @param array $data
	 * @return json
	 */
	function save($data){
		$last   = NULL;
		
		$pkey = array('gudang_id'=>$data->gudang_id);
		
		$arrdatacu = array(
			'gudang_nama'=>$data->gudang_nama,
			'gudang_posisi'=>$data->gudang_posisi,
			'gudang_aktif'=>$data->gudang_aktif
		);
		
		$arrdataupdated = array(
			'gudang_update'=>$this->session->userdata('SESSION_USERNAME'),
			'gudang_date_update'=>$this->session->userdata('SESSION_USERNAME'),
			'gudang_date_update'=>date(LONG_FORMATDATE)
		);
		
		$arrdatau = array_merge($arrdatacu, $arrdataupdated);
		
		$arrdatacreated = array(
			'gudang_creator'=>$this->session->userdata('SESSION_USERNAME'),
			'gudang_date_create'=>date(LONG_FORMATDATE)
		);
		
		$arrdatac = array_merge($arrdatacu, $arrdatacreated);
		
		if($this->db->get_where('gudang', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */
			
			$this->db->where($pkey)->update('gudang', $arrdatau);
			if($this->db->affected_rows()){
				$this->db->where($pkey)->set('gudang_revised', 'gudang_revised+1', FALSE)->update('gudang');
			}
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			
			$this->db->insert('gudang', $arrdatac);
			$last   = $this->db->where($pkey)->get('gudang')->row();
			
		}
		
		$total  = $this->db->get('gudang')->num_rows();
		
		$json   = array(
			"success"   => TRUE,
			"message"   => 'Data berhasil disimpan',
			"total"     => $total,
			"data"      => $last
		);
		
		return $json;
	}
	
	/**
	 * Fungsi	: delete
	 * 
	 * Untuk menghapus satu data
	 * 
	 * @param array $data
	 * @return json
	 */
	function delete($data){
		$pkey = array('gudang_id'=>$data->gudang_id);
		
		$this->db->where($pkey)->delete('gudang');
		
		$total  = $this->db->get('gudang')->num_rows();
		$last = $this->db->get('gudang')->result();
		
		$json   = array(
			"success"   => TRUE,
			"message"   => 'Data berhasil dihapus',
			"total"     => $total,
			"data"      => $last
		);				
		return $json;
	}
}
?>
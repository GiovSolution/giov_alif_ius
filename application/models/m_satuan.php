<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_satuan
 * 
 * Table	: satuan
 *  
 * @author masongbee
 *
 */
class M_satuan extends CI_Model{

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
	function getAll($start, $page, $limit, $query){
		//$result  = $this->db->limit($limit, $start)->order_by('satuan_id', 'ASC')->get('satuan')->result();
		$select = "SELECT satuan_id
			,satuan_kode
			,satuan_nama
			,satuan_aktif
			,satuan_creator
			,satuan_date_create
			,satuan_update
			,satuan_date_update
			,satuan_revised";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from 		= " FROM satuan";
		$orderby	= " ORDER BY satuan_id";
		$limited 	= " LIMIT ".$start.",".$limit;
		
		// For simple search 
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " satuan_id = ".addslashes(strtolower($query))." AND";
			}
			if(! is_numeric($query)){
				$from .= " lower(satuan_nama) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			$from = substr($from, 0, strrpos($from, ' '));
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
		
		$pkey = array('satuan_id'=>$data->satuan_id);
		
		if($this->db->get_where('satuan', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */
			
			$arrdatau = array('satuan_kode'=>$data->satuan_kode,'satuan_nama'=>$data->satuan_nama,'satuan_aktif'=>$data->satuan_aktif,'satuan_creator'=>$data->satuan_creator,'satuan_date_create'=>(strlen(trim($data->satuan_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->satuan_date_create)) : NULL),'satuan_update'=>$data->satuan_update,'satuan_date_update'=>(strlen(trim($data->satuan_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->satuan_date_update)) : NULL),'satuan_revised'=>$data->satuan_revised);
			 
			$this->db->where($pkey)->update('satuan', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			
			$arrdatac = array('satuan_id'=>$data->satuan_id,'satuan_kode'=>$data->satuan_kode,'satuan_nama'=>$data->satuan_nama,'satuan_aktif'=>$data->satuan_aktif,'satuan_creator'=>$data->satuan_creator,'satuan_date_create'=>(strlen(trim($data->satuan_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->satuan_date_create)) : NULL),'satuan_update'=>$data->satuan_update,'satuan_date_update'=>(strlen(trim($data->satuan_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->satuan_date_update)) : NULL),'satuan_revised'=>$data->satuan_revised);
			 
			$this->db->insert('satuan', $arrdatac);
			$last   = $this->db->where($pkey)->get('satuan')->row();
			
		}
		
		$total  = $this->db->get('satuan')->num_rows();
		
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
		$pkey = array('satuan_id'=>$data->satuan_id);
		
		$this->db->where($pkey)->delete('satuan');
		
		$total  = $this->db->get('satuan')->num_rows();
		$last = $this->db->get('satuan')->result();
		
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
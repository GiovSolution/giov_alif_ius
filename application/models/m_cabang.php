<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_cabang
 * 
 * Table	: cabang
 *  
 * @author masongbee
 *
 */
class M_cabang extends CI_Model{

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
		//$query  = $this->db->limit($limit, $start)->order_by('cabang_id', 'ASC')->get('cabang')->result();
		$select		= "SELECT cabang.*";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from		= " FROM cabang";
		$orderby	= " ORDER BY cabang_id";
		$limit		= " LIMIT ".$start.",".$limit;
		
		/* For simple search */
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " OR ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " cabang.cabang_id = ".addslashes(strtolower($query))." AND";
			}else{
				$from .= " lower(cabang.cabang_nama) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			//$from = substr($from,0,strlen($from) -2);
			$from = substr($from, 0, strrpos($from, ' '));
			$from .= ")";
		}
		
		$sql 		= $select.$from.$orderby.$limit;
		$sqltotal 	= $selecttotal.$from;
		
		$result  = $this->db->query($sql)->result();
		$rstotal = $this->db->query($sqltotal)->row();
		$total  = (sizeof($rstotal) == 0 ? 0 : $rstotal->total);
		
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
		
		$pkey = array('cabang_id'=>$data->cabang_id);
		
		if($this->db->get_where('cabang', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */			 
				
			 
			$arrdatau = array('cabang_nama'=>$data->cabang_nama,'cabang_alamat'=>$data->cabang_alamat,'cabang_kota'=>$data->cabang_kota,'cabang_kodepos'=>$data->cabang_kodepos,'cabang_propinsi'=>$data->cabang_propinsi,'cabang_keterangan'=>$data->cabang_keterangan,'cabang_aktif'=>$data->cabang_aktif,'cabang_creator'=>$data->cabang_creator,'cabang_date_create'=>(strlen(trim($data->cabang_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->cabang_date_create)) : NULL),'cabang_update'=>$data->cabang_update,'cabang_date_update'=>(strlen(trim($data->cabang_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->cabang_date_update)) : NULL),'cabang_revised'=>$data->cabang_revised,'cabang_value'=>$data->cabang_value,'cabang_kode'=>$data->cabang_kode,'cabang_kode_akun'=>$data->cabang_kode_akun,'cabang_pajak'=>$data->cabang_pajak);
			 
			$this->db->where($pkey)->update('cabang', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			 
			$arrdatac = array('cabang_id'=>$data->cabang_id,'cabang_nama'=>$data->cabang_nama,'cabang_alamat'=>$data->cabang_alamat,'cabang_kota'=>$data->cabang_kota,'cabang_kodepos'=>$data->cabang_kodepos,'cabang_propinsi'=>$data->cabang_propinsi,'cabang_keterangan'=>$data->cabang_keterangan,'cabang_aktif'=>$data->cabang_aktif,'cabang_creator'=>$data->cabang_creator,'cabang_date_create'=>(strlen(trim($data->cabang_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->cabang_date_create)) : NULL),'cabang_update'=>$data->cabang_update,'cabang_date_update'=>(strlen(trim($data->cabang_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->cabang_date_update)) : NULL),'cabang_revised'=>$data->cabang_revised,'cabang_value'=>$data->cabang_value,'cabang_kode'=>$data->cabang_kode,'cabang_kode_akun'=>$data->cabang_kode_akun,'cabang_pajak'=>$data->cabang_pajak);
			 
			$this->db->insert('cabang', $arrdatac);
			$last   = $this->db->where($pkey)->get('cabang')->row();
			
		}
		
		$total  = $this->db->get('cabang')->num_rows();
		
		$json   = array(
						"success"   => TRUE,
						"message"   => 'Data berhasil disimpan',
						'total'     => $total,
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
		$pkey = array('cabang_id'=>$data->cabang_id);
		
		$this->db->where($pkey)->delete('cabang');
		
		$total  = $this->db->get('cabang')->num_rows();
		$last = $this->db->get('cabang')->result();
		
		$json   = array(
						"success"   => TRUE,
						"message"   => 'Data berhasil dihapus',
						'total'     => $total,
						"data"      => $last
		);				
		return $json;
	}
}
?>
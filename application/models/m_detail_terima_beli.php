<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_detail_terima_beli
 * 
 * Table	: detail_terima_beli
 *  
 * @author masongbee
 *
 */
class M_detail_terima_beli extends CI_Model{

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
		$select = "SELECT dterima_id,dterima_master
			,dterima_produk,dterima_produk_nama
			,dterima_satuan,dterima_satuan_nama
			,dterima_jumlah,dterima_harga,dterima_diskon,dterima_no_batch,dterima_expired_date
			,dterima_keterangan,dterima_subtotal";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from 		= " FROM detail_terima_beli";
		$orderby	= " ORDER BY dterima_id";
		$limited 	= " LIMIT ".$start.",".$limit;
		
		// For simple search 
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " dterima_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_master) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_produk) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_satuan) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_jumlah) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_harga) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_no_batch) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_expired_date) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dterima_keterangan) LIKE '%".addslashes(strtolower($query))."%' OR";
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
		
		$pkey = array('dterima_id'=>$data->dterima_id);
		
		$arrdatacu = array(
			'dterima_master'=>$data->dterima_master,
			'dterima_produk'=>$data->dterima_produk,
			'dterima_satuan'=>$data->dterima_satuan,
			'dterima_jumlah'=>$data->dterima_jumlah,
			'dterima_harga'=>$data->dterima_harga,
			'dterima_no_batch'=>$data->dterima_no_batch,
			'dterima_expired_date'=>(strlen(trim($data->dterima_expired_date)) > 0 ? date('Y-m-d', strtotime($data->dterima_expired_date)) : NULL),
			'dterima_keterangan'=>$data->dterima_keterangan
		);
		
		$arrdataupdated = array(
		);
		
		$arrdatau = array_merge($arrdatacu, $arrdataupdated);
		
		$arrdatacreated = array(
		);
		
		$arrdatac = array_merge($arrdatacu, $arrdatacreated);
		
		if($this->db->get_where('detail_terima_beli', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */
			
			$this->db->where($pkey)->update('detail_terima_beli', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			
			$this->db->insert('detail_terima_beli', $arrdatac);
			$last   = $this->db->where($pkey)->get('detail_terima_beli')->row();
			
		}
		
		$total  = $this->db->get('detail_terima_beli')->num_rows();
		
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
		$pkey = array('dterima_id'=>$data->dterima_id);
		
		$this->db->where($pkey)->delete('detail_terima_beli');
		
		$total  = $this->db->get('detail_terima_beli')->num_rows();
		$last = $this->db->get('detail_terima_beli')->result();
		
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
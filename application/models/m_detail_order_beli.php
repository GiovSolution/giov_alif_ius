<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_detail_order_beli
 * 
 * Table	: detail_order_beli
 *  
 * @author masongbee
 *
 */
class M_detail_order_beli extends CI_Model{

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
	function getAll($start, $page, $limit, $query, $masterid){
		$select = "SELECT dorder_id,dorder_master
			,dorder_produk,dorder_produk_nama
			,dorder_satuan,dorder_satuan_nama
			,dorder_jumlah
			,dorder_harga,dorder_diskon,dorder_harga_log
			,dorder_subtotal";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from 		= " FROM detail_order_beli";
		$orderby	= " ORDER BY dorder_id";
		$limited 	= " LIMIT ".$start.",".$limit;
		
		if($masterid<>''){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(detail_order_beli.dorder_master = '".$masterid."')";
		}
		
		// For simple search 
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " dorder_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_master) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_produk) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_satuan) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_jumlah) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_harga) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_diskon) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(dorder_harga_log) LIKE '%".addslashes(strtolower($query))."%' OR";
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
		
		$pkey = array('dorder_id'=>$data->dorder_id);
		
		$arrdatacu = array(
			'dorder_master'=>$data->dorder_master,
			'dorder_produk'=>$data->dorder_produk,
			'dorder_satuan'=>$data->dorder_satuan,
			'dorder_jumlah'=>$data->dorder_jumlah,
			'dorder_harga'=>$data->dorder_harga,
			'dorder_diskon'=>$data->dorder_diskon,
			'dorder_harga_log'=>$data->dorder_harga_log
		);
		
		$arrdataupdated = array(
		);
		
		$arrdatau = array_merge($arrdatacu, $arrdataupdated);
		
		$arrdatacreated = array(
		);
		
		$arrdatac = array_merge($arrdatacu, $arrdatacreated);
		
		if($this->db->get_where('detail_order_beli', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */
			
			$this->db->where($pkey)->update('detail_order_beli', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			
			$this->db->insert('detail_order_beli', $arrdatac);
			$last   = $this->db->where($pkey)->get('detail_order_beli')->row();
			
		}
		
		$total  = $this->db->get('detail_order_beli')->num_rows();
		
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
		$pkey = array('dorder_id'=>$data->dorder_id);
		
		$this->db->where($pkey)->delete('detail_order_beli');
		
		$total  = $this->db->get('detail_order_beli')->num_rows();
		$last = $this->db->get('detail_order_beli')->result();
		
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
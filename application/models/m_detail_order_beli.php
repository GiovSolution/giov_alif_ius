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
	function getAll($start, $page, $limit){
		$query  = $this->db->limit($limit, $start)->order_by('dorder_id', 'ASC')->get('detail_order_beli')->result();
		$total  = $this->db->get('detail_order_beli')->num_rows();
		
		$data   = array();
		foreach($query as $result){
			$data[] = $result;
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
		
		if($this->db->get_where('detail_order_beli', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */
			
			$arrdatau = array('dorder_master'=>$data->dorder_master,'dorder_produk'=>$data->dorder_produk,'dorder_satuan'=>$data->dorder_satuan,'dorder_jumlah'=>$data->dorder_jumlah,'dorder_harga'=>$data->dorder_harga,'dorder_diskon'=>$data->dorder_diskon,'dorder_harga_log'=>$data->dorder_harga_log);
			 
			$this->db->where($pkey)->update('detail_order_beli', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			
			$arrdatac = array('dorder_id'=>$data->dorder_id,'dorder_master'=>$data->dorder_master,'dorder_produk'=>$data->dorder_produk,'dorder_satuan'=>$data->dorder_satuan,'dorder_jumlah'=>$data->dorder_jumlah,'dorder_harga'=>$data->dorder_harga,'dorder_diskon'=>$data->dorder_diskon,'dorder_harga_log'=>$data->dorder_harga_log);
			 
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
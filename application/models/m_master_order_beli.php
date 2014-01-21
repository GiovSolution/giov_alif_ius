<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_master_order_beli
 * 
 * Table	: master_order_beli
 *  
 * @author masongbee
 *
 */
class M_master_order_beli extends CI_Model{

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
		$query  = $this->db->limit($limit, $start)->order_by('order_id', 'ASC')->get('master_order_beli')->result();
		$total  = $this->db->get('master_order_beli')->num_rows();
		
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
		
		$pkey = array('order_id'=>$data->order_id);
		
		if($this->db->get_where('master_order_beli', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */			 
				
			 
			$arrdatau = array('order_no'=>$data->order_no,'order_supplier'=>$data->order_supplier,'order_tanggal'=>(strlen(trim($data->order_tanggal)) > 0 ? date('Y-m-d', strtotime($data->order_tanggal)) : NULL),'order_carabayar'=>$data->order_carabayar,'order_diskon'=>$data->order_diskon,'order_cashback'=>$data->order_cashback,'order_totalbiaya'=>$data->order_totalbiaya,'order_ttlbiaya_lain2'=>$data->order_ttlbiaya_lain2,'order_dp'=>$data->order_dp,'order_sisa_bayar'=>$data->order_sisa_bayar,'order_keterangan'=>$data->order_keterangan,'order_status_acc'=>$data->order_status_acc,'order_status'=>$data->order_status,'order_creator'=>$data->order_creator,'order_date_create'=>(strlen(trim($data->order_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->order_date_create)) : NULL),'order_update'=>$data->order_update,'order_date_update'=>(strlen(trim($data->order_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->order_date_update)) : NULL),'order_revised'=>$data->order_revised);
			 
			$this->db->where($pkey)->update('master_order_beli', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			 
			$arrdatac = array('order_id'=>$data->order_id,'order_no'=>$data->order_no,'order_supplier'=>$data->order_supplier,'order_tanggal'=>(strlen(trim($data->order_tanggal)) > 0 ? date('Y-m-d', strtotime($data->order_tanggal)) : NULL),'order_carabayar'=>$data->order_carabayar,'order_diskon'=>$data->order_diskon,'order_cashback'=>$data->order_cashback,'order_totalbiaya'=>$data->order_totalbiaya,'order_ttlbiaya_lain2'=>$data->order_ttlbiaya_lain2,'order_dp'=>$data->order_dp,'order_sisa_bayar'=>$data->order_sisa_bayar,'order_keterangan'=>$data->order_keterangan,'order_status_acc'=>$data->order_status_acc,'order_status'=>$data->order_status,'order_creator'=>$data->order_creator,'order_date_create'=>(strlen(trim($data->order_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->order_date_create)) : NULL),'order_update'=>$data->order_update,'order_date_update'=>(strlen(trim($data->order_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->order_date_update)) : NULL),'order_revised'=>$data->order_revised);
			 
			$this->db->insert('master_order_beli', $arrdatac);
			$last   = $this->db->where($pkey)->get('master_order_beli')->row();
			
		}
		
		$total  = $this->db->get('master_order_beli')->num_rows();
		
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
		$pkey = array('order_id'=>$data->order_id);
		
		$this->db->where($pkey)->delete('master_order_beli');
		
		$total  = $this->db->get('master_order_beli')->num_rows();
		$last = $this->db->get('master_order_beli')->result();
		
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
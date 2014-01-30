<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_produk
 * 
 * Table	: produk
 *  
 * @author masongbee
 *
 */
class M_produk extends CI_Model{

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
		$result  = $this->db->limit($limit, $start)->order_by('produk_id', 'ASC')->get('produk')->result();
		$total  = $this->db->get('produk')->num_rows();
		
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
		
		$pkey = array('produk_id'=>$data->produk_id);
		
		if($this->db->get_where('produk', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */			 
				
			 
			$arrdatau = array('produk_kode'=>$data->produk_kode,'produk_group'=>$data->produk_group,'produk_kategori'=>$data->produk_kategori,'produk_nama'=>$data->produk_nama,'produk_satuan'=>$data->produk_satuan,'produk_harga'=>$data->produk_harga,'produk_volume'=>$data->produk_volume,'produk_jenis'=>$data->produk_jenis,'produk_keterangan'=>$data->produk_keterangan,'produk_bpom'=>$data->produk_bpom,'produk_aktif'=>$data->produk_aktif,'produk_saldo_awal'=>$data->produk_saldo_awal,'produk_nilai_saldo_awal'=>$data->produk_nilai_saldo_awal,'produk_tgl_nilai_saldo_awal'=>(strlen(trim($data->produk_tgl_nilai_saldo_awal)) > 0 ? date('Y-m-d', strtotime($data->produk_tgl_nilai_saldo_awal)) : NULL),'produk_creator'=>$data->produk_creator,'produk_date_create'=>(strlen(trim($data->produk_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_create)) : NULL),'produk_update'=>$data->produk_update,'produk_aktif_cabang'=>$data->produk_aktif_cabang,'produk_date_update'=>(strlen(trim($data->produk_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_update)) : NULL),'produk_revised'=>$data->produk_revised);
			 
			$this->db->where($pkey)->update('produk', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			 
			$arrdatac = array('produk_id'=>$data->produk_id,'produk_kode'=>$data->produk_kode,'produk_group'=>$data->produk_group,'produk_kategori'=>$data->produk_kategori,'produk_nama'=>$data->produk_nama,'produk_satuan'=>$data->produk_satuan,'produk_harga'=>$data->produk_harga,'produk_volume'=>$data->produk_volume,'produk_jenis'=>$data->produk_jenis,'produk_keterangan'=>$data->produk_keterangan,'produk_bpom'=>$data->produk_bpom,'produk_aktif'=>$data->produk_aktif,'produk_saldo_awal'=>$data->produk_saldo_awal,'produk_nilai_saldo_awal'=>$data->produk_nilai_saldo_awal,'produk_tgl_nilai_saldo_awal'=>(strlen(trim($data->produk_tgl_nilai_saldo_awal)) > 0 ? date('Y-m-d', strtotime($data->produk_tgl_nilai_saldo_awal)) : NULL),'produk_creator'=>$data->produk_creator,'produk_date_create'=>(strlen(trim($data->produk_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_create)) : NULL),'produk_update'=>$data->produk_update,'produk_aktif_cabang'=>$data->produk_aktif_cabang,'produk_date_update'=>(strlen(trim($data->produk_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_update)) : NULL),'produk_revised'=>$data->produk_revised);
			 
			$this->db->insert('produk', $arrdatac);
			$last   = $this->db->where($pkey)->get('produk')->row();
			
		}
		
		$total  = $this->db->get('produk')->num_rows();
		
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
		$pkey = array('produk_id'=>$data->produk_id);
		
		$this->db->where($pkey)->delete('produk');
		
		$total  = $this->db->get('produk')->num_rows();
		$last = $this->db->get('produk')->result();
		
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
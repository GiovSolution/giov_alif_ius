<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_supplier
 * 
 * Table	: supplier
 *  
 * @author masongbee
 *
 */
class M_supplier extends CI_Model{

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
		//$query  = $this->db->limit($limit, $start)->order_by('supplier_id', 'ASC')->get('supplier')->result();
		$select	= "SELECT supplier_id,supplier_cabang,supplier_nama,supplier_alamat
			,supplier_kota,supplier_kodepos,supplier_propinsi,supplier_negara,supplier_notelp
			,supplier_notelp2,supplier_nofax,supplier_email,supplier_website,supplier_cp
			,supplier_contact_cp,supplier_akun,supplier_keterangan
			,IF(supplier_aktif = 'Aktif', 1, 0) AS supplier_aktif
			,supplier_creator,supplier_date_create,supplier_update,supplier_date_update
			,supplier_revised";
		$selecttotal	= "SELECT COUNT(*) AS total";
		$from			= " FROM supplier";
		$orderby		= " ORDER BY supplier_id ASC";
		$limit 			= " LIMIT ".$start.",".$limit;
		
		$sql			= $select.$from.$orderby.$limit;
		$sqltotal		= $selecttotal.$from;
		
		$result = $this->db->query($sql)->result();
		$total  = $this->db->query($sqltotal)->row()->total;
		
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
		
		$pkey = array('supplier_id'=>$data->supplier_id);
		
		if($this->db->get_where('supplier', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */			 
				
			 
			$arrdatau = array('supplier_cabang'=>$data->supplier_cabang,'supplier_nama'=>$data->supplier_nama,'supplier_alamat'=>$data->supplier_alamat,'supplier_kota'=>$data->supplier_kota,'supplier_kodepos'=>$data->supplier_kodepos,'supplier_propinsi'=>$data->supplier_propinsi,'supplier_negara'=>$data->supplier_negara,'supplier_notelp'=>$data->supplier_notelp,'supplier_notelp2'=>$data->supplier_notelp2,'supplier_nofax'=>$data->supplier_nofax,'supplier_email'=>$data->supplier_email,'supplier_website'=>$data->supplier_website,'supplier_cp'=>$data->supplier_cp,'supplier_contact_cp'=>$data->supplier_contact_cp,'supplier_akun'=>$data->supplier_akun,'supplier_keterangan'=>$data->supplier_keterangan,'supplier_aktif'=>$data->supplier_aktif,'supplier_creator'=>$data->supplier_creator,'supplier_date_create'=>(strlen(trim($data->supplier_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->supplier_date_create)) : NULL),'supplier_update'=>$data->supplier_update,'supplier_date_update'=>(strlen(trim($data->supplier_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->supplier_date_update)) : NULL),'supplier_revised'=>$data->supplier_revised);
			 
			$this->db->where($pkey)->update('supplier', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			 
			$arrdatac = array('supplier_id'=>$data->supplier_id,'supplier_cabang'=>$data->supplier_cabang,'supplier_nama'=>$data->supplier_nama,'supplier_alamat'=>$data->supplier_alamat,'supplier_kota'=>$data->supplier_kota,'supplier_kodepos'=>$data->supplier_kodepos,'supplier_propinsi'=>$data->supplier_propinsi,'supplier_negara'=>$data->supplier_negara,'supplier_notelp'=>$data->supplier_notelp,'supplier_notelp2'=>$data->supplier_notelp2,'supplier_nofax'=>$data->supplier_nofax,'supplier_email'=>$data->supplier_email,'supplier_website'=>$data->supplier_website,'supplier_cp'=>$data->supplier_cp,'supplier_contact_cp'=>$data->supplier_contact_cp,'supplier_akun'=>$data->supplier_akun,'supplier_keterangan'=>$data->supplier_keterangan,'supplier_aktif'=>$data->supplier_aktif,'supplier_creator'=>$data->supplier_creator,'supplier_date_create'=>(strlen(trim($data->supplier_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->supplier_date_create)) : NULL),'supplier_update'=>$data->supplier_update,'supplier_date_update'=>(strlen(trim($data->supplier_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->supplier_date_update)) : NULL),'supplier_revised'=>$data->supplier_revised);
			 
			$this->db->insert('supplier', $arrdatac);
			$last   = $this->db->where($pkey)->get('supplier')->row();
			
		}
		
		$total  = $this->db->get('supplier')->num_rows();
		
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
		$pkey = array('supplier_id'=>$data->supplier_id);
		
		$this->db->where($pkey)->delete('supplier');
		
		$total  = $this->db->get('supplier')->num_rows();
		$last = $this->db->get('supplier')->result();
		
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
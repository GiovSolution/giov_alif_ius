<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_master_terima_beli
 * 
 * Table	: master_terima_beli
 *  
 * @author masongbee
 *
 */
class M_master_terima_beli extends CI_Model{

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
		$select = "SELECT terima_id,terima_no,terima_order_id,terima_supplier,terima_surat_jalan
			,terima_pengirim,terima_tanggal,terima_keterangan,terima_gudang_id,terima_status
			,terima_creator,terima_date_create,terima_updater,terima_date_update,terima_revised
			,order_no,supplier_nama";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from 		= " FROM master_terima_beli
			LEFT JOIN master_order_beli ON(master_order_beli.order_id = master_terima_beli.terima_order_id)
			LEFT JOIN supplier ON(supplier.supplier_id = master_terima_beli.terima_supplier)";
		$orderby 	= " ORDER BY terima_id";
		$limited 	= " LIMIT ".$start.",".$limit;
		
		// For simple search 
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " terima_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_no) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(is_numeric($query)){
				$from .= " terima_order_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_supplier) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_surat_jalan) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_pengirim) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_tanggal) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_keterangan) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(is_numeric($query)){
				$from .= " terima_gudang_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_status) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_creator) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_date_create) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_updater) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_date_update) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(terima_revised) LIKE '%".addslashes(strtolower($query))."%' OR";
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
		
		$pkey = array('terima_id'=>$data->terima_id);
		
		$arrdatacu = array(
			'terima_no'=>$data->terima_no,
			'terima_order_id'=>$data->terima_order_id,
			'terima_supplier'=>$data->terima_supplier,
			'terima_surat_jalan'=>$data->terima_surat_jalan,
			'terima_pengirim'=>$data->terima_pengirim,
			'terima_tanggal'=>(strlen(trim($data->terima_tanggal)) > 0 ? date('Y-m-d H:i:s', strtotime($data->terima_tanggal)) : NULL),
			'terima_keterangan'=>$data->terima_keterangan,
			'terima_gudang_id'=>$data->terima_gudang_id,
			'terima_status'=>$data->terima_status
		);
		
		$arrdataupdated = array(
			'terima_updater'=>$this->session->userdata('user_name'),
			'terima_date_update'=>date(LONG_FORMATDATE)
		);
		
		$arrdatau = array_merge($arrdatacu, $arrdataupdated);
		
		$arrdatacreated = array(
			'terima_creator'=>$this->session->userdata('user_name'),
			'terima_date_create'=>date(LONG_FORMATDATE)
		);
		
		$arrdatac = array_merge($arrdatacu, $arrdatacreated);
		
		if($this->db->get_where('master_terima_beli', $pkey)->num_rows() > 0){
			if($this->db->where(array('terima_id'=>$data->terima_id, 'terima_status'=>'Tertutup'))->get('master_terima_beli')->num_rows() > 0){
				if(($data->terima_status == 'Terbuka') OR ($data->terima_status == 'Batal')){
					$this->dterima_cu($data->terima_id, $data->detail);
					
					$this->db->where($pkey)->update('master_terima_beli', $arrdatau);
					if($this->db->affected_rows()){
						$this->db->where($pkey)->set('terima_revised', 'terima_revised+1', FALSE)->update('master_terima_beli');
					}
					
					/* cetak/tidak? */
					if($data->printvalue == 1){
						//CETAK
						$this->db->where($pkey)->set('terima_status', 'Tertutup')->update('master_terima_beli');
					}
					
					$last   = $data;
					$total  = $this->db->get('master_terima_beli')->num_rows();
					
					$json   = array(
						"success"   => TRUE,
						"message"   => 'Data berhasil diubah.',
						"total"     => $total,
						"data"      => $last
					);
					
				}else{
					$last   = $data;
					$total  = $this->db->get('master_terima_beli')->num_rows();
					
					$json   = array(
						"success"   => TRUE,
						"message"   => 'Status dokumen sudah tertutup, dan tidak dapat diubah.',
						"total"     => $total,
						"data"      => $last
					);
				}
				
			}else{
				/*
				 * Data Exist dan BISA DIUBAH
				 */
				$masterid = $data->terima_id;
				
				$this->db->where($pkey)->update('master_terima_beli', $arrdatau);
				if($this->db->affected_rows()){
					$this->db->where($pkey)->set('terima_revised', 'terima_revised+1', FALSE)->update('master_terima_beli');
				}
				$this->dterima_cu($masterid, $data->detail);
				
				/* cetak/tidak? */
				if($data->printvalue == 1){
					//CETAK
					$this->db->where($pkey)->set('terima_status', 'Tertutup')->update('master_terima_beli');
				}
				
				$last   = $data;
				$total  = $this->db->get('master_terima_beli')->num_rows();
				
				$json   = array(
					"success"   => TRUE,
					"message"   => 'Data berhasil diubah.',
					"total"     => $total,
					"data"      => $last
				);
			}
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			$this->db->insert('master_terima_beli', $arrdatac);
			$masterid = $this->db->select_max('terima_id')
				->where('terima_creator', $this->session->userdata('user_name'))
				->get('master_terima_beli')->row()->terima_id;
			if($masterid > 0){
				$this->dterima_cu($masterid, $data->detail);
				
				/* cetak/tidak? */
				if($data->printvalue == 1){
					//CETAK
					$this->db->where('terima_id', $masterid)->set('terima_status', 'Tertutup')->update('master_terima_beli');
				}
				
				$last   = $this->db->where('terima_id', $masterid)->get('master_terima_beli')->row();
			}
			
			$total  = $this->db->get('master_terima_beli')->num_rows();
			
			$json   = array(
				"success"   => TRUE,
				"message"   => 'Data berhasil disimpan',
				"total"     => $total,
				"data"      => $last
			);
			
		}
		
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
		$pkey = array('terima_id'=>$data->terima_id);
		
		$this->db->where($pkey)->delete('master_terima_beli');
		
		$total  = $this->db->get('master_terima_beli')->num_rows();
		$last = $this->db->get('master_terima_beli')->result();
		
		$json   = array(
			"success"   => TRUE,
			"message"   => 'Data berhasil dihapus',
			"total"     => $total,
			"data"      => $last
		);				
		return $json;
	}
	
	/**
	 * Fungsi	: dterima_cu
	 *
	 * Untuk menambahkan/mengubah tbl.detail_terima_beli(DETAIL) dari tbl.master_terima_beli(MASTER)
	 * 
	 * @param numeric $result
	 * @return json
	 */
	function dterima_cu($master_id, $datadet){
		/**
		 * DELETE db.detail_terima_beli dimana (dterima_id NOT INT (foreach($datadet)))
		 */
		$arrdterimaidexists = array();
		foreach($datadet as $row){
			if($row->dterima_id > 0){
				array_push($arrdterimaidexists, $row->dterima_id);
			}
		}
		
		$arrdterimaid2del = array();
		$rsgetdterimaid = $this->db->select('dterima_id')->where('dterima_master', $master_id)->get('detail_terima_beli')->result();
		if(sizeof($rsgetdterimaid) > 0){
			foreach($rsgetdterimaid as $row){
				array_push($arrdterimaid2del, $row->dterima_id);
			}
		}
		
		//get dterima_id to delete
		$rsdterimaid2del = array_diff($arrdterimaid2del, $arrdterimaidexists);
		if(sizeof($rsdterimaid2del) > 0){
			foreach($rsdterimaid2del as $row){
				$this->db->where(array('dterima_id'=>$row))->delete('detail_terima_beli');
			}
		}
		
		/**
		 * 1. Looping $datadet yang berisi Array data Grid detail
		 * 2. Check (ID detail == 0 ? INSERT : UPDATE)
		 */
		$result = 0;
		
		foreach($datadet as $row){
			if($row->dterima_id == 0){
				//INSERT
				$arrdatac = array(
					'dterima_master'		=> $master_id,
					'dterima_produk'		=> $row->dterima_produk,
					'dterima_produk_nama'	=> $row->dterima_produk_nama,
					'dterima_satuan'		=> $row->dterima_satuan,
					'dterima_satuan_nama'	=> $row->dterima_satuan_nama,
					'dterima_jumlah'		=> (trim($row->dterima_jumlah) == '' ? 0 : $row->dterima_jumlah),
					'dterima_harga'			=> (trim($row->dterima_harga) == '' ? 0 : $row->dterima_harga),
					'dterima_diskon'		=> (trim($row->dterima_diskon) == '' ? 0 : $row->dterima_diskon),
					'dterima_no_batch'		=> $row->dterima_no_batch,
					'dterima_expired_date'	=> (strlen(trim($row->dterima_expired_date)) > 0 ? date('Y-m-d', strtotime($row->dterima_expired_date)) : NULL),
					'dterima_keterangan'	=> $row->dterima_keterangan,
					'dterima_subtotal'		=> (trim($row->dterima_subtotal) == '' ? 0 : $row->dterima_subtotal)
				);
				$this->db->insert('detail_terima_beli', $arrdatac);
				
				$result += $this->db->affected_rows();
			}else{
				//UPDATE
				$arrdatau = array(
					'dterima_produk'		=> $row->dterima_produk,
					'dterima_produk_nama'	=> $row->dterima_produk_nama,
					'dterima_satuan'		=> $row->dterima_satuan,
					'dterima_satuan_nama'	=> $row->dterima_satuan_nama,
					'dterima_jumlah'		=> (trim($row->dterima_jumlah) == '' ? 0 : $row->dterima_jumlah),
					'dterima_harga'			=> (trim($row->dterima_harga) == '' ? 0 : $row->dterima_harga),
					'dterima_diskon'		=> (trim($row->dterima_diskon) == '' ? 0 : $row->dterima_diskon),
					'dterima_no_batch'		=> $row->dterima_no_batch,
					'dterima_expired_date'	=> (strlen(trim($row->dterima_expired_date)) > 0 ? date('Y-m-d', strtotime($row->dterima_expired_date)) : NULL),
					'dterima_keterangan'	=> $row->dterima_keterangan,
					'dterima_subtotal'		=> (trim($row->dterima_subtotal) == '' ? 0 : $row->dterima_subtotal)
				);
				$this->db->where('dterima_id', $row->dterima_id)
						 ->update('detail_terima_beli', $arrdatau);
				
				$result += $this->db->affected_rows();
			}
		}
		
		return $result;
	}
	
	function printForm($terima_id){
		$sql = "SELECT *
			FROM master_terima_beli AS t1
			JOIN detail_terima_beli AS t2 ON(t2.dterima_master = t1.terima_id)
			JOIN produk ON(produk.produk_id = t2.dterima_produk)
			JOIN satuan ON(satuan.satuan_id = t2.dterima_satuan)
			LEFT JOIN supplier AS t3 ON(t3.supplier_id = t1.terima_supplier)
			WHERE t1.terima_id = ".$terima_id;
		return $this->db->query($sql)->result();
	}
}
?>
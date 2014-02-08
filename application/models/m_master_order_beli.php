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
	function getAll($start, $page, $limit, $query, $filter){
		$select = "SELECT order_id,order_no,order_supplier,order_tanggal,order_carabayar
			,order_diskon,order_cashback,order_totalbiaya,order_ttlbiaya_lain2,order_dp
			,order_sisa_bayar,order_keterangan,order_status_acc,order_status,order_creator
			,order_date_create,order_update,order_date_update,order_revised
			,supplier_nama";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from 		= " FROM master_order_beli
			LEFT JOIN supplier ON(supplier.supplier_id = master_order_beli.order_supplier)";
		$orderby 	= " ORDER BY order_id";
		$limited 	= " LIMIT ".$start.",".$limit;
		
		// For simple search 
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " AND ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " order_id = ".addslashes(strtolower($query))." OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_no) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_supplier) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_tanggal) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_carabayar) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_diskon) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_cashback) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_totalbiaya) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_ttlbiaya_lain2) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_dp) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_sisa_bayar) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_keterangan) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_status_acc) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_status) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_creator) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_date_create) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_update) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_date_update) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			if(! is_numeric($query)){
				$from .= " lower(order_revised) LIKE '%".addslashes(strtolower($query))."%' OR";
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
		
		$pkey = array('order_id'=>$data->order_id);
		
		$arrdatacu = array(
			'order_no'=>$data->order_no,
			'order_supplier'=>$data->order_supplier,
			'order_tanggal'=>(strlen(trim($data->order_tanggal)) > 0 ? date('Y-m-d H:i:s', strtotime($data->order_tanggal)) : NULL),
			'order_carabayar'=>$data->order_carabayar,
			//'order_diskon'=>$data->order_diskon,
			//'order_cashback'=>$data->order_cashback,
			'order_totalbiaya'=>$this->m_public_function->stringnumber_tofloat($data->order_totalbiaya),
			'order_dp'=>$this->m_public_function->stringnumber_tofloat($data->order_dp),
			'order_sisa_bayar'=>$this->m_public_function->stringnumber_tofloat($data->order_sisa_bayar),
			'order_keterangan'=>$data->order_keterangan,
			'order_status_acc'=>$data->order_status_acc,
			'order_status'=>$data->order_status
		);
		
		$arrdataupdated = array(
			'order_update'=>$this->session->userdata('user_name'),
			'order_date_update'=>date(LONG_FORMATDATE)
		);
		
		$arrdatau = array_merge($arrdatacu, $arrdataupdated);
		
		$arrdatacreated = array(
			'order_creator'=>$this->session->userdata('user_name'),
			'order_date_create'=>date(LONG_FORMATDATE)
		);
		
		$arrdatac = array_merge($arrdatacu, $arrdatacreated);
		
		if($this->db->get_where('master_order_beli', $pkey)->num_rows() > 0){
			if($this->db->where(array('order_id'=>$data->order_id, 'order_status'=>'Tertutup'))->get('master_order_beli')->num_rows() > 0){
				if(($data->order_status == 'Terbuka') OR ($data->order_status == 'Batal')){
					$this->dorder_cu($data->order_id, $data->detail);
					
					$this->db->where($pkey)->update('master_order_beli', $arrdatau);
					if($this->db->affected_rows()){
						$this->db->where($pkey)->set('order_revised', 'order_revised+1', FALSE)->update('master_order_beli');
					}
					
					/* cetak/tidak? */
					if($data->printvalue == 1){
						//CETAK
						$this->db->where($pkey)->set('order_status', 'Tertutup')->update('master_order_beli');
					}
					
					$last   = $data;
					$total  = $this->db->get('master_order_beli')->num_rows();
					
					$json   = array(
						"success"   => TRUE,
						"message"   => 'Data berhasil diubah.',
						"total"     => $total,
						"data"      => $last
					);
					
				}else{
					$last   = $data;
					$total  = $this->db->get('master_order_beli')->num_rows();
					
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
				$masterid = $data->order_id;
				
				$this->db->where($pkey)->update('master_order_beli', $arrdatau);
				if($this->db->affected_rows()){
					$this->db->where($pkey)->set('order_revised', 'order_revised+1', FALSE)->update('master_order_beli');
				}
				$this->dorder_cu($masterid, $data->detail);
				
				/* cetak/tidak? */
				if($data->printvalue == 1){
					//CETAK
					$this->db->where($pkey)->set('order_status', 'Tertutup')->update('master_order_beli');
				}
				
				$last   = $data;
				$total  = $this->db->get('master_order_beli')->num_rows();
				
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
			
			$this->db->insert('master_order_beli', $arrdatac);
			$masterid = $this->db->select_max('order_id')
				->where('order_creator', $this->session->userdata('user_name'))
				->get('master_order_beli')->row()->order_id;
			if($masterid > 0){
				$this->dorder_cu($masterid, $data->detail);
				
				/* cetak/tidak? */
				if($data->printvalue == 1){
					//CETAK
					$this->db->where('order_id', $masterid)->set('order_status', 'Tertutup')->update('master_order_beli');
				}
				
				$last   = $this->db->where('order_id', $masterid)->get('master_order_beli')->row();
			}
			
			$total  = $this->db->get('master_order_beli')->num_rows();
			
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
		/**
		 * 1. CHECK db.master_order_beli.order_status == 'Tertutup' ?
		 * 1.a. Jika iya ==> delete detail_order_beli"
		 * 1.b. Jika tidak ==> "delete tail_order_beli"
		 */
		$pkey = array('order_id'=>$data->order_id);
		
		if($this->db->where(array('order_id'=>$data->order_id, 'order_status'=>'Tertutup'))->get('master_order_beli')->num_rows() > 0){
			/**
			 * 1.a. order_status = "tertutup"
			 * 1.a.3. delete stok detail_order_beli
			 * 1.a.3. delete stok master_order_beli
			 */
			
			//DELETE detail_order_beli
			$this->db->where('dorder_master',$data->order_id)->delete('detail_order_beli');
			//DELETE master_order_beli
			$this->db->where($pkey)->delete('master_order_beli');
			
		}else{
			//DELETE detail_order_beli
			$this->db->where('dorder_master',$data->order_id)->delete('detail_order_beli');
			//DELETE master_order_beli
			$this->db->where($pkey)->delete('master_order_beli');
			
		}
		
		$total  = $this->db->get('master_order_beli')->num_rows();
		$last 	= $this->db->get_where('master_order_beli', array('order_id'=>$data->order_id))->result();
		
		$json   = array(
			"success"   => TRUE,
			"message"   => 'Data berhasil dihapus',
			"total"     => $total,
			"data"      => $last
		);				
		return $json;
		
		
		
		
		$pkey = array('order_id'=>$data->order_id);
		
		$this->db->where($pkey)->delete('master_order_beli');
		
		$total  = $this->db->get('master_order_beli')->num_rows();
		$last = $this->db->get('master_order_beli')->result();
		
		$json   = array(
			"success"   => TRUE,
			"message"   => 'Data berhasil dihapus',
			"total"     => $total,
			"data"      => $last
		);				
		return $json;
	}
	
	/**
	 * Fungsi	: dorder_cu
	 *
	 * Untuk menambahkan/mengubah tbl.detail_order_beli(DETAIL) dari tbl.master_order_beli(MASTER)
	 * 
	 * @param numeric $result
	 * @return json
	 */
	function dorder_cu($master_id, $datadet){
		/**
		 * DELETE db.detail_order_beli dimana (dorder_id NOT INT (foreach($datadet)))
		 */
		$arrdorderidexists = array();
		foreach($datadet as $row){
			if($row->dorder_id > 0){
				array_push($arrdorderidexists, $row->dorder_id);
			}
		}
		
		$arrdorderid2del = array();
		$rsgetdorderid = $this->db->select('dorder_id')->where('dorder_master', $master_id)->get('detail_order_beli')->result();
		if(sizeof($rsgetdorderid) > 0){
			foreach($rsgetdorderid as $row){
				array_push($arrdorderid2del, $row->dorder_id);
			}
		}
		
		//get dorder_id to delete
		$rsdorderid2del = array_diff($arrdorderid2del, $arrdorderidexists);
		if(sizeof($rsdorderid2del) > 0){
			foreach($rsdorderid2del as $row){
				$this->db->where(array('dorder_id'=>$row))->delete('detail_order_beli');
			}
		}
		
		/**
		 * 1. Looping $datadet yang berisi Array data Grid detail
		 * 2. Check (ID detail == 0 ? INSERT : UPDATE)
		 */
		$result = 0;
		
		foreach($datadet as $row){
			if($row->dorder_id == 0){
				//INSERT
				$arrdatac = array(
					'dorder_master'		=> $master_id,
					'dorder_produk'		=> $row->dorder_produk,
					'dorder_produk_nama'=> $row->dorder_produk_nama,
					'dorder_satuan'		=> $row->dorder_satuan,
					'dorder_satuan_nama'=> $row->dorder_satuan_nama,
					'dorder_jumlah'		=> (trim($row->dorder_jumlah) == '' ? 0 : $row->dorder_jumlah),
					'dorder_harga'		=> (trim($row->dorder_harga) == '' ? 0 : $row->dorder_harga),
					'dorder_diskon'		=> (trim($row->dorder_diskon) == '' ? 0 : $row->dorder_diskon),
					'dorder_subtotal'	=> (trim($row->dorder_subtotal) == '' ? 0 : $row->dorder_subtotal)
				);
				$this->db->insert('detail_order_beli', $arrdatac);
				
				$result += $this->db->affected_rows();
			}else{
				//UPDATE
				$arrdatau = array(
					'dorder_produk'		=> $row->dorder_produk,
					'dorder_produk_nama'=> $row->dorder_produk_nama,
					'dorder_satuan'		=> $row->dorder_satuan,
					'dorder_satuan_nama'=> $row->dorder_satuan_nama,
					'dorder_jumlah'		=> (trim($row->dorder_jumlah) == '' ? 0 : $row->dorder_jumlah),
					'dorder_harga'		=> (trim($row->dorder_harga) == '' ? 0 : $row->dorder_harga),
					'dorder_diskon'		=> (trim($row->dorder_diskon) == '' ? 0 : $row->dorder_diskon),
					'dorder_subtotal'	=> (trim($row->dorder_subtotal) == '' ? 0 : $row->dorder_subtotal)
				);
				$this->db->where('dorder_id', $row->dorder_id)
						 ->update('detail_order_beli', $arrdatau);
				
				$result += $this->db->affected_rows();
			}
		}
		
		return $result;
	}
	
	function printForm($order_id){
		$sql = "SELECT *
			FROM master_order_beli AS t1
			JOIN detail_order_beli AS t2 ON(t2.dorder_master = t1.order_id)
			JOIN produk ON(produk.produk_id = t2.dorder_produk)
			JOIN satuan ON(satuan.satuan_id = t2.dorder_satuan)
			LEFT JOIN supplier AS t3 ON(t3.supplier_id = t1.order_supplier)
			WHERE t1.order_id = ".$order_id;
		return $this->db->query($sql)->result();
	}
}
?>
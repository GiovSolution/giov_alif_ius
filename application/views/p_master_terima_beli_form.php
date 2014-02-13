<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>PENERIMAAN BARANG</title>
	
	<style tyle="text/css">
	<!--
	@page { size:8.5in 11in; margin-left: 1cm; margin-right: 1cm; }
	body {
		margin-top: 0cm;
	}
	/*@media print{
		body {
			font-family: sans-serif;
			font-size: 10px;
		}
	}*/
	-->
	</style>
	
	<style type="text/css">
	
	/* Printing Layout */
	table {
		border-collapse: collapse;
		border: 2px solid #0000;
		font: normal arial, verdana, helvetica, sans-serif;
		color: #000;
		background: #fff;
		font-family: Calibri;
		font-size: 9pt;
	}
	caption {
		padding: 0 0.6em 0.8em;
		font-size: 1.3em;
		font-weight: bold;
		text-align: center;
		color: #000;
		background: transparent;
	}
	td, th {
		border: 1px solid #000000;
		padding: 0.1em;
		text-align: inherit;
		font-family: Calibri;
		font-size: 9pt;
	}
	thead th {
		border: 1px solid #e0e0e0;
		text-align: left;
		font-size: 1em;
		font-weight: bold;
		background: transparent;
	}
	tfoot th, tfoot td {
		border: 1px solid #e0e0e0;
		text-align:inherit;
		font-size: 1em;
		background: transparent;
	}
	tfoot th {
		font-weight: bold;
	}
	tbody td a {
		background: transparent;
		color: #00c;
		text-decoration: underline;
		text-align:inherit;
	}
	tbody td a:hover {
		background: transparent;
		color: #00c;
		text-decoration: underline;
	}
	tbody th a {
		background: transparent;
		text-decoration: underline;
		font-weight: bold;
	}
	tbody th a:visited {
		color: #b98b00;
	}
	tbody th, tbody td {
		vertical-align: top;
		text-align: inherit;
	}
	tfoot td {
		border: 1px solid #996;
	}
	tbody tr:hover {
		background: #ffffd9;
	}
	
	.numeric{
		text-align: right;
	}
	
	.clear{
		border: none;
		text-align:inherit;
	}
	</style>
</head>

<body>
	<table cellpadding="0" cellspacing="0" border="1" style="width: 8.5in; padding-top: 40px;" height="180px">
		<tr>
			<td style="width: 8.5in;" colspan="2">
				<table width="100%" cellpadding="0" cellspacing="0" border="1">
					<tr>
						<td width="50%">
							<table width="100%" cellpadding="0" cellspacing="0" style="border: 0px;">
								<tr>
									<td style="border: 0px;">
										<!--RSUD DR. M. SOEWANDHIE-->
										<b>
										<?php
										//if(sizeof($infors) > 0){
											//foreach($infors as $row){
												print 'Nama Perusahaan';
												print "<br/>";
												print 'Alamat Perusahaan';
												//break;
											//}
										//}
										?>
										</b>
									</td>
								</tr>
							</table>
						</td>
						<td width="50%" style="text-align: center; vertical-align: middle;">
							<b>FAKTUR PENERIMAAN BARANG</b>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<?php
		if(sizeof($records) > 0){
			$created_by = "";
			foreach($records as $row){
				$created_by = $row->terima_creator;
		?>
		<tr>
			<td style="width: 4.25in;">
				<table width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td style="border: 0px; width: 100px;">No. Transaksi</td>
						<td style="border: 0px; width: 10px;">:</td>
						<td style="border: 0px;"><?php print $row->terima_no;?></td>
					</tr>
					<tr>
						<td style="border: 0px;">Tanggal</td>
						<td style="border: 0px;">:</td>
						<td style="border: 0px;"><?php print date('d-M-Y', strtotime($row->terima_tanggal));?></td>
					</tr>
				</table>
			</td>
			<td style="width: 4.25in;">
				<table width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td style="border: 0px; width: 100px;">Supplier</td>
						<td style="border: 0px; width: 10px;">:</td>
						<td style="border: 0px;"><?php print $row->supplier_nama;?></td>
					</tr>
					<tr>
						<td style="border: 0px;">Alamat Supplier</td>
						<td style="border: 0px;">:</td>
						<td style="border: 0px;"><?php print $row->supplier_alamat;?></td>
					</tr>
				</table>
			</td>
		</tr>
		<?php
				break;
			}
		}
		?>
		<tr>
			<td style="width: 8.5in;" colspan="2">
				<table width="100%" cellpadding="0" cellspacing="0" border="1">
					<tr>
						<td style="text-align: center;" width="5%">No.</td>
						<td style="text-align: center;" width="30%">Produk</td>
						<td style="text-align: center;" width="10%">Satuan</td>
						<td style="text-align: center;" width="10%">Jumlah</td>
						<td style="text-align: center;" width="10%">Harga</td>
						<td style="text-align: center;" width="10%">Disc(%)</td>
						<td style="text-align: center;" width="10%">Sub Total</td>
					</tr>
					<?php
					$total = 0;
					if(sizeof($records) > 0){
						$i = 1;
						foreach($records as $row){
					?>
					<tr>
						<td><?php print $i;?></td>
						<td><?php print $row->produk_nama;?></td>
						<td><?php print $row->satuan_nama;?></td>
						<td style="text-align: right;"><?php print number_format($row->dterima_jumlah,0,',','.');?></td>
						<td style="text-align: right;"><?php print number_format($row->dterima_harga,0,',','.');?></td>
						<td style="text-align: right;"><?php print number_format($row->dterima_diskon,0,',','.');?></td>
						<td style="text-align: right;"><?php print number_format($row->dterima_subtotal,0,',','.');?></td>
					</tr>
					<?php
							$total+=$row->dterima_subtotal;
							$i++;
						}
					}
					?>
				</table>
			</td>
		</tr>
		<tr>
			<td style="width: 8.5in;" colspan="2">
				<table width="100%" cellpadding="0" cellspacing="0" border="1">
					<tr>
						<td width="77%" style="border: 0px;">&nbsp;</td>
						<td width="8%" style="border: 0px; font-weight: bold;">TOTAL (Rp)</td>
						<td width="5%" style="border: 0px; font-weight: bold;">:</td>
						<td width="10%" style="border: 0px; text-align: right; font-weight: bold;"><?php print number_format($total,0,',','.');?></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td style="width: 8.5in;" colspan="2">
				<table width="100%" cellpadding="0" cellspacing="0" border="1">
					<tr>
						<td width="35%">
							<p><b><u>Keterangan</u></b></p>
							<p>&nbsp;</p>
							<p>&nbsp;</p>
						</td>
						<td width="65%">
							<table width="100%" cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td width="50%" style="border: 0px;">
										<p>&nbsp;</p>
										<p>&nbsp;</p>
										<p>&nbsp;</p>
									</td>
									<td width="50%" style="border: 0px;">
										<center><p><strong>Dibuat Oleh</strong></p></center>
										<p>&nbsp;</p>
										<center><p>( &nbsp;<?php print $created_by;?>&nbsp; )</p></center>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

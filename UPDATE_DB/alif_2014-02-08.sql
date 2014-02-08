ALTER TABLE `detail_order_beli` ADD COLUMN `dorder_produk_nama`  varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL AFTER `dorder_produk`;
ALTER TABLE `detail_order_beli` ADD COLUMN `dorder_satuan_nama`  varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL AFTER `dorder_satuan`;
ALTER TABLE `detail_order_beli` MODIFY COLUMN `dorder_harga`  double NULL DEFAULT 0 AFTER `dorder_jumlah`;
ALTER TABLE `detail_order_beli` ADD COLUMN `dorder_subtotal`  double NULL DEFAULT 0 AFTER `dorder_harga_log`;
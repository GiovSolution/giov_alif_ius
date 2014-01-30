/* Alter Table master_order_beli ==> Ubah type order_tanggal */
ALTER TABLE `master_order_beli` MODIFY COLUMN `order_tanggal`  datetime NULL DEFAULT NULL AFTER `order_supplier`;
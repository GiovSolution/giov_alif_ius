ALTER TABLE `detail_order_beli` MODIFY COLUMN `dorder_satuan`  int(11) NULL DEFAULT NULL AFTER `dorder_produk_nama`;



ALTER TABLE `master_terima_beli` ADD COLUMN `terima_status`  enum('Terbuka','Tertutup','Batal') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Terbuka' AFTER `terima_gudang_id`;
ALTER TABLE `master_terima_beli` ADD COLUMN `terima_revised`  int(11) NULL DEFAULT NULL AFTER `terima_date_update`;


ALTER TABLE `detail_terima_beli` ADD COLUMN `dterima_produk_nama`  varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL AFTER `dterima_produk`;
ALTER TABLE `detail_terima_beli` ADD COLUMN `dterima_satuan_nama`  varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL AFTER `dterima_satuan`;
ALTER TABLE `detail_terima_beli` ADD COLUMN `dterima_subtotal`  double NULL DEFAULT 0 AFTER `dterima_keterangan`;




ALTER TABLE `detail_terima_beli` ADD COLUMN `dterima_diskon`  float NULL DEFAULT NULL AFTER `dterima_harga`;



/*ADD CHILD*/
LOCK TABLE s_menus WRITE;
SELECT @myRight := menu_rgt FROM s_menus WHERE MENU_KODE = 'TRANSAKSI';

UPDATE s_menus SET menu_rgt = menu_rgt + 2 WHERE menu_rgt >= @myRight;
UPDATE s_menus SET menu_lft = menu_lft + 2 WHERE menu_lft > @myRight;

INSERT INTO s_menus(menu_id, menu_kode, menu_parent, menu_position, menu_title, menu_filename, menu_lft, menu_rgt) 
VALUES(302, 'MASTER_TERIMA_BELI', 3, 2, 'Penerimaan Barang', 'MASTER_TERIMA_BELI', @myRight, @myRight + 1);
UNLOCK TABLES;
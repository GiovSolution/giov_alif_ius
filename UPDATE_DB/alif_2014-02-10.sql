/*ADD CHILD*/
LOCK TABLE s_menus WRITE;
SELECT @myRight := menu_rgt FROM s_menus WHERE MENU_KODE = 'TRANSAKSI';

UPDATE s_menus SET menu_rgt = menu_rgt + 2 WHERE menu_rgt >= @myRight;
UPDATE s_menus SET menu_lft = menu_lft + 2 WHERE menu_lft > @myRight;

INSERT INTO s_menus(menu_id, menu_kode, menu_parent, menu_position, menu_title, menu_filename, menu_lft, menu_rgt) 
VALUES(301, 'MASTER_ORDER_BELI', 3, 1, 'Order Pembelian', 'MASTER_ORDER_BELI', @myRight, @myRight + 1);
UNLOCK TABLES;



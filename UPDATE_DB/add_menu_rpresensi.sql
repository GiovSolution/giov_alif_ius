LOCK TABLE s_menus WRITE;
SELECT @myRight := MENU_RGT FROM s_menus WHERE MENU_KODE = 'LAPORAN';

UPDATE s_menus SET MENU_RGT = MENU_RGT + 2 WHERE MENU_RGT >= @myRight;
UPDATE s_menus SET MENU_LFT = MENU_LFT + 2 WHERE MENU_LFT > @myRight;

INSERT INTO s_menus(MENU_ID, MENU_KODE, MENU_PARENT, MENU_POSITION, MENU_TITLE, MENU_FILENAME, MENU_LFT, MENU_RGT) 
VALUES(658, 'RPRESENSI', 6, 58, 'Report Presensi / Absensi', 'RPRESENSI', @myRight, @myRight + 1);
UNLOCK TABLES;
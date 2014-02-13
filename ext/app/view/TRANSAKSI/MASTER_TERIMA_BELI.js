Ext.define('INVENT.view.TRANSAKSI.MASTER_TERIMA_BELI', {
	extend		: 'Ext.tab.Panel',
	id			: 'TRANSAKSI.view.MASTER_TERIMA_BELI',
	
	alias		: 'widget.MASTER_TERIMA_BELI',
	
	title		: 'Penerimaan Barang',
	margins		: 0,
	tabPosition	: 'right',
	activeTab	: 0,
	closable	: true,
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'v_master_terima_beli'
			}, {
				xtype: 'v_master_terima_beli_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
Ext.define('INVENT.view.TRANSAKSI.MASTER_ORDER_BELI', {
	extend		: 'Ext.tab.Panel',
	id			: 'TRANSAKSI.view.MASTER_ORDER_BELI',
	
	alias		: 'widget.MASTER_ORDER_BELI',
	
	title		: 'Order Pembelian',
	margins		: 0,
	tabPosition	: 'right',
	activeTab	: 0,
	closable	: true,
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'v_master_order_beli'
			}, {
				xtype: 'v_master_order_beli_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
Ext.define('INVENT.view.TRANSAKSI.MASTER_ORDER_BELI', {
	extend: 'Ext.tab.Panel',
	
	alias	: 'widget.MASTER_ORDER_BELI',
	
	title	: 'Order Pembelian',
	margins: 0,
	tabPosition: 'right',
	activeTab: 0,
	
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
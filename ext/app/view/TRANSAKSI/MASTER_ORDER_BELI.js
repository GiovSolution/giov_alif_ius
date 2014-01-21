Ext.define('YMPI.view.TRANSAKSI.MASTER_ORDER_BELI', {
	extend: 'Ext.tab.Panel',
	
	alias	: 'widget.MASTER_ORDER_BELI',
	
	title	: 'master_order_beli',
	margins: 0,
	tabPosition: 'right',
	activeTab: 0,
	
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'Listmaster_order_beli'
			}, {
				xtype: 'v_master_order_beli_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
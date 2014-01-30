Ext.define('INVENT.view.MASTER.PRODUK', {
	extend: 'Ext.tab.Panel',
	
	alias	: 'widget.PRODUK',
	
	title	: 'produk',
	margins: 0,
	tabPosition: 'right',
	activeTab: 0,
	
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'v_produk'
			}, {
				xtype: 'v_produk_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
Ext.define('INVENT.view.MASTER.SUPPLIER', {
	extend: 'Ext.tab.Panel',
	
	alias	: 'widget.SUPPLIER',
	
	title	: 'supplier',
	margins: 0,
	tabPosition: 'right',
	activeTab: 0,
	
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'Listsupplier'
			}, {
				xtype: 'v_supplier_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
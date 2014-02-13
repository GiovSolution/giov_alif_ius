Ext.define('INVENT.view.MASTER.GUDANG', {
	extend		: 'Ext.tab.Panel',
	id			: 'MASTER.view.GUDANG',
	
	alias		: 'widget.GUDANG',
	
	title		: 'gudang',
	margins		: 0,
	tabPosition	: 'right',
	activeTab	: 0,
	closable	: true,
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'v_gudang'
			}, {
				xtype: 'v_gudang_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
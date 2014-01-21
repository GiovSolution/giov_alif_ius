Ext.define('YMPI.view.MASTER.CABANG', {
	extend: 'Ext.tab.Panel',
	
	alias	: 'widget.CABANG',
	
	title	: 'cabang',
	margins: 0,
	tabPosition: 'right',
	activeTab: 0,
	
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'Listcabang'
			}, {
				xtype: 'v_cabang_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});
Ext.define('INVENT.view.MASTER.SATUAN', {
	extend: 'Ext.form.Panel',
	
	bodyPadding: 0,
	layout: 'border',
	initComponent: function(){
		this.items = [{
			region: 'center',
			layout: {
				type : 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype	: 'v_satuan',
				flex: 1
			}]
		}];
		
		this.callParent(arguments);
	}
	
});
Ext.define('INVENT.view.TRANSAKSI.DETAIL_TERIMA_BELI', {
	extend		: 'Ext.form.Panel',
	
	alias		: 'widget.DETAIL_TERIMA_BELI',
	
	title		: 'detail_terima_beli',
	bodyPadding	: 0,
	layout		: 'border',
	closable	: true,
	initComponent: function(){
		this.items = [{
			region: 'center',
			layout: {
				type : 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype	: 'v_detail_terima_beli',
				flex: 1
			}]
		}];
		
		this.callParent(arguments);
	}
	
});
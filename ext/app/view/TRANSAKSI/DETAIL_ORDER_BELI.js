Ext.define('INVENT.view.TRANSAKSI.DETAIL_ORDER_BELI', {
	extend		: 'Ext.form.Panel',
	
	alias		: 'widget.DETAIL_ORDER_BELI',
	
	title		: 'detail_order_beli',
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
				xtype	: 'v_detail_order_beli',
				flex: 1
			}]
		}];
		
		this.callParent(arguments);
	}
	
});
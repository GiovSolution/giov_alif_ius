Ext.define('INVENT.store.s_detail_terima_beli', {
	extend	: 'Ext.data.Store',
	alias	: 'widget.detail_terima_beliStore',
	model	: 'INVENT.model.m_detail_terima_beli',
	
	autoLoad	: false,
	autoSync	: false,
	
	storeId		: 'detail_terima_beli',
	
	pageSize	: 15, // number display per Grid
	
	proxy: {
		type: 'ajax',
		api: {
			read    : 'c_detail_terima_beli/getAll',
			create	: 'c_detail_terima_beli/save',
			update	: 'c_detail_terima_beli/save',
			destroy	: 'c_detail_terima_beli/delete'
		},
		actionMethods: {
			read    : 'POST',
			create	: 'POST',
			update	: 'POST',
			destroy	: 'POST'
		},
		reader: {
			type            : 'json',
			root            : 'data',
			rootProperty    : 'data',
			successProperty : 'success',
			messageProperty : 'message'
		},
		writer: {
			type            : 'json',
			writeAllFields  : true,
			root            : 'data',
			encode          : true
		},
		listeners: {
			exception: function(proxy, response, operation){
				Ext.MessageBox.show({
					title: 'REMOTE EXCEPTION',
					msg: operation.getError(),
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		}
	},
	
	constructor: function(){
		this.callParent(arguments);
	}
	
});
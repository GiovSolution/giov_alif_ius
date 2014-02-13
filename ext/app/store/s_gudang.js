Ext.define('INVENT.store.s_gudang', {
	extend	: 'Ext.data.Store',
	alias	: 'widget.gudangStore',
	model	: 'INVENT.model.m_gudang',
	
	autoLoad	: true,
	autoSync	: false,
	
	storeId		: 'gudang',
	
	pageSize	: 15, // number display per Grid
	
	proxy: {
		type: 'ajax',
		api: {
			read    : 'c_gudang/getAll',
			create	: 'c_gudang/save',
			update	: 'c_gudang/save',
			destroy	: 'c_gudang/delete'
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
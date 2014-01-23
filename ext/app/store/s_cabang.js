Ext.define('INVENT.store.s_cabang', {
	extend	: 'Ext.data.Store',
	alias	: 'widget.cabangStore',
	model	: 'INVENT.model.m_cabang',
	
	autoLoad	: false,
	autoSync	: false,
	
	storeId		: 'cabang',
	
	pageSize	: 15, // number display per Grid
	
	proxy: {
		type: 'ajax',
		api: {
			read    : 'c_cabang/getAll',
			create	: 'c_cabang/save',
			update	: 'c_cabang/save',
			destroy	: 'c_cabang/delete'
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
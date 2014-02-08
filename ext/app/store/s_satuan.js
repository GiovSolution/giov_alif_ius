Ext.define('INVENT.store.s_satuan', {
	extend	: 'Ext.data.Store',
	alias	: 'widget.satuanStore',
	model	: 'INVENT.model.m_satuan',
	
	autoLoad	: false,
	autoSync	: false,
	
	storeId		: 'satuan',
	
	pageSize	: 15, // number display per Grid
	
	proxy: {
		type: 'ajax',
		api: {
			read    : 'c_satuan/getAll',
			create	: 'c_satuan/save',
			update	: 'c_satuan/save',
			destroy	: 'c_satuan/delete'
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
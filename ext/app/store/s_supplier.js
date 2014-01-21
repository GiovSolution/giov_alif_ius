Ext.define('YMPI.store.s_supplier', {
	extend	: 'Ext.data.Store',
	alias	: 'widget.supplierStore',
	model	: 'YMPI.model.m_supplier',
	
	autoLoad	: false,
	autoSync	: false,
	
	storeId		: 'supplier',
	
	pageSize	: 15, // number display per Grid
	
	proxy: {
		type: 'ajax',
		api: {
			read    : 'c_supplier/getAll',
			create	: 'c_supplier/save',
			update	: 'c_supplier/save',
			destroy	: 'c_supplier/delete'
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
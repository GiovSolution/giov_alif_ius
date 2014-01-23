Ext.define('INVENT.view.TRANSAKSI.v_master_order_beli_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_master_order_beli_form',
	
	region:'east',
	id: 'east-region-container',
	
	title		: 'Create/Update master_order_beli',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
    	/*
		 * Deklarasi variable setiap field
		 */
		var order_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'order_id_field',
			name: 'order_id', /* column name of table */
			fieldLabel: 'order_id',
			allowBlank: false /* jika primary_key */,
			maxLength: 11 /* length of column name */});
		var order_no_field = Ext.create('Ext.form.field.TextArea', {
			name: 'order_no', /* column name of table */
			fieldLabel: 'order_no',
			maxLength: 50 /* length of column name */
		});
		var order_supplier_field = Ext.create('Ext.form.field.Number', {
			name: 'order_supplier', /* column name of table */
			fieldLabel: 'order_supplier',
			maxLength: 11 /* length of column name */
		});
		var order_tanggal_field = Ext.create('Ext.form.field.Date', {
			name: 'order_tanggal', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'order_tanggal'
		});
		var order_carabayar_field = Ext.create('Ext.form.field.Text', {
			name: 'order_carabayar', /* column name of table */
			fieldLabel: 'order_carabayar'
		});
		var order_diskon_field = Ext.create('Ext.form.field.Text', {
			name: 'order_diskon', /* column name of table */
			fieldLabel: 'order_diskon',
			maxLength: 2 /* length of column name */
		});
		var order_cashback_field = Ext.create('Ext.form.field.Text', {
			name: 'order_cashback', /* column name of table */
			fieldLabel: 'order_cashback'
		});
		var order_totalbiaya_field = Ext.create('Ext.form.field.Text', {
			name: 'order_totalbiaya', /* column name of table */
			fieldLabel: 'order_totalbiaya'
		});
		var order_ttlbiaya_lain2_field = Ext.create('Ext.form.field.Text', {
			name: 'order_ttlbiaya_lain2', /* column name of table */
			fieldLabel: 'order_ttlbiaya_lain2'
		});
		var order_dp_field = Ext.create('Ext.form.field.Text', {
			name: 'order_dp', /* column name of table */
			fieldLabel: 'order_dp'
		});
		var order_sisa_bayar_field = Ext.create('Ext.form.field.Text', {
			name: 'order_sisa_bayar', /* column name of table */
			fieldLabel: 'order_sisa_bayar'
		});
		var order_keterangan_field = Ext.create('Ext.form.field.TextArea', {
			name: 'order_keterangan', /* column name of table */
			fieldLabel: 'order_keterangan',
			maxLength: 500 /* length of column name */
		});
		var order_status_acc_field = Ext.create('Ext.form.field.Text', {
			name: 'order_status_acc', /* column name of table */
			fieldLabel: 'order_status_acc'
		});
		var order_status_field = Ext.create('Ext.form.field.Text', {
			name: 'order_status', /* column name of table */
			fieldLabel: 'order_status'
		});
		var order_creator_field = Ext.create('Ext.form.field.TextArea', {
			name: 'order_creator', /* column name of table */
			fieldLabel: 'order_creator',
			maxLength: 50 /* length of column name */
		});
		var order_date_create_field = Ext.create('Ext.form.field.Date', {
			name: 'order_date_create', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'order_date_create'
		});
		var order_update_field = Ext.create('Ext.form.field.TextArea', {
			name: 'order_update', /* column name of table */
			fieldLabel: 'order_update',
			maxLength: 50 /* length of column name */
		});
		var order_date_update_field = Ext.create('Ext.form.field.Date', {
			name: 'order_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'order_date_update'
		});
		var order_revised_field = Ext.create('Ext.form.field.Number', {
			name: 'order_revised', /* column name of table */
			fieldLabel: 'order_revised',
			maxLength: 11 /* length of column name */
		});
		
		var statusbar_info = Ext.create('Ext.Component', {
			id: 'formErrorStateMASTER_ORDER_BELI',
			invalidCls: Ext.baseCSSPrefix + 'form-invalid-icon',
			validCls: Ext.baseCSSPrefix + 'dd-drop-icon',
			baseCls: 'form-error-state',
			flex: 1,
			validText: 'Form is valid',
			invalidText: 'Form has errors',
			style: {
				paddingLeft: '20px'
			},
			
			setErrors: function(errors) {
				var me = this;
				
				errors = Ext.Array.from(errors);
				
				// Update CSS class and tooltip content
				if (errors.length) {
					me.addCls(me.invalidCls);
					me.removeCls(me.validCls);
					me.update(me.invalidText);
				} else {
					me.addCls(me.validCls);
					me.removeCls(me.invalidCls);
					me.update(me.validText);
				}
			}
		});
		
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 120,
                msgTarget: 'qtip',
				anchor: '100%'
            },
			defaultType: 'textfield',
			listeners: {
				fieldvaliditychange: function() {
					this.updateErrorState();
				},
				fielderrorchange: function() {
					this.updateErrorState();
				}
			},
			
			updateErrorState: function() {
				var me = this,
					errorCmp, fields, errors;
				
				if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
					errorCmp = me.down('#formErrorStateMASTER_ORDER_BELI');
					fields = me.getForm().getFields();
					errors = [];
					fields.each(function(field) {
						Ext.Array.forEach(field.getErrors(), function(error) {
							errors.push({name: field.getFieldLabel(), error: error});
						});
					});
					errorCmp.setErrors(errors);
					me.hasBeenDirty = true;
				}
			},
            items: [order_id_field,order_no_field,order_supplier_field,order_tanggal_field,order_carabayar_field,order_diskon_field,order_cashback_field,order_totalbiaya_field,order_ttlbiaya_lain2_field,order_dp_field,order_sisa_bayar_field,order_keterangan_field,order_status_acc_field,order_status_field,order_creator_field,order_date_create_field,order_update_field,order_date_update_field,order_revised_field],
			
	        buttons: [statusbar_info, {
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'Save',
                disabled: true,
                action: 'save'
            }, {
                iconCls: 'icon-add',
				itemId: 'create',
                text: 'Create',
                action: 'create'
            }, {
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancel'
            }]
        });
        
        this.callParent();
    }
});
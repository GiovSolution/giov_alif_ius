Ext.define('INVENT.view.MASTER.v_gudang_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_gudang_form',
	
	title		: 'Create/Update gudang',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
    	/*
		 * Deklarasi variable setiap field
		 */
		 
		var gudang_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'gudang_id_field',
			name: 'gudang_id', /* column name of table */
			fieldLabel: 'gudang_id',
			allowBlank: true,
			maxLength: 11 /* length of column name */
		});
		var gudang_nama_field = Ext.create('Ext.form.field.Text', {
			name: 'gudang_nama', /* column name of table */
			fieldLabel: 'gudang_nama',
			allowBlank: true,
			maxLength: 100 /* length of column name */
		});
		var gudang_posisi_field = Ext.create('Ext.form.field.Text', {
			name: 'gudang_posisi', /* column name of table */
			fieldLabel: 'gudang_posisi',
			allowBlank: true,
			maxLength: 100 /* length of column name */
		});
		var gudang_aktif_field = Ext.create('Ext.form.field.Text', {
			name: 'gudang_aktif', /* column name of table */
			fieldLabel: 'gudang_aktif',
			allowBlank: true
		});
		var gudang_creator_field = Ext.create('Ext.form.field.Text', {
			name: 'gudang_creator', /* column name of table */
			fieldLabel: 'gudang_creator',
			allowBlank: true,
			maxLength: 100 /* length of column name */
		});
		var gudang_date_create_field = Ext.create('Ext.ux.form.DateTimeField', {
			name: 'gudang_date_create', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'gudang_date_create',
			allowBlank: true
		});
		var gudang_update_field = Ext.create('Ext.form.field.Text', {
			name: 'gudang_update', /* column name of table */
			fieldLabel: 'gudang_update',
			allowBlank: true,
			maxLength: 100 /* length of column name */
		});
		var gudang_date_update_field = Ext.create('Ext.ux.form.DateTimeField', {
			name: 'gudang_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'gudang_date_update',
			allowBlank: true
		});
		var gudang_revised_field = Ext.create('Ext.form.field.Number', {
			name: 'gudang_revised', /* column name of table */
			fieldLabel: 'gudang_revised',
			allowBlank: true,
			maxLength: 11 /* length of column name */
		});
		
		var statusbar_info = Ext.create('Ext.Component', {
			id: 'formErrorStateDANG',
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
					errorCmp = me.down('#formErrorStateDANG');
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
            items: [gudang_id_field,gudang_nama_field,gudang_posisi_field,gudang_aktif_field,gudang_creator_field,gudang_date_create_field,gudang_update_field,gudang_date_update_field,gudang_revised_field],
			
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
Ext.define('INVENT.view.MASTER.v_produk_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_produk_form',
	
	region:'east',
	id: 'east-region-container',
	
	title		: 'Create/Update produk',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
    	/*
		 * Deklarasi variable setiap field
		 */
		var produk_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'produk_id_field',
			name: 'produk_id', /* column name of table */
			fieldLabel: 'produk_id',
			allowBlank: false /* jika primary_key */,
			maxLength: 11 /* length of column name */
		});
		var produk_kode_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_kode', /* column name of table */
			fieldLabel: 'produk_kode',
			maxLength: 20 /* length of column name */
		});
		var produk_group_field = Ext.create('Ext.form.field.Number', {
			name: 'produk_group', /* column name of table */
			fieldLabel: 'produk_group',
			maxLength: 11 /* length of column name */
		});
		var produk_kategori_field = Ext.create('Ext.form.field.Number', {
			name: 'produk_kategori', /* column name of table */
			fieldLabel: 'produk_kategori',
			maxLength: 11 /* length of column name */
		});
		var produk_nama_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_nama', /* column name of table */
			fieldLabel: 'produk_nama',
			maxLength: 250 /* length of column name */
		});
		var produk_satuan_field = Ext.create('Ext.form.field.Number', {
			name: 'produk_satuan', /* column name of table */
			fieldLabel: 'produk_satuan',
			maxLength: 11 /* length of column name */
		});
		var produk_harga_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_harga', /* column name of table */
			fieldLabel: 'produk_harga'
		});
		var produk_volume_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_volume', /* column name of table */
			fieldLabel: 'produk_volume',
			maxLength: 50 /* length of column name */
		});
		var produk_jenis_field = Ext.create('Ext.form.field.Number', {
			name: 'produk_jenis', /* column name of table */
			fieldLabel: 'produk_jenis',
			maxLength: 11 /* length of column name */
		});
		var produk_keterangan_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_keterangan', /* column name of table */
			fieldLabel: 'produk_keterangan',
			maxLength: 500 /* length of column name */
		});
		var produk_bpom_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_bpom', /* column name of table */
			fieldLabel: 'produk_bpom',
			maxLength: 5 /* length of column name */
		});
		var produk_aktif_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_aktif', /* column name of table */
			fieldLabel: 'produk_aktif'
		});
		var produk_saldo_awal_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_saldo_awal', /* column name of table */
			fieldLabel: 'produk_saldo_awal'
		});
		var produk_nilai_saldo_awal_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_nilai_saldo_awal', /* column name of table */
			fieldLabel: 'produk_nilai_saldo_awal'
		});
		var produk_tgl_nilai_saldo_awal_field = Ext.create('Ext.form.field.Date', {
			name: 'produk_tgl_nilai_saldo_awal', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'produk_tgl_nilai_saldo_awal'
		});
		var produk_creator_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_creator', /* column name of table */
			fieldLabel: 'produk_creator',
			maxLength: 50 /* length of column name */
		});
		var produk_date_create_field = Ext.create('Ext.form.field.Date', {
			name: 'produk_date_create', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'produk_date_create'
		});
		var produk_update_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_update', /* column name of table */
			fieldLabel: 'produk_update',
			maxLength: 50 /* length of column name */
		});
		var produk_aktif_cabang_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_aktif_cabang', /* column name of table */
			fieldLabel: 'produk_aktif_cabang',
			maxLength: 30 /* length of column name */
		});
		var produk_date_update_field = Ext.create('Ext.form.field.Date', {
			name: 'produk_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'produk_date_update'
		});
		var produk_revised_field = Ext.create('Ext.form.field.Number', {
			name: 'produk_revised', /* column name of table */
			fieldLabel: 'produk_revised',
			maxLength: 11 /* length of column name */
		});
		
		var statusbar_info = Ext.create('Ext.Component', {
			id: 'formErrorStatePRODUK',
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
					errorCmp = me.down('#formErrorStatePRODUK');
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
            items: [produk_id_field,produk_kode_field,produk_group_field,produk_kategori_field,produk_nama_field,produk_satuan_field,produk_harga_field,produk_volume_field,produk_jenis_field,produk_keterangan_field,produk_bpom_field,produk_aktif_field,produk_saldo_awal_field,produk_nilai_saldo_awal_field,produk_tgl_nilai_saldo_awal_field,produk_creator_field,produk_date_create_field,produk_update_field,produk_aktif_cabang_field,produk_date_update_field,produk_revised_field],
			
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
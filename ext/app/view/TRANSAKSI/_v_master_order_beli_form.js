Ext.define('INVENT.view.TRANSAKSI.v_master_order_beli_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_master_order_beli_form',
	
	region:'east',
	id: 'east-region-container',
	
	title		: 'Create/Update master_order_beli',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
		var me = this;
		
		/* STORE start */
		var bayar_store = Ext.create('Ext.data.Store', {
    	    fields: ['value', 'display'],
    	    data : [
    	        {"value":"Tunai", "display":"Tunai"},
    	        {"value":"Kredit", "display":"Kredit"},
    	        {"value":"Konsinyasi", "display":"Konsinyasi"}
    	    ]
    	});
		/* STORE end */
		
    	/*
		 * Deklarasi variable setiap field
		 */
		var order_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'order_id_field',
			name: 'order_id', /* column name of table */
			fieldLabel: 'order_id',
			allowBlank: false /* jika primary_key */,
			maxLength: 11, /* length of column name */
			value: 0,
			hidden: true
		});
		var order_no_field = Ext.create('Ext.form.field.Text', {
			itemId: 'order_no_field',
			name: 'order_no', /* column name of table */
			fieldLabel: 'No. OP',
			maxLength: 50, /* length of column name */
			listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						order_tanggal_field.focus(false, true);
					}
				}
			}
		});
		var order_supplier_field = Ext.create('Ext.form.field.ComboBox', {
			itemId: 'order_supplier_field',
			name: 'order_supplier', /* column name of table */
			fieldLabel: 'Supplier <font color=red>*</font>',
			allowBlank: false,
			store: 'INVENT.store.s_supplier',
			queryMode: 'remote',
			displayField:'supplier_nama',
			valueField: 'supplier_id',
	        typeAhead: false,
	        loadingText: 'Searching...',
			//pageSize:15,
	        hideTrigger: false,
	        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">[<b>{supplier_id}</b>] - {supplier_nama}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                	'[{supplier_id}] - {supplier_nama}',
                '</tpl>'
            ),
	        itemSelector: 'div.search-item',
			triggerAction: 'all',
			lazyRender:true,
			listClass: 'x-combo-list-small',
			anchor:'100%',
			forceSelection:true,
			listeners: {
				beforequery: function(queryEvent, e){
					queryEvent.combo.getStore().clearFilter(); //atau queryEvent.combo.getStore().clearFilter();
				},
				select: function(combo, records, e){
					order_carabayar_field.focus(false, 10);
					
					if ( combo.findRecordByValue(combo.getValue()) && (combo.getRawValue() != '') ) {
						me.down(detail_tabs).down(detail_order_beli_grid).down('#btncreate').setDisabled(false);
					}
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						if (field.findRecordByValue(field.getValue())) {
							order_carabayar_field.focus(false, true);
						}else{
							me.updateErrorState();
						}
					}
					
				}
			}
		});
		var order_tanggal_field = Ext.create('Ext.form.field.Date', {
			itemId: 'order_tanggal_field',
			name: 'order_tanggal', /* column name of table */
			format: 'l, j F Y',
			submitFormat: 'Y-m-d H:i:s',
			fieldLabel: 'Tanggal',
			listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						order_supplier_field.focus(false, true);
					}
				}
			}
		});
		var order_carabayar_field = Ext.create('Ext.form.field.ComboBox', {
			name: 'order_carabayar', /* column name of table */
			fieldLabel: 'Cara Bayar',
			store: bayar_store,
			queryMode: 'local',
			displayField: 'display',
			valueField: 'value',
			listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						order_keterangan_field.focus(false, true);
					}
				}
			}
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
		var order_totalbiaya_cffield = Ext.create('Ext.ux.form.NumericField', {
			itemId: 'order_totalbiaya_cffield',
			name: 'order_totalbiaya', /* column name of table */
			fieldLabel: 'TOTAL',
			useThousandSeparator: true,
			decimalPrecision: 2,
			alwaysDisplayDecimals: true,
			currencySymbol: 'Rp',
			thousandSeparator: '.',
			decimalSeparator: ',',
			enableKeyEvents: true,
			readOnly: true,
			fieldStyle: 'font-size: 12pt;font-weight: bold;text-align:right;',
			labelStyle: 'font-size: 12pt;font-weight: bold;'
		});
		var order_ttlbiaya_lain2_field = Ext.create('Ext.form.field.Text', {
			name: 'order_ttlbiaya_lain2', /* column name of table */
			fieldLabel: 'order_ttlbiaya_lain2'
		});
		var order_dp_cffield = Ext.create('Ext.ux.form.NumericField', {
			itemId: 'order_dp_field',
			name: 'order_dp',
			fieldLabel: 'Uang Muka',
			useThousandSeparator: true,
			decimalPrecision: 2,
			alwaysDisplayDecimals: true,
			currencySymbol: 'Rp',
			thousandSeparator: '.',
			decimalSeparator: ',',
			enableKeyEvents: true,
			readOnly: false,
			fieldStyle: 'font-size: 10pt;font-weight: bold;text-align:right;',
			labelStyle: 'font-size: 10pt;font-weight: bold;'
		});
		var order_sisa_bayar_field = Ext.create('Ext.ux.form.NumericField', {
			itemId: 'order_sisa_bayar_field',
			name: 'order_sisa_bayar', /* column name of table */
			fieldLabel: 'Jumlah Hutang',
			useThousandSeparator: true,
			decimalPrecision: 2,
			alwaysDisplayDecimals: true,
			currencySymbol: 'Rp',
			thousandSeparator: '.',
			decimalSeparator: ',',
			enableKeyEvents: true,
			readOnly: true,
			fieldStyle: 'font-size: 10pt;font-weight: bold;text-align:right;',
			labelStyle: 'font-size: 10pt;font-weight: bold;'
		});
		var order_keterangan_field = Ext.create('Ext.form.field.TextArea', {
			name: 'order_keterangan', /* column name of table */
			fieldLabel: 'Keterangan',
			maxLength: 500 /* length of column name */
		});
		var order_status_acc_field = Ext.create('Ext.form.RadioGroup', {
			itemId: 'order_status_acc_field',
			flex: 1,
			layout: {
				autoFlex: false
			},
			defaults: {
				name: 'order_status_acc',
				margin: '0 15 0 0'
			},
			items: [{
				inputValue: 'Terbuka',
				boxLabel: 'Terbuka',
				checked: true
			}, {
				inputValue: 'Tertutup',
				boxLabel: 'Tertutup'
			}]
		});
		var order_status_field = Ext.create('Ext.form.RadioGroup', {
			itemId: 'order_status_field',
			flex: 1,
			layout: {
				autoFlex: false
			},
			defaults: {
				name: 'order_status',
				margin: '0 15 0 0'
			},
			items: [{
				inputValue: 'Terbuka',
				boxLabel: 'Terbuka',
				checked: true
			}, {
				inputValue: 'Tertutup',
				boxLabel: 'Tertutup'
			}, {
				inputValue: 'Batal',
				boxLabel: 'Batal'
			}]
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
		
		/* GRID detail start */
		var detail_order_beli_grid = Ext.create('INVENT.view.TRANSAKSI.v_detail_order_beli');
		/* GRID detail end */
		
		var detail_tabs = Ext.create('Ext.tab.Panel', {
			plain: true,
			activeTab: 0,
			defaults :{
				bodyPadding: 0
			},
			items: [{
				itemId: 'beli_detail_order_beli',
				title: 'Detail Pembelian',
				items: [detail_order_beli_grid],
				listeners: {
					deactivate: function(thisme, e){
						thisme.items.items[0].rowEditing.cancelEdit();
					}
				}
			}]
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
            items: [{
				xtype: 'form',
				bodyStyle: 'border-width: 0px;',
				layout: 'column',
				items: [{
					//left column
					xtype: 'form',
					bodyStyle: 'border-width: 0px;',
					columnWidth:0.49,
					items: [
						order_id_field,order_no_field,order_tanggal_field,order_supplier_field
						,order_carabayar_field,order_keterangan_field
					]
				} ,{
					xtype: 'splitter',
					columnWidth:0.02
				} ,{
					//right column
					xtype: 'form',
					bodyStyle: 'border-width: 0px;',
					columnWidth:0.49,
					items: [
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Status Acc?',
							layout: 'hbox',
							defaultType: 'textfield',
							defaults: {
								hideLabel: true
							},
							items: [order_status_acc_field]
						},{
							xtype: 'fieldcontainer',
							fieldLabel: 'Status?',
							layout: 'hbox',
							defaultType: 'textfield',
							defaults: {
								hideLabel: true
							},
							items: [order_status_field]
						},order_totalbiaya_cffield,order_dp_cffield,order_sisa_bayar_field
					]
				}]
			}, detail_tabs],
			
	        buttons: [statusbar_info, {
                iconCls: 'icon-print',
                itemId: 'printall',
                text: 'Print Only',
                disabled: true,
                action: 'printall'
            }, {
                iconCls: 'icon-save',
                itemId: 'saveprintall',
                text: 'Update and Print',
                disabled: true,
                action: 'saveprintall'
            }, {
                iconCls: 'icon-add',
                itemId: 'createprintall',
                text: 'Create and Print',
                disabled: true,
                action: 'createprintall'
            }, {
				xtype: 'splitter'
			}, '-', {
				xtype: 'splitter'
			}, {
                iconCls: 'icon-save',
                itemId: 'saveall',
                text: 'Update',
                disabled: true,
                action: 'saveall'
            }, {
                iconCls: 'icon-add',
				itemId: 'createall',
                text: 'Create',
                action: 'createall'
            }, {
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancelall'
            }]
        });
        
        this.callParent();
    }
});
Ext.define('INVENT.view.MASTER.v_supplier_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_supplier_form',
	
	region:'east',
	id: 'east-region-container',
	
	title		: 'Create/Update supplier',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
    	/*
		 * Deklarasi variable setiap field
		 */
		 
		var supplier_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'supplier_id_field',
			name: 'supplier_id', /* column name of table */
			fieldLabel: 'supplier_id',
			allowBlank: true, /* jika primary_key */
			maxLength: 11, /* length of column name */
			value: 0,
			hidden: true
		});
		var supplier_cabang_field = Ext.create('Ext.form.field.Number', {
			name: 'supplier_cabang', /* column name of table */
			fieldLabel: 'supplier_cabang',
			maxLength: 11 /* length of column name */
		});
		var supplier_cabang_field = Ext.create('Ext.form.field.ComboBox', {
			name: 'supplier_cabang', /* column name of table */
			fieldLabel: 'Cabang',
			allowBlank: true,
			store: 's_cabang',
			queryMode: 'remote',
			displayField:'cabang_nama',
			valueField: 'cabang_id',
	        typeAhead: false,
	        loadingText: 'Searching...',
			//pageSize:15,
	        hideTrigger: false,
	        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">[<b>{cabang_id}</b>] - {cabang_nama}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                	'[{cabang_id}] - {cabang_nama}',
                '</tpl>'
            ),
	        itemSelector: 'div.search-item',
			triggerAction: 'query',
			lazyRender:true,
			listClass: 'x-combo-list-small',
			anchor:'100%',
			forceSelection:true,
			listeners: {
				beforequery: function(queryEvent, e){
					this.getStore().clearFilter();
				},
				select: function(combo, records, e){
					supplier_nama_field.focus(false, true);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						var task = new Ext.util.DelayedTask(function(){
							//console.log(field.getValue());
							if (! field.findRecordByValue(field.getValue())) {
								Ext.Msg.show({
									title:'Error',
									msg: 'Isi field Cabang salah, karena tidak melalui pilihan.',
									buttons: Ext.MessageBox.OK,
									fn: function(btn){
										if (btn == 'ok') {
											supplier_cabang_field.reset();
											supplier_cabang_field.focus(false, true);
										}
									},
									icon: Ext.MessageBox.ERROR
								});
								
							}else{
								supplier_nama_field.focus(false, true);
							}
						});
						task.delay(5);
					}
				},
				blur: function(field, e){
					if (! field.findRecordByValue(field.getValue()) && (field.getRawValue() != '')) {
						supplier_cabang_field.reset();
						supplier_cabang_field.focus(false, true);
					}
				}
			}
		});
		var supplier_nama_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_nama', /* column name of table */
			fieldLabel: 'supplier_nama',
			maxLength: 250 /* length of column name */
		});
		var supplier_alamat_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_alamat', /* column name of table */
			fieldLabel: 'supplier_alamat',
			maxLength: 250 /* length of column name */
		});
		var supplier_kota_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_kota', /* column name of table */
			fieldLabel: 'supplier_kota',
			maxLength: 250 /* length of column name */
		});
		var supplier_kodepos_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_kodepos', /* column name of table */
			fieldLabel: 'supplier_kodepos',
			maxLength: 5 /* length of column name */
		});
		var supplier_propinsi_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_propinsi', /* column name of table */
			fieldLabel: 'supplier_propinsi',
			maxLength: 250 /* length of column name */
		});
		var supplier_negara_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_negara', /* column name of table */
			fieldLabel: 'supplier_negara',
			maxLength: 250 /* length of column name */
		});
		var supplier_notelp_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_notelp', /* column name of table */
			fieldLabel: 'supplier_notelp',
			maxLength: 25 /* length of column name */
		});
		var supplier_notelp2_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_notelp2', /* column name of table */
			fieldLabel: 'supplier_notelp2',
			maxLength: 25 /* length of column name */
		});
		var supplier_nofax_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_nofax', /* column name of table */
			fieldLabel: 'supplier_nofax',
			maxLength: 25 /* length of column name */
		});
		var supplier_email_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_email', /* column name of table */
			fieldLabel: 'supplier_email',
			maxLength: 100 /* length of column name */
		});
		var supplier_website_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_website', /* column name of table */
			fieldLabel: 'supplier_website',
			maxLength: 100 /* length of column name */
		});
		var supplier_cp_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_cp', /* column name of table */
			fieldLabel: 'supplier_cp',
			maxLength: 250 /* length of column name */
		});
		var supplier_contact_cp_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_contact_cp', /* column name of table */
			fieldLabel: 'supplier_contact_cp',
			maxLength: 25 /* length of column name */
		});
		var supplier_akun_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_akun', /* column name of table */
			fieldLabel: 'supplier_akun',
			maxLength: 11 /* length of column name */
		});
		var supplier_keterangan_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_keterangan', /* column name of table */
			fieldLabel: 'supplier_keterangan',
			maxLength: 500 /* length of column name */
		});
		var supplier_aktif_field = Ext.create('Ext.form.RadioGroup', {
			flex: 1,
			layout: {
				autoFlex: false
			},
			defaults: {
				name: 'supplier_aktif',
				margin: '0 15 0 0'
			},
			items: [{
				inputValue: 'Aktif',
				boxLabel: 'Ya',
				checked: true
			}, {
				inputValue: 'Tidak Aktif',
				boxLabel: 'Tidak'
			}]
		});
		var supplier_creator_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_creator', /* column name of table */
			fieldLabel: 'supplier_creator',
			maxLength: 50 /* length of column name */
		});
		var supplier_date_create_field = Ext.create('Ext.form.field.Date', {
			name: 'supplier_date_create', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'supplier_date_create'
		});
		var supplier_update_field = Ext.create('Ext.form.field.Text', {
			name: 'supplier_update', /* column name of table */
			fieldLabel: 'supplier_update',
			maxLength: 50 /* length of column name */
		});
		var supplier_date_update_field = Ext.create('Ext.form.field.Date', {
			name: 'supplier_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'supplier_date_update'
		});
		var supplier_revised_field = Ext.create('Ext.form.field.Number', {
			name: 'supplier_revised', /* column name of table */
			fieldLabel: 'supplier_revised',
			maxLength: 11 /* length of column name */
		});		
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 120,
                msgTarget: 'qtip',
				anchor: '100%'
            },
			defaultType: 'textfield',
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
						supplier_id_field,supplier_cabang_field,supplier_nama_field
						,supplier_alamat_field,supplier_kota_field,supplier_kodepos_field
						,supplier_propinsi_field,supplier_negara_field,supplier_notelp_field
						,supplier_notelp2_field
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
						supplier_nofax_field,supplier_email_field
						,supplier_website_field,supplier_cp_field,supplier_contact_cp_field
						,supplier_akun_field,supplier_keterangan_field
						,{
							xtype: 'fieldcontainer',
							fieldLabel: 'Aktif?',
							layout: 'hbox',
							defaultType: 'textfield',
							defaults: {
								hideLabel: true
							},
							items: [supplier_aktif_field]
						}
					]
				}]
			}],
			
	        buttons: [{
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
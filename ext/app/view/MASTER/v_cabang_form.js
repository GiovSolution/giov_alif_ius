Ext.define('YMPI.view.MASTER.v_cabang_form', {
	extend	: 'Ext.form.Panel',
	
	alias	: 'widget.v_cabang_form',
	
	region:'east',
	id: 'east-region-container',
	
	title		: 'Create/Update cabang',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
    	/*
		 * Deklarasi variable setiap field
		 */
		 
		var cabang_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'cabang_id_field',
			name: 'cabang_id', /* column name of table */
			fieldLabel: 'cabang_id',
			allowBlank: false /* jika primary_key */,
			maxLength: 11 /* length of column name */});
		var cabang_nama_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_nama', /* column name of table */
			fieldLabel: 'cabang_nama',
			maxLength: 250 /* length of column name */
		});
		var cabang_alamat_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_alamat', /* column name of table */
			fieldLabel: 'cabang_alamat',
			maxLength: 250 /* length of column name */
		});
		var cabang_kota_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_kota', /* column name of table */
			fieldLabel: 'cabang_kota',
			maxLength: 250 /* length of column name */
		});
		var cabang_kodepos_field = Ext.create('Ext.form.field.Text', {
			name: 'cabang_kodepos', /* column name of table */
			fieldLabel: 'cabang_kodepos',
			maxLength: 5 /* length of column name */
		});
		var cabang_propinsi_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_propinsi', /* column name of table */
			fieldLabel: 'cabang_propinsi',
			maxLength: 250 /* length of column name */
		});
		var cabang_keterangan_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_keterangan', /* column name of table */
			fieldLabel: 'cabang_keterangan',
			maxLength: 250 /* length of column name */
		});
		var cabang_aktif_field = Ext.create('Ext.form.field.Text', {
			name: 'cabang_aktif', /* column name of table */
			fieldLabel: 'cabang_aktif'
		});
		var cabang_creator_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_creator', /* column name of table */
			fieldLabel: 'cabang_creator',
			maxLength: 250 /* length of column name */
		});
		var cabang_date_create_field = Ext.create('Ext.form.field.Date', {
			name: 'cabang_date_create', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'cabang_date_create'
		});
		var cabang_update_field = Ext.create('Ext.form.field.TextArea', {
			name: 'cabang_update', /* column name of table */
			fieldLabel: 'cabang_update',
			maxLength: 50 /* length of column name */
		});
		var cabang_date_update_field = Ext.create('Ext.form.field.Date', {
			name: 'cabang_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'cabang_date_update'
		});
		var cabang_revised_field = Ext.create('Ext.form.field.Number', {
			name: 'cabang_revised', /* column name of table */
			fieldLabel: 'cabang_revised',
			maxLength: 11 /* length of column name */
		});
		var cabang_value_field = Ext.create('Ext.form.field.Number', {
			name: 'cabang_value', /* column name of table */
			fieldLabel: 'cabang_value',
			maxLength: 11 /* length of column name */
		});
		var cabang_kode_field = Ext.create('Ext.form.field.Text', {
			name: 'cabang_kode', /* column name of table */
			fieldLabel: 'cabang_kode',
			maxLength: 10 /* length of column name */
		});
		var cabang_kode_akun_field = Ext.create('Ext.form.field.Text', {
			name: 'cabang_kode_akun', /* column name of table */
			fieldLabel: 'cabang_kode_akun',
			maxLength: 11 /* length of column name */
		});
		var cabang_pajak_field = Ext.create('Ext.form.field.Text', {
			name: 'cabang_pajak', /* column name of table */
			fieldLabel: 'cabang_pajak',
			maxLength: 5 /* length of column name */
		});		
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 120,
                msgTarget: 'qtip',
				anchor: '100%'
            },
			defaultType: 'textfield',
            items: [cabang_id_field,cabang_nama_field,cabang_alamat_field,cabang_kota_field,cabang_kodepos_field,cabang_propinsi_field,cabang_keterangan_field,cabang_aktif_field,cabang_creator_field,cabang_date_create_field,cabang_update_field,cabang_date_update_field,cabang_revised_field,cabang_value_field,cabang_kode_field,cabang_kode_akun_field,cabang_pajak_field],
			
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
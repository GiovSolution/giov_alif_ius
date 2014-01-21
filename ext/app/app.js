
//@require @packageOverrides

Ext.Loader.setPath('Ext.ux', './assets/ext-4.2/src/ux');
Ext.Loader.setPath('Ext.util', './assets/ext-4.2/src/util');

Ext.application({

    name: 'YMPI',
    
    appFolder: 'ext/app',

    requires: [
		'Ext.ProgressBar',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'Ext.ModelManager',
        'Ext.form.*',
        //'Ext.grid.plugin.RowEditing',
        //'Ext.grid.plugin.Editing',
        //'Ext.grid.RowEditor',
        'Ext.window.MessageBox',
        'Ext.layout.component.field.*',
		'Ext.ux.grid.GridHeaderFilters',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.grid.plugin.BufferedRenderer',
        //'Ext.ux.CheckColumn',
        'Ext.ux.RowExpander',
        'Ext.XTemplate',
        'Ext.ux.form.NumericField',
		'Ext.ux.grid.FiltersFeature',
		'Ext.toolbar.Paging',
		'Ext.override.ComboBox',
        'YMPI.store.Examples',
        'YMPI.view.Viewport',
        'YMPI.view.Header',
        'YMPI.view.Navigation',
        'YMPI.view.ContentPanel',
		'Ext.ux.egen.Printer'
    ],

    controllers: [
        'Main'
		,'SUPPLIER' ,'MASTER_ORDER_BELI'
    ],

    autoCreateViewport: true,

    init: function() {
        Ext.setGlyphFontFamily('Pictos');
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        
        if (Ext.util.Format) {
			Ext.apply(Ext.util.Format, {
				thousandSeparator : ".",
				decimalSeparator  : ","
			});
		}
    }
});

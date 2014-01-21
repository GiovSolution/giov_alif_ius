Ext.define('YMPILogin.view.Login', {
    extend: 'Ext.Container',
    requires: [
		'Ext.form.Panel',
		'Ext.form.field.Checkbox',
		'Ext.form.field.Text'
    ],
    
    alias	: 'widget.Login',
    
    defaults: {
        width: 400,
        height: 295
    },

    items: [
        {
            xtype: 'form',
            
            //title: 'Login',
			title: 'Login',
            frame:true,
            bodyPadding: 13,
            height: null,
            
            defaultType: 'textfield',
            defaults: { anchor: '100%' },
            
            items: [
                {
					itemId: 'userid',
					allowBlank:false,
					fieldLabel: 'User ID',
					name: 'user',
					emptyText: 'user id',
					listeners: {
						specialkey: function(field, e){
							if (e.getKey() == e.ENTER) {
								field.up('form').down('#password').focus(false, true);
							}
						}
					}
				}, {
					itemId: 'password',
					allowBlank:false,
					fieldLabel: 'Password',
					name: 'pass',
					emptyText: 'password',
					inputType: 'password',
					listeners: {
						specialkey: function(field, e){
							if (e.getKey() == e.ENTER) {
								var form = this.up('form').getForm();
								var redirect = '';
								if(form.isValid()){						
									form.submit({
										url: 'c_action/upload',
										success: function(form, action) {
											/*var msg = Ext.decode(action.response.responseText);
											Ext.Msg.show({
												title: 'Login Success',
												msg: msg.msg,
												minWidth: 200,
												modal: true,
												icon: Ext.Msg.INFO,
												buttons: Ext.Msg.OK,
												fn:function(){
													redirect = 'home';
													window.location = redirect;
												}
											});*/
											//console.info(action);
											redirect = 'home';
											window.location = redirect;
										},
										failure: function(form, action) {
											var msg = Ext.decode(action.response.responseText);
											var redirect = '';
											Ext.Msg.show({
												title: 'Login Failed',
												msg: msg.msg,
												minWidth: 200,
												modal: true,
												icon: Ext.Msg.INFO,
												buttons: Ext.Msg.OK,
												fn: function(){
													Ext.Ajax.request({
														url: base_url+'c_action/logout',
														success: function(response){
															redirect = 'c_main';
															window.location = redirect;
														}
													});
												}
											});								
											//console.info(action);
										}
									});
								}
							}
						}
					}
				}
            ],
			
			buttons: [
			{
				text: 'Login',
				handler: function() {
					var form = this.up('form').getForm();
					var redirect = '';
					if(form.isValid()){						
						form.submit({
							url: 'c_action/upload',
							//waitMsg: 'Login Authentication...',
							success: function(form, action) {
								/*var msg = Ext.decode(action.response.responseText);
								Ext.Msg.show({
									title: 'Login Success',
									msg: msg.msg,
									minWidth: 200,
									modal: true,
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn:function(){
										redirect = 'home';
										window.location = redirect;
									}
								});*/
								//console.info(action);
								redirect = 'home';
								window.location = redirect;
							},
							failure: function(form, action) {
								var msg = Ext.decode(action.response.responseText);
								Ext.Msg.show({
									title: 'Login Failed',
									msg: msg.msg,
									minWidth: 200,
									modal: true,
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK
								});								
								//console.info(action);
							}
						});
					}
				}
			},
			{
				text: 'Reset',
				handler: function() {
					this.up('form').getForm().reset();
				}
			}],
			
			listeners: {
				afterrender: function(){
					this.down('#userid').focus(false, true);
				}
			}
        }
    ]
});
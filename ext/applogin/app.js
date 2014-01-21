Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        MyApp : 'ext/applogin'
    } 
});
Ext.application({
    name: 'YMPILogin',
    
    appFolder: 'ext/applogin',

    autoCreateViewport: true,

    controllers: [
        'Main'
    ],
    
    launch: function(){
        console.log("This example is currently only supported in WebKit browsers");
    }
});

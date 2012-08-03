requirejs.config({
    paths: {
        mootools: 'https://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed'
    }
});

require([
    'mootools'
], function() {
    console.log('Hello, World!');
});
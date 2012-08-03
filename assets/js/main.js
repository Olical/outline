requirejs.config({
    paths: {
        'mootools-core': 'https://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed'
    }
});

require([
    'Class',
    'mootools-core'
], function(Class) {

});
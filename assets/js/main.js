requirejs.config({
    paths: {
        'mootools-core': 'https://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed'
    }
});

require([
    'mootools-core'
], function() {
    /**
     * Entry point for the application
     * Executed when the DOM is ready
     */
    function main() {
        
    }

    // Add a listener for the DOM ready event
    document.addEvent('domready', main);
});
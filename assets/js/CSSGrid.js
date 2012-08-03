define([
    'Class',
    'mootools-core'
], function(Class) {
    // Initialise the class
    // Implements MooTools' Options class
    var CSSGrid = new Class(Options);

    /**
     * If passed an options object this constructor will call setOptions automatically
     * 
     * @param {Object} options Optional configuration object of three values: width, columns and margin
     */
    CSSGrid.fn.construct = function(options) {
        // Set the default options
        this.setOptions({
            width: 960,
            columns: 16,
            margin: 32
        });

        // If any options were passed then call set options
        if(options) {
            this.setOptions(options);
        }
    };

    /**
     * Renders the CSS grid using the current options
     * 
     * @returns {String} Your finished CSS grid
     */
    CSSGrid.fn.render = function() {
        
    };

    // Return the finished class
    return CSSGrid;
});
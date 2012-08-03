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
        // Find the elements
        var elements = {
            form: $('form'),
            width: $('width'),
            columns: $('columns'),
            margin: $('margin'),
            output: $('output')
        };

        // Listen for when the form is submitted
        elements.form.addEvent('submit', function() {
            // Extract the data
            var config = {
                width: elements.width.get('value').toInt(),
                columns: elements.columns.get('value').toInt(),
                margin: elements.margin.get('value').toInt()
            };

            // Validate all of the values
            if(!isNaN(config.width) && !isNaN(config.columns) && !isNaN(config.margin)) {
                // We have three valid values
                // Set up a grid renderer
            }
            else {
                alert('Please specify a number in each input.');
            }

            // Stop the form actually submitting
            return false;
        });
    }

    // Add a listener for the DOM ready event
    document.addEvent('domready', main);
});
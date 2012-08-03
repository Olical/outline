requirejs.config({
    paths: {
        'mootools-core': 'https://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed',
        'text': 'text/text',
        'mustache': 'mustache/mustache'
    }
});

require([
    'CSSGrid',
    'text!/assets/templates/grid.mustache',
    'mootools-core',
    'prism'
], function(CSSGrid, gridTemplate) {
    /**
     * Entry point for the application
     * Executed when the DOM is ready
     */
    function main() {
        // Find the elements and initialise variables
        var elements = {
                form: $('form'),
                width: $('width'),
                columns: $('columns'),
                margin: $('margin'),
                output: $('output'),
                generate: $('generate')
            },
            grid = new CSSGrid(),
            config = {};

        // Listen for when the form is submitted
        elements.form.addEvent('submit', function() {
            // Extract the data
            config.width = elements.width.get('value').toInt();
            config.columns = elements.columns.get('value').toInt();
            config.margin = elements.margin.get('value').toInt();

            // Validate all of the values
            if(!isNaN(config.width) && !isNaN(config.columns) && !isNaN(config.margin)) {
                // We have three valid values
                // Set up a grid renderer
                grid.setOptions(config);

                // Render the CSS into the output
                elements.output.set('text', grid.render(gridTemplate));

                // Highlight the code
                Prism.highlightElement(elements.output);
            }
            else {
                alert('Please specify a number in each input.');
            }

            // Stop the form actually submitting
            return false;
        });

        // Now everything has loaded the form can be enabled
        elements.generate.erase('disabled');
    }

    // Add a listener for the DOM ready event
    document.addEvent('domready', main);
});
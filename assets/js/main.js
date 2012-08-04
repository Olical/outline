requirejs.config({
    paths: {
        'mootools-core': 'https://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed',
        'text': 'text/text',
        'dust': 'dust/dist/dust-full-0.3.0'
    }
});

require([
    'CSSGrid',
    'text!/assets/templates/grid.dust',
    'mootools-core',
    'prism',
    'dust'
], function(CSSGrid, templateSource) {
    // Disable whitespace compression in dust
    dust.optimizers.format = function(ctx, node) {
        return node;
    };

    // Initialise variables
    var grid = new CSSGrid(),
        template = dust.compileFn(templateSource),
        config = {},
        elements,
        download,
        hash,
        loc;

    /**
     * Entry point for the application
     * Executed when the DOM is ready
     */
    function main() {
        // Find the elements
        elements = {
            form: $('form'),
            width: $('width'),
            columns: $('columns'),
            margin: $('margin'),
            output: $('output'),
            generate: $('generate'),
            download: $('download'),
            placeholder: $('placeholder'),
            share: $('share')
        };

        // Listen for when the form is submitted
        elements.form.addEvent('submit', function(e) {
            // Stop the form actually submitting
            if(e) {
                e.stop();
            }

            // Extract the data
            config.width = elements.width.get('value').toInt();
            config.columns = elements.columns.get('value').toInt();
            config.margin = elements.margin.get('value').toInt();

            // Validate all of the values
            if(!isNaN(config.width) && !isNaN(config.columns) && !isNaN(config.margin)) {
                // We have three valid values
                // Set up a grid renderer
                grid.setOptions(config);

                // Render the CSS
                grid.render(template, function(err, css) {
                    // Log any errors
                    if(err) {
                        throw err;
                    }

                    // Hide the placeholder text
                    elements.placeholder.addClass('hidden');

                    // Display the output and highlight it
                    elements.output.set('text', css);
                    Prism.highlightElement(elements.output);

                    // Prepare the download and show the link
                    elements.download.set('href', 'data:text/css;charset=utf-8;base64,' + btoa(css));
                    elements.download.removeClass('hidden');

                    // Set the hash
                    window.location.hash = config.width + ',' + config.columns + ',' + config.margin;

                    // And set the share URL
                    loc = document.location;
                    elements.share.set('href', loc).set('text', loc);
                });
            }
            else {
                alert('Please specify a number in each input.');
            }
        });

        // Now everything has loaded the form can be enabled
        elements.generate.erase('disabled');

        // Fetch the data in the hash
        hash = window.location.hash.substr(1).split(',');

        // If there are three values then there was data there, use it
        // We use it by populating the form and submitting it
        if(hash.length === 3) {
            elements.width.set('value', hash[0]);
            elements.columns.set('value', hash[1]);
            elements.margin.set('value', hash[2]);
            elements.form.fireEvent('submit');
        }
    }

    // Add a listener for the DOM ready event
    document.addEvent('domready', main);
});
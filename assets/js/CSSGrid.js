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
     * @param {Object} options Optional configuration object of four values: width, columns, margin and gridFill (for the overlay image)
     */
    CSSGrid.fn.construct = function(options) {
        // Set the default options
        this.setOptions({
            width: 960,
            columns: 16,
            margin: 32,
            gridFill: 'rgba(239, 95, 95, 0.4)'
        });

        // If any options were passed then call set options
        if(options) {
            this.setOptions(options);
        }
    };

    /**
     * Renders the CSS grid using the current options
     * You must pass it a template string to render with
     * 
     * @param {String} template The dust template to render with
     * @param {Function} callback The callback to run when rendering has finished
     */
    CSSGrid.fn.render = function(template, callback) {
        // Initialise the variables
        var opts = this.options,
            columnWidth = this.getColumnWidth(),
            fullColumnWidth = columnWidth + opts.margin,
            context = {
                width: opts.width + 'px',
                columns: opts.columns,
                margin: opts.margin + 'px',
                spans: [],
                prefixes: [],
                suffixes: [],
                overlay: this.renderImage(columnWidth, opts.margin),
                url: document.location
            },
            i;

        // Loop over all of the columns
        for(i = 1; i <= opts.columns; i += 1) {
            // Generate spans
            context.spans.push({
                cssClass: '.span-' + i,
                width: columnWidth + fullColumnWidth * (i - 1) + 'px',
                separator: i < opts.columns ? ',\n' : ''
            });

            // Generate prefixes and suffixes
            // This one has to be less than the column count
            if(i < opts.columns) {
                var padding = fullColumnWidth * i + 'px';

                context.prefixes.push({
                    cssClass: '.prefix-' + i,
                    padding: padding
                });

                context.suffixes.push({
                    cssClass: '.suffix-' + i,
                    padding: padding
                });
            }
        }

        // Set the last span
        context.lastSpan = context.spans[opts.columns - 1];

        // Execute the renderer
        template(context, callback);
    };

    /**
     * Calculates the column width
     *
     * @returns {Number} The current column width
     */
    CSSGrid.fn.getColumnWidth = function() {
        var opts = this.options,
            usableWidth = opts.width - (opts.margin * (opts.columns - 1));

        return usableWidth / opts.columns;
    };

    /**
     * Renders a base64 image of the grid
     * It can be used as a repeating background
     *
     * @param {Number} width The width of each column
     * @param {Number} margin The width of the right margin
     * @returns {String} Base64 encoded image to be used as a grid overlay
     */
    CSSGrid.fn.renderImage = function(width, margin) {
        // Initialise variables
        var canvas = new Element('canvas', {
                height: 1,
                width: width + margin
            }),
            ctx = canvas.getContext('2d');

        // Draw the column
        ctx.fillStyle = this.options.gridFill;
        ctx.fillRect(0, 0, width, 1);

        // Return the render of the canvas
        return canvas.toDataURL();
    };

    // Return the finished class
    return CSSGrid;
});
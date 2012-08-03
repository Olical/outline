define(function() {
    function Class() {
        // Setup the new class and any required variables
        var cl = function() {
                // Call the construct method if there is one
                if(typeof this.construct === 'function') {
                    this.construct.apply(this, arguments);
                }
            },

            // Create the list of prototype from the passed classes
            protos = Array.map(arguments, function(parent) {
                return Object.clone(parent.prototype);
            });

        // Create the new classes prototype from the inherited classes
        // Don't bother if there are no classes to inherit from
        if(protos.length > 0) {
            // By reversing the protos array the first class takes priority
            protos.reverse();

            // Now flatten the protos array down to a new prototype object
            cl.prototype = Object.merge.apply(null, protos);
        }

        // Add a shortcut to the prototype
        cl.fn = cl.prototype;

        // Return the new class
        return cl;
    }

    return Class;
});
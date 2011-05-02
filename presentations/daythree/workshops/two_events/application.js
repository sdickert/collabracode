jQuery(function ($) {
    // Our major selections
    var submit = $('#submit'),
        clear = $('#clear'),
        error = $('#error'),
        success = $('#success'),
        chars = $('#char_count'),
        togo = $('#togo');
    
    // Invalidate an input by passing
    // a name reference
    function invalidate(name)
    {
        var input = $('[name="' + name + '"]'),                 // Store the input selection
            label = $('label[for="' + name + '"]'),             // Store the label selection
            style = { 'color' : 'red', 'font-weight' : 'bold'}; // Invalid style
            
        // Color the label and the input
        input.css(style);
        label.css(style);
        
        // Attach our event handlers
        
        input.bind('focus', function () {
            // Remove styles
            input.attr('style', '');
            label.attr('style', '');
            
            // I can safely do this because I know
            // nothing else _should_ be binding a 
            // focus event to my inputs.
            input.unbind('focus');
        });
    }
    
    function validate(elem)
    {
        var valid = true;
        
        $('.not_null').each(function () {
            var self = $(this),
                val = self.val(),
                name = self.attr('name');
            
            if (val == '')
            {
                invalidate(name);
                valid = false;
            }
        });
        
        $('.email').each(function () {
            var self = $(this),
                val = self.val(),
                name = self.attr('name'),
                split = val.split('@');
                
            // Lazy, not using a regular expression
            // And lazy, not actually a proper validation
            if (split.length !== 2)
            {
                invalidate(name);
                valid = false;
            }
        });
        
        $('.min_length').each(function () {
            var self = $(this),
                val = self.val(),
                name = self.attr('name');
                
            if (val.length < 15)
            {
                invalidate(name);
                valid = false;
            }
        });
        return valid;
    }
   
    clear.bind('click', function () {
        $('input, textarea').each(function () {
            
            // Triggers the invalidate binding
            $(this).trigger('focus');
            
            // Removes any input
            $(this).val('');
        });
        
        error.fadeOut(200);
        success.fadeOut(200);
    });
    
    submit.bind('click', function () {
        if (validate($('#comment_form')))
        {
            error.slideUp(200, function () {
                success.slideDown(200);
            });
        }
        else
        {
            error.slideDown(200);
        }
    });
    
    $('#comment').bind('keyup', function () {
        var val = $(this).val(),
            count = 15 - val.length;
        chars.text(count > 0 ? count : val.length);
        
        if (count <= 0 && togo.is(':visible'))
        {
            togo.hide();
        }
        else if (count > 0 && !togo.is(':visible'))
        {
            togo.show();
        }
    });
});
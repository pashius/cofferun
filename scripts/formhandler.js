(function (window) {
    'use strict';
    var App = window.app || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Cloud not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
      console.log('Setting input handler for form');
      this.$formElement.on('input', '[name="emailAddress"]', function(event){
          var emailAddress = event.target.value;
          console.log(fn(emailAddress));
      });
    };

    FormHandler.prototype.addRangeHandler = function (rangeSelector) {
        console.log('Setting range input handler for form');
        var $rangeInput = this.$formElement.find(rangeSelector);
        if ($rangeInput.length === 0) {
            throw new Error('For input type range not find element: ' + rangeSelector);
        } else {
            $rangeInput.on('change', function () {
                var $valRange = $(this).val();
                $(this).siblings('label').find('span').text($valRange);
            });
        }

    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
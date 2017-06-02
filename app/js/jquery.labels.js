"use strict";
( function(){

    $( function () {

        $.each( $('.site__form'), function () {

            new LabelForm( $(this) );

        } );

    } );

    var LabelForm = function ( obj ) {

        var _self = this,
            _obj = obj,
            _input = _obj.find('input:not([readonly]), textarea');

        var _addEvents = function () {

                _input.on( {
                    focusin: function() {

                        _addClassOnFocus( $(this) );

                    },
                    focusout: function() {

                        _removeClassOnFocusOut( $(this) );
                        _checkOnEmpty( $(this) );

                    }
                } );

            },
            _addClassOnFocus = function( input ) {

               var field = input,
                   inputParent = field.parent();

                inputParent.addClass('field_fill');

            },
            _removeClassOnFocusOut = function( input ) {

                var field = input,
                    inputParent = field.parent();

                inputParent.removeClass('field_fill');

            },
            _checkOnEmpty = function ( input ) {

                var field = input,
                    inputParent = field.parent();

                if( !( field.val() == '' ) ) {

                    inputParent.addClass('field_fill');

                }

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                _input.each( function() {

                    _checkOnEmpty( $(this) );

                } );

            };

        _init();
    };

} )();
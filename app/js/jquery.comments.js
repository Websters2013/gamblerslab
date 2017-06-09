"use strict";
( function(){

    $( function () {

        $.each( $( '.comments' ), function() {

            new AddComments ( $( this ) );

        } );

    } );

    var AddComments = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _add = _obj.find('.comments__add'),
            _write = _obj.find('.comments__write'),
            _dom = $( 'html, body'),
            _commentBlock = _obj.find('.contact-us');

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _onEvents = function () {

                _write.on( {
                    click: function() {

                        var curItem = $(this);

                        curItem.addClass('hidden');
                        _openComments();

                       return false;

                    }
                } );

                _add.on( {
                    click: function() {

                        _openComments();

                        _dom.stop( true, false );
                        _dom.animate( {
                            scrollTop: _commentBlock.offset().top - 20

                        });

                        return false;

                    }
                } );

            },
            _openComments = function () {

                _commentBlock.removeClass('hidden');

            };

        //public properties

        //public methods

        _constructor();
    };

} )();

( function(){

    "use strict";

    $( function(){

        $.each( $( '.search-results__wrap' ), function() {

            new AjaxLoadContent ( $( this ) );

        } );


    } );

    var AjaxLoadContent = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find( '.search-results__more' ),
            _objAction = _obj.data( 'path' ),
            _wrapper = _obj.find( '.search-results__items' ),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function() {

                _btnMore.on( {

                    click: function() {
                        _ajaxRequest();
                        return false;
                    }

                } );

            },
            _addNewsContent = function( msg ){

                var hasItems = msg.has_items;

                $.each( msg.items, function() {

                    var newBlock = $( '<div>\
                                        <a href="'+ this.href +'" class="search-results__item hidden">\
                                            <h2 class="search-results__item-title">'+ this.title +'</h2>\
                                            <div class="search-results__footer">\
                                                <div>'+ this.countBonuses +'</div>\
                                                <div>'+ this.countToday +'</div>\
                                            </div>\
                                        </a>\
                                    </div>' );

                    _wrapper.append( newBlock );

                } );

                var newItems = _obj.find( '.hidden' );

                setTimeout( function() {
                    _heightAnimation( hasItems, newItems );
                }, 50 );

            },
            _heightAnimation = function( hasItems, newItems ){

                newItems.each( function( i ){
                    _showNewItems( $( this ),i );
                } );

                if ( hasItems == 0 ){
                    _removeBtnMore();
                }

            },
            _showNewItems = function( item, index ){

                setTimeout( function() {
                    item.removeClass( 'hidden' );
                }, index * 100 );

            },
            _ajaxRequest = function() {

                var items = _obj.find( '.search-results__items>div' );
                _request.abort();
                _request = $.ajax( {
                    url: _objAction,
                    data: {
                        loadedCount: items.length
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function ( msg ) {

                        _addNewsContent( msg );

                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != 'abort' ) {
                            alert( 'Error!' );
                        }
                    }
                });

            },
            _removeBtnMore = function() {

                _btnMore.css( 'opacity', 0 );

                setTimeout( function() {

                    _btnMore.css( 'padding', 0 );

                    _btnMore.animate( {
                        height: 0
                    }, {
                        duration: 500,
                        complete: function() {
                            _btnMore.remove();
                        }
                    } );

                }, 300 );

            },
            _init = function() {

                _addEvents();
                _obj[ 0 ].obj = _self;

            };

        _init();
    };

} )();
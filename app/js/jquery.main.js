( function(){

    "use strict";

    $( function(){

        $.each( $( '.site' ), function() {
            new Page ( $( this ) );
        } );

    } );

    var Page = function( obj ) {

        //private properties
        var _obj = obj,
            _self = this,
            _head = $( '.site__header' ),
            _hero = $( '.site-first-scene' ),
            _scrollIcon = _hero.find( '.hero__footnote' ),
            _promo = _obj.find( '.promo' ),
            _promoItem = _obj.find( '.promo__item' ),
            _promoPagination = _obj.find( '.promo__pagination' ),
            _promoSkip = _obj.find( '.promo__skip' ),
            _window = $( window ),
            _canScroll = false,
            _headerHammer = null,
            _action = false,
            _promoFlag = false,
            _firstPromoFlag = true,
            _promoActive = true,
            _indicator, _indicator1,_lastPos, _lastPosH,
            _menu = new Menu( $('.menu') );

        //private methods
        var _onEvent = function(){
                _window.on( {
                    'keydown': function ( e ) {
                        switch( e.which ) {

                            case 32:
                                _checkScroll( 1 );
                                break;
                            case 33:
                                _checkScroll( -1 );
                                break;
                            case 34 :
                                _checkScroll( 1 );
                                break;
                            case 35 :
                                _checkScroll( 1 );
                                break;
                            case 36 :
                                _checkScroll( -1 );
                                break;
                            case 38:
                                _checkScroll( -1 );
                                break;
                            case 40:
                                _checkScroll( 1 );
                                break;

                            default:
                                return;
                        }
                    },
                    'touchmove': function ( e ) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if ( currentPos < _lastPosH && !_menu.opened && ( _obj.scrollTop() == 0 ) ) {
                            _showHero();
                        }
                        _lastPos = currentPos;

                    }
                });
                _hero.on( {
                    'touchmove': function ( e ) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if ( currentPos > _lastPosH ) {
                            _hideHero();
                        }
                        _lastPosH = currentPos;

                    }
                } );
                _scrollIcon.on({
                    click: function () {
                        _checkScroll(1);
                        _indicator1.turnOn();
                    }
                });
                _obj.on({
                    'scroll': function () {

                        if ( _obj.scrollTop() == 0 && _promoActive ){
                            _indicator1.turnOn();
                        } else {

                            setTimeout( function () {
                                _promoActive = true;
                                return false;
                            }, 500 )

                        }

                    }
                });
                _promoSkip.on( {
                    click: function() {

                        $( '.site' ).animate( {
                            scrollTop: _promo.outerHeight()
                        }, 600);

                        if ( _promoItem.filter( '.active' ).index() == 0 ) {
                            _firstPromoFlag = true;
                            _promoFlag = false;
                            _canScroll = false;
                        }

                        _indicator1.turnOff();
                        return false;
                    }
                } );
                _promoPagination.find( 'span' ).on( {
                    click: function () {

                        $( '.site' ).animate( {
                            scrollTop: 0
                        }, 600);
                        _indicator1.turnOn();

                        var curPoint = $( this ).index();

                        _promoItem.removeClass( 'active' );
                        _promoItem.eq( curPoint ).addClass( 'active' );
                        _promoItem.eq( curPoint ).removeClass( 'prev' );
                        _promoItem.filter( '.active' ).prevAll( '.promo__item' ).addClass( 'prev' );
                        _promoItem.filter( '.active' ).nextAll( '.promo__item' ).removeClass( 'prev' );

                        _pagination();

                        if ( _promoItem.filter( '.active' ).index() == 0 ) {
                            _firstPromoFlag = true;
                            _promoFlag = false;
                        } else {
                            _firstPromoFlag = false;
                            _promoFlag = false;
                        }

                    }
                } );

                _indicator = new WheelIndicator({
                    elem: document.querySelector( '.element' ),
                    callback: function( e ){

                        var directionY = ( e.direction == 'up' ) ? -1 : 1;

                        console.log( directionY )

                        if( !_action ){
                            _checkScroll( directionY );
                        }

                        if( _action || !_canScroll ){
                            return false;
                        }

                    }
                });
                _indicator.getOption( 'preventMouse' );

                _indicator1 = new WheelIndicator({
                    elem: document.querySelector( '.element1' ),
                    callback: function( e ){

                        var directionY = ( e.direction == 'up' ) ? -1 : 1;

                        if( !_action ){
                            _checkScroll( directionY );
                        }

                        if( _action || !_canScroll ){
                            return false;
                        }

                    }
                });
                _indicator1.getOption( 'preventMouse' );
                _indicator1.turnOff();

            },
            _initPromo = function () {

                _promoItem.each( function () {
                    _promoPagination.append( '<span></span>' )
                } );

                _pagination();

            },
            _pagination  = function () {

                var curPoint = _promoItem.filter( '.active' ).index(),
                    span = _promoPagination.find( 'span' );

                span.removeClass( 'active' );
                span.eq( curPoint ).addClass( 'active' );

            },
            _checkScroll = function( direction ){
                if ( direction > 0 && !_canScroll && !_menu.opened && !_promoFlag ){
                    _hideHero();
                    _indicator.turnOff();
                    _indicator1.turnOn();
                }
                else if ( direction > 0 && !_canScroll && !_menu.opened && _promoFlag ){
                    _checkPromoDown();
                }
                else if ( direction < 0 && !_canScroll && !_menu.opened && _firstPromoFlag ) {
                    _showHero();
                    _indicator.turnOn();
                    _indicator1.turnOff();
                    _canScroll = false;
                }
                else if ( direction < 0 && ( _obj.scrollTop() == 0 ) && !_menu.opened ) {
                    _checkPromoUp();
                }
            },
            _checkPromoDown = function () {

                var curElem = _promoItem.filter( '.active' ),
                    lengthItems = _promoItem.length;

                if ( ( lengthItems - 2 ) >= curElem.index() ) {

                    curElem.each( function () {

                        $( this ).next( '.promo__item' ).addClass( 'active' );
                        $( this ).addClass( 'prev' );
                        $( this ).removeClass( 'active' );

                        _firstPromoFlag = false;
                    } );

                } else {
                    _canScroll = true;
                    _promoActive = false;
                    _indicator1.turnOff();
                }

                _pagination();

            },
            _checkPromoUp = function () {

                _canScroll = false;

                var curElem = _promoItem.filter( '.active' );

                if ( curElem.index() >= 1 ) {

                    curElem.each( function () {
                        $( this ).prev( '.promo__item' ).removeClass( 'prev' );
                        $( this ).prev( '.promo__item' ).addClass( 'active' );
                        $( this ).removeClass( 'active' );
                    } );

                    if ( curElem.index() == 1 ) {
                        _firstPromoFlag = true;
                        _promoFlag = false;
                    }

                }

                _pagination();

            },
            _hideHero = function(){

                if(!_action){
                    _action = true;

                    _hero.addClass('hide');
                    _self.hide = true;
                    _head.addClass('site__header-hide');
                    $( '.menu' )[0].obj.destroy();

                    //for css animation
                    setTimeout(function(){
                        _action = false;
                        _promoFlag = true;
                    }, 500);

                }

            },
            _showHero = function(){

                if(!_action){
                    _action = true;

                    _hero.removeClass('hide');
                    _head.removeClass('site__header-hide');

                    //for css animation
                    setTimeout(function(){
                        _action = false;
                    }, 300);
                }

                _promoFlag = false;

            },
            _construct = function() {
                _initPromo();
                _onEvent();
                _obj[ 0 ].obj = _self;
            };

        //public properties
        _self.hide = false;

        //public methods

        _construct();
    };

} )();
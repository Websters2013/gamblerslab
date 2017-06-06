( function(){

    "use strict";

    $( function(){

        $.each( $( '.preload' ), function() {
            new Preload ( $( this ) );
        } );

        $.each( $( '.back-to-top' ), function() {
            new BackToTop ( $( this ) );
        } );

        $.each( $( '.search' ), function() {
            new SearchPanel ( $( this ) );
        } );

        $.each( $( '.info' ), function() {
            new InfoPanel ( $( this ) );
        } );

        $.each( $( '.site__aside' ), function() {
            new AsideMenu ( $( this ) );
        } );

    } );

    var BackToTop = function( obj ) {

        //private properties
        var _obj = obj,
            _body = $( 'html, body' ),
            _window = $( window );

        //private methods
        var  _onEvent = function() {

                _obj.on (
                    'click', function () {
                        _backToTop();
                    }
                );

                _window.on (
                    'scroll', function () {
                        _checkScroll();
                    }
                );

            },
            _backToTop = function() {

                _body.animate( { scrollTop : 0 }, 500, 'swing' )

            },
            _checkScroll = function () {

                if ( _window.scrollTop() > _body.height() ){
                    _showBtn();
                } else {
                    _hideBtn();
                }

            },
            _showBtn = function() {

                _obj.addClass( 'show' );

            },
            _hideBtn = function() {

                _obj.removeClass( 'show' );

            },
            _init = function() {
                _onEvent();
                _checkScroll();
            };

        //public properties

        //public methods

        _init();
    };

    var InfoPanel = function( obj ) {

        //private properties
        var _obj = obj,
            _btnShowInfo = _obj.find( '.info__btn-open' ),
            _infoFrame = _obj.find( '.info__frame' ),
            _body = $( 'body, html' ),
            _window = $( window );

        //private methods
        var  _onEvent = function() {

                _body.on(
                    'click', function () {
                        _hidePanelOnMobile();
                    }
                );

                _obj.on(
                    'click', function ( e ) {
                        e.stopImmediatePropagation();
                    }
                );

                _btnShowInfo.on (
                    'click', function () {

                        if ( !_infoFrame.hasClass( 'show' ) ) {
                            _showInfoOnMobile();
                        } else {
                            _hidePanelOnMobile();
                        }

                    }
                );

                _window.on (
                    'resize', function () {
                        _hidePanelOnMobile();
                    }
                );

            },
            _showInfoOnMobile = function () {
                _infoFrame.addClass( 'show' );
            },
            _hidePanelOnMobile = function () {
                _infoFrame.removeClass( 'show' );
            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var AsideMenu = function( obj ) {

        //private properties
        var _obj = obj,
            _mobileBtnOpen = $( '.mobile-btn' ),
            _moreLinksBtn = _obj.find( '.links__show-more' ),
            _body = $( 'html, body' ),
            _window = $( window );

        //private methods
        var _onEvent = function() {

                _obj.on(
                    'click', function ( e ) {
                        e.stopImmediatePropagation();
                    }
                );

                _mobileBtnOpen.on (
                    'click', function ( e ) {
                        e.stopImmediatePropagation();

                        var curElem = $( this );

                        if ( !curElem.hasClass( 'close' ) ) {
                            _showMobileAside();
                        } else {
                            _hideMobileAside();
                        }

                    }
                );

                _body.on(
                    'click', function () {
                        _hideMobileAside();
                    }
                );

                _moreLinksBtn.on(
                    'click', function ( e ) {

                        console.log( e )
                        //
                        // var curElement = $( this );
                        //
                        // if ( !curElement.hasClass( 'hideLinks' ) ) {
                        //     _showMoreLinks( curElement );
                        // } else {
                        //     _showLessLinks( curElement );
                        // }

                    }
                );

            },
            _showMoreLinks = function ( o ) {

                var curElement = o,
                    curLinksWrap = curElement.prev( '.links__wrap' ),
                    numberViewLinks = curLinksWrap.data( 'show' );

            },
            _showLessLinks = function ( o ) {

                var curElement = o,
                    curLinksWrap = curElement.prev( '.links__wrap' ),
                    numberViewLinks = curLinksWrap.data( 'show' );

            },
            _initScroll = function () {

                _obj.perfectScrollbar();

            },
            _showMobileAside = function() {

                _mobileBtnOpen.addClass( 'close' );
                _obj.addClass( 'show' );

            },
            _hideMobileAside = function() {

                _mobileBtnOpen.removeClass( 'close' );
                _obj.removeClass( 'show' );

            },
            _init = function() {
                // _showLessLinks();
                _initScroll();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var Preload = function( obj ) {

        //private properties
        var _obj = obj;

        //private methods
        var  _onEvent = function() {

            },
            _showSite = function() {

                _obj.addClass( 'hide' );

                setTimeout(function() {
                    _obj.remove();
                }, 750);

            },
            _init = function() {
                _onEvent();
                _showSite();
            };

        //public properties

        //public methods

        _init();
    };

    var SearchPanel = function( obj ) {

        //private properties
        var _obj = obj,
            _btnShowMobile = _obj.find( '.search__btn-open' ),
            _btnCancel = _obj.find( '.search__btn-cancel' ),
            _searchForm = _obj.find( '.search__form' ),
            _body = $( 'html, body' ),
            _window = $( window );

        //private methods
        var  _onEvent = function() {

                _obj.on(
                    'click', function ( e ) {
                        e.stopImmediatePropagation();
                    }
                );

                _body.on(
                    'click', function () {

                        if ( _body.width() < 1200 ){
                            _hidePanelOnMobile();
                        }

                    }
                );

                _btnShowMobile.on (
                    'click', function () {
                        _showPanelOnMobile();
                    }
                );

                _btnCancel.on (
                    'click', function () {
                        _hidePanelOnMobile();
                        return false;
                    }
                );

                _window.on (
                    'resize', function () {
                        _hidePanelOnMobile();
                    }
                );

            },
            _showPanelOnMobile = function () {

                _searchForm.addClass( 'show' );
                _searchForm.css( {
                    'left': _btnShowMobile.offset().left * -1,
                    'width': _body.width()
                } );

            },
            _hidePanelOnMobile = function () {

                _searchForm.css( {
                    'left': 0,
                    'width': 0
                } );
                _searchForm.removeClass( 'show' );

            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

} )();
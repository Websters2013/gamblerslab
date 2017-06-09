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

        $.each( $( '.bonuses__filter' ), function() {
            new Filter ( $( this ) );
        } );

    } );

    var AsideMenu = function( obj ) {

        //private properties
        var _obj = obj,
            _links = _obj.find( 'a' ),
            _linksWraps = _obj.find( '.links' ),
            _bonusSearch = _obj.find( '.links__show-all' ),
            _bonusCasinos = _obj.find( '.links_casinos' ),
            _hideSearch = _obj.find( '.links__back' ),
            _searchInput = _obj.find( '.links__search-input' ),
            _header = $( '.site__header' ),
            _mobileBtnOpen = $( '.mobile-btn' ),
            _lessLinksBox = _obj.find( '.links_less' ),
            _moreLinksBtn = _lessLinksBox.find( '.links__show-more' ),
            _body = $( 'html, body' ),
            _window = $( window ),
            _objTopPosition = _obj.offset().top,
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _window.on( {
                    'scroll': function () {

                        if (_window.scrollTop() >= _objTopPosition && _window.width() >= 1200) {
                            _fixedDesktopAside();
                        } else if (_window.scrollTop() < _objTopPosition && _window.width() >= 1200) {
                            _unfixedDesktopAside();
                        }

                    },
                    'resize': function () {

                        if (_window.scrollTop() >= _objTopPosition && _window.width() >= 1200) {
                            _fixedDesktopAside();
                        } else if (_window.scrollTop() < _objTopPosition && _window.width() >= 1200) {
                            _unfixedDesktopAside();
                        }

                    }
                } );

                _mobileBtnOpen.on (
                    'click', function ( e ) {

                        var curElem = $( this );

                        if ( !curElem.hasClass( 'close' ) ) {
                            _showMobileAside();
                        } else {
                            _hideMobileAside();
                        }

                    }
                );

                _body.on(
                    'click', function ( e ) {

                        if ( $( e.target ).closest( _mobileBtnOpen ).length != 0  ){
                            return false;
                        }

                        if ( $( e.target ).closest( _obj ).length == 0 ){
                            _hideMobileAside();
                        }

                    }
                );

                _moreLinksBtn.on(
                    'click', function () {

                        var curElement = $( this );

                        if ( !curElement.hasClass( 'hide-links' ) ) {
                            _showMoreLinks( curElement );
                        } else {
                            _showLessLinks( curElement );
                        }

                    }
                );

                _bonusSearch.on(
                    'click', function () {
                        _showBonusSearch();
                        return false;
                    }
                );

                _hideSearch.on(
                    'click', function () {
                        _hideBonusSearch();
                        return false;
                    }
                );

                _links.on(
                    'click', function () {
                        _obj.perfectScrollbar();
                    }
                );

                _searchInput.on(
                    'keyup', function( e ) {
                        if( e.keyCode == 27 ){

                        } else if( e.keyCode == 40 ){

                        } else if( e.keyCode == 38 ){

                        } else if ( e.keyCode == 13 ) {

                        } else {
                            _ajaxRequest();
                        }
                    }
                )

            },
            _ajaxRequest = function(){

                _request = $.ajax( {
                    url: _obj.data( 'link' ),
                    data: {
                        value: _searchInput.val(),
                        loadedCount: _searchInput.val().length
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {

                        _loadData( data );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _showMoreLinks = function ( o ) {

                var curElement = o,
                    curLinksWrap = curElement.prev( '.links__wrap' ),
                    curBoxLinks = curLinksWrap.find( '.links__item' );

                curBoxLinks.show();
                curElement.addClass( 'hide-links' );
                curElement.html( 'Show Less' );

                _obj.perfectScrollbar( 'update' );

            },
            _showLessLinks = function ( o ) {

                if ( o.length > 0 ){

                    var curElement = o;

                    _lessLinksBox = o.parents( '.links_less' );

                    curElement.removeClass( 'hide-links' );
                    curElement.html( 'Show More' );

                }

                _lessLinksBox.each( function () {

                    var curBox = $( this ),
                        curWrap = curBox.find( '.links__wrap' ),
                        viewNum = curWrap.data( 'show' ),
                        curBoxLinks = curBox.find( '.links__item' );

                    for ( var i = viewNum; i <= curBoxLinks.length; i++ ){
                        curBoxLinks.eq( i ).hide();
                    }

                } );

                _obj.perfectScrollbar( 'update' );

            },
            _showBonusSearch = function () {

                if ( _obj.hasClass( 'fixed' ) ){
                    _obj.css( 'height', _body.height() );
                } else {
                    _obj.css( 'height', _body.height() - _header.height() );
                }

                _obj.perfectScrollbar( 'destroy' );

                _linksWraps.addClass( 'hide' );

                _bonusCasinos.addClass( 'active' );

                setTimeout( function () {
                    _linksWraps.find( '.links__wrap' ).perfectScrollbar();
                }, 500 );

            },
            _hideBonusSearch = function () {

                _linksWraps.find( '.links__wrap' ).perfectScrollbar( 'destroy' );

                _linksWraps.removeClass( 'hide' );
                _bonusCasinos.removeClass( 'active' );

                if ( _obj.hasClass( 'fixed' ) ){
                    _obj.css( 'height', _body.height() );
                } else {
                    _obj.css( 'height', _body.height() - _header.height() );
                }

                setTimeout( function () {
                    _initScroll();
                }, 500 );

            },
            _fixedDesktopAside = function () {
                _obj.addClass( 'fixed' );
                _obj.css( 'height', _body.height() );
                _obj.perfectScrollbar( 'update' );
            },
            _unfixedDesktopAside = function () {
                _obj.removeClass( 'fixed' );
                _obj.css( 'height', _body.height() - _header.height() );
                _obj.perfectScrollbar( 'update' );
            },
            _showMobileAside = function() {

                _mobileBtnOpen.addClass( 'close' );
                _obj.addClass( 'show' );
                _body.css( 'overflow-y', 'hidden' );

                _uploadAsideHeight();

            },
            _hideMobileAside = function() {

                _mobileBtnOpen.removeClass( 'close' );

                _obj.removeClass( 'show' );

                _body.css( 'overflow-y', 'visible' );

            },
            _uploadAsideHeight = function () {
                _obj.css( 'height', _body.height() - _header.height() );
                _initScroll();
            },
            _initScroll = function () {

                _obj.perfectScrollbar();

            },
            _loadData = function ( data ) {

                var arr = data.items,
                    num = 5;

                if ( _searchInput.val() != '' ){
                    num = arr.length;
                }

                for ( var i = 0; i < num; i++ ){

                    var curLinksWrap = _bonusCasinos.children( '.links__wrap' );

                    if ( i == 0 ){
                        curLinksWrap.html( '<a href="'+ arr[i].href +'" class="links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    } else {
                        curLinksWrap.append( '<a href="'+ arr[i].href +'" class="links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    }

                }

            },
            _init = function() {
                _showLessLinks( 0 );
                _uploadAsideHeight();

                _ajaxRequest();

                if ( _window.scrollTop() >= _objTopPosition && _window.width() >= 1200 ){
                    _fixedDesktopAside();
                }

                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

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

    var Filter = function( obj ) {

        //private properties
        var _obj = obj,
            _filterBtn = _obj.find( '.bonuses__filter-frame-btn' ),
            _filterPopup = _obj.find( '.bonuses__filter-frame-popup' ),
            _filterItem = _filterPopup.find( 'label' ),
            _filterCheckbox = _filterItem.find( 'input' );

        //private methods
        var _onEvent = function() {

                _filterBtn.on( 'click', function () {

                    var curElem = $( this );

                    if ( !curElem.hasClass( 'close' ) ){
                        _showPopup();
                    } else {
                        _hidePopup();
                    }

                    return false;

                } );

                _filterCheckbox.on( 'click', function () {
                    _illuminationItem();
                } );

            },
            _showPopup = function() {

                _filterBtn.addClass( 'close' );
                _filterPopup.addClass( 'show' );

            },
            _hidePopup = function() {

                _filterBtn.removeClass( 'close' );
                _filterPopup.removeClass( 'show' );

            },
            _illuminationItem = function() {

                _filterItem.each( function () {

                    var curElem = $( this ),
                        curCheckbox = curElem.find( 'input' );

                    if ( curCheckbox.is(":checked") ){
                        curElem.addClass( 'illumination' );
                    } else {
                        curElem.removeClass( 'illumination' );
                    }

                } );

                if ( _filterItem.first().hasClass( 'illumination' ) ) {
                    _filterPopup.addClass( 'gray' );
                } else {
                    _filterPopup.removeClass( 'gray' );
                }

            },
            _init = function() {
                _illuminationItem();
                _onEvent();
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
                    'click', function ( e ) {

                        if ( $( e.target ).closest( _obj ).length == 0 ){
                            _hidePanelOnMobile();
                        }

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
            _searchInput = _obj.find( 'input' ),
            _searchPopup = _obj.find( '.search__popup' ),
            _body = $( 'html, body' ),
            _window = $( window ),
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _body.on(
                    'click', function ( e ) {

                        if ( $( e.target ).closest( _obj ).length == 0 && _body.width() < 1200 ){
                            _hidePanelOnMobile();
                        } else if ( $( e.target ).closest( _obj ).length == 0 && _body.width() >= 1200 ){
                            _reduceSearch();
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

                        if ( _body.width() < 1200 ) {
                            _hidePanelOnMobile();
                        } else if ( _body.width() >= 1200 ) {
                            _reduceSearch();
                        }
                        return false;
                    }
                );

                _searchInput.on (
                    'focus', function () {

                        if ( _body.width() < 1200 ) {
                            _showPopup();
                        } else if ( _body.width() >= 1200 ) {
                            _increaseSearch();
                        }

                    }
                );

                _window.on (
                    'resize', function () {

                        if ( _body.width() < 1200 ){
                            _hidePanelOnMobile();
                        }

                    }
                );

            },
            _ajaxRequest = function(){

                _request = $.ajax( {
                    url: _obj.data( 'link' ),
                    data: {
                        value: _searchInput.val(),
                        loadedCount: _searchInput.val().length
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {

                        _loadData( data );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _increaseSearch = function () {

                _searchForm.addClass( 'increase' );

                setTimeout( function () {
                    _searchPopup.addClass( 'show' );
                }, 300 );

            },
            _reduceSearch = function () {

                _searchPopup.removeClass( 'show' );

                setTimeout( function () {
                    _searchForm.removeClass( 'increase' );
                }, 300 );

            },
            _showPopup = function () {

                _searchPopup.addClass( 'show' );

                _searchPopup.css( {
                    'left': _btnShowMobile.offset().left * -1 + 10,
                    'width': _body.width() - 20
                } );

            },
            _hidePopup = function () {

                _searchPopup.removeClass( 'show' );

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

                _hidePopup();

            },
            _loadData = function () {

            },
            _init = function() {
                _ajaxRequest();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

} )();
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

        $.each( $( '.filter' ), function() {
            new Filter ( $( this ) );
        } );

        $.each( $( '.bonus' ), function() {
            new Bonus ( $( this ) );
        } );

    } );

    var AsideMenu = function( obj ) {

        //private properties
        var _obj = obj,
            _links = _obj.find( 'a' ),
            _linksWraps = _obj.find( '.links' ),
            _bonusSearch = _obj.find( '.links__show-all' ),
            _bonusCasinos = _obj.find( '.links_casinos' ),
            _curLinksWrap = _bonusCasinos.find( '.links__wrap' ),
            _linksNoResults = _bonusCasinos.find( '.links__no-results' ),
            _hideSearch = _bonusCasinos.find( '.links__back' ),
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

                        return false;

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
                            _ajaxRequest( 1 );
                        }
                    }
                )

            },
            _ajaxRequest = function( num ){

                _bonusCasinos.addClass( 'load' );

                _request = $.ajax( {
                    url: _obj.data( 'link' ),
                    data: {
                        value: _searchInput.val(),
                        loadedCount: _searchInput.val().length
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {

                        _loadData( data, num );

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

                _ajaxRequest( 1 );

            },
            _hideBonusSearch = function () {

                $( '.links__search' )[0].reset();

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

                _ajaxRequest( 0 );

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
            _loadData = function ( data, num ) {

                _curLinksWrap.empty();

                var arr = data.items;

                if ( num == 0 ){

                    var number = 5;

                } else if ( num == 1 ) {

                    var number = arr.length;

                }

                for ( var i = 0; i < number; i++ ){

                    if ( i == 0 ){
                        _curLinksWrap.html( '<a href="'+ arr[i].href +'" class="links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    } else {
                        _curLinksWrap.append( '<a href="'+ arr[i].href +'" class="links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    }

                }

                if ( data == undefined || data.items == undefined || data.items.length == 0 ) {

                    _curLinksWrap.find( '.search__popup-title' ).hide();
                    _linksNoResults.show();

                } else {

                    _curLinksWrap.find( '.search__popup-title' ).show();
                    _linksNoResults.hide();

                };

                _bonusCasinos.removeClass( 'load' );

            },
            _init = function() {
                _showLessLinks( 0 );
                _uploadAsideHeight();

                _ajaxRequest( 0 );

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

    var Bonus = function( obj ) {

        //private properties
        var _obj = obj,
            _bonusItem = _obj.find( '.bonus__item' );

        //private methods
        var _onEvent = function() {

            },
            _initSlider = function() {

                _bonusItem.each( function () {

                    var curItem = $( this ),
                        bonusSlider = curItem.find( '.bonus__slider' ),
                        bonusSwiper = curItem.find( '.bonus__swiper' ),
                        bonusItem = curItem.find( '.bonus__slide' ),
                        swiperPagination = $( '<div class="bonus__pagination"></div>' ),
                        swiperNextButton = $( '<div class="bonus__button-next"></div>' ),
                        swiperPrevButton = $( '<div class="bonus__button-prev"></div>' ),
                        bonus;

                    if ( bonusItem.length > 1 ){

                        bonusSlider.append( swiperPagination );
                        bonusSlider.append( swiperNextButton );
                        bonusSlider.append( swiperPrevButton );

                        bonus = new Swiper ( bonusSwiper, {
                            autoplay: false,
                            speed: 500,
                            effect: 'slide',
                            slidesPerView: 1,
                            loop: false,
                            pagination: swiperPagination,
                            nextButton: swiperNextButton,
                            prevButton: swiperPrevButton
                        } );

                    }

                } );

            },
            _init = function() {
                _initSlider();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var Filter = function( obj ) {

        //private properties
        var _obj = obj,
            _filterFrame = _obj.find( '.filter__frame' ),
            _filterBtn = _obj.find( '.filter__frame-btn' ),
            _filterPopup = _obj.find( '.filter__popup' ),
            _filterItem = _filterPopup.find( 'label' ),
            _filterCheckbox = _filterItem.find( 'input' ),
            _body = $( 'html, body' );

        //private methods
        var _onEvent = function() {

                _body.on(
                    'click', function ( e ) {

                        if ( $( e.target ).closest( _filterBtn ).length != 0  ){
                            return false;
                        }

                        if ( $( e.target ).closest( _filterPopup ).length == 0 ){
                            _hidePopup();
                        }

                    }
                );

                _filterBtn.on( 'click', function () {

                    var curElem = $( this );

                    if ( !curElem.hasClass( 'close' ) ){
                        _showPopup();
                    } else {
                        _hidePopup();
                    }

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

                    if ( curCheckbox.is(" :checked ") ){
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

                var illumination = _filterPopup.find( '.illumination' );

                if ( illumination.length > 0 ){
                    _filterFrame.addClass( 'active' );
                } else {
                    _filterFrame.removeClass( 'active' );
                };

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
            _searchForm = _obj.find( '.search__form' ),
            _searchInput = _obj.find( 'input' ),
            _searchPopup = _obj.find( '.search__popup' ),
            _btnCancel = _obj.find( '.search__btn-cancel' ),
            _searchPopupLists = _searchPopup.find( '.search__popup_lists' ),
            _searchListsResults = _searchPopup.find( '.search__lists-results' ),
            _searchPopupOffers = _searchPopup.find( '.search__popup_offers' ),
            _searchOffersResults = _searchPopup.find( '.search__offers-results' ),
            _searchLinksResults = _searchPopup.find( '.search__popup-links' ),
            _searchNoResults = _searchPopup.find( '.search__popup-no-results' ),
            _searchUpdate = _searchPopup.find( '.search__popup-update' ),
            _body = $( 'html, body' ),
            _window = $( window ),
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _window.on (
                    'resize', function () {

                        if ( _body.width() < 1200 ){
                            _hidePanelOnMobile();
                        }

                    }
                );

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

                        _searchForm[0].reset();

                        return false;
                    }
                );

                _searchInput.on ( {
                    'focus': function () {

                        if (_body.width() < 1200) {
                            _showPopup();
                        } else if (_body.width() >= 1200) {
                            _increaseSearch();
                        }

                    },
                    'keyup': function( e ) {
                        if( e.keyCode == 27 ){

                        } else if( e.keyCode == 40 ){

                        } else if( e.keyCode == 38 ){

                        } else if ( e.keyCode == 13 ) {

                        } else {

                            _searchPopup.addClass( 'load' );

                            _ajaxRequest();
                        }
                    }
                } );

                _searchUpdate.on (
                    'click', function () {

                        _searchForm[0].reset();
                        _ajaxRequest();

                        return false;

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
            _loadData = function ( data ) {

                var arr = data;

                if ( _searchInput.val().length > 0 ) {
                    _searchLinksResults.addClass( 'show' );

                    _searchLinksResults.find( 'span' ).html( _searchInput.val() );

                } else {
                    _searchLinksResults.removeClass( 'show' );
                };

                _searchPopupOffers.empty();
                _searchPopupLists.empty();

                _searchListsResults.html( arr.lists_results );
                _searchOffersResults.html( arr.offers_results );

                if ( arr.lists != undefined ) {

                    for (var i = 0; i < arr.lists.length; i++) {

                        if (i == 0) {
                            _searchPopupLists.html('<a href="' + arr.lists[i].href + '" class="search__popup-item"><i>' + arr.lists[i].title + '</i><span>' + arr.lists[i].countBonuses + '</span></a>');
                        } else {
                            _searchPopupLists.append('<a href="' + arr.lists[i].href + '" class="search__popup-item"><i>' + arr.lists[i].title + '</i><span>' + arr.lists[i].countBonuses + '</span></a>');
                        }

                    }

                };

                if ( arr.offers != undefined ) {

                    for (var i = 0; i < arr.offers.length; i++) {

                        if (i == 0) {
                            _searchPopupOffers.html('<a href="' + arr.offers[i].href + '" class="search__popup-item"><i>' + arr.offers[i].title + '</i><span>' + arr.offers[i].countBonuses + '</span></a>');
                        } else {
                            _searchPopupOffers.append('<a href="' + arr.offers[i].href + '" class="search__popup-item"><i>' + arr.offers[i].title + '</i><span>' + arr.offers[i].countBonuses + '</span></a>');
                        }

                    }

                };

                if ( arr.lists == undefined && arr.offers == undefined ) {

                    _searchPopup.find( '.search__popup-title' ).hide();
                    _searchPopup.find( '.search__popup-wrap' ).hide();

                    _searchNoResults.show();

                } else if ( arr.lists.length == 0 && arr.offers.length == 0 ) {

                    _searchPopup.find( '.search__popup-title' ).hide();
                    _searchPopup.find( '.search__popup-wrap' ).hide();

                    _searchNoResults.show();

                } else {

                    _searchPopup.find( '.search__popup-title' ).show();
                    _searchPopup.find( '.search__popup-wrap' ).show();

                    _searchNoResults.hide();

                };

                _searchPopup.removeClass( 'load' );

                _illumination();

            },
            _illumination = function () {

                var searchItems = _obj.find( '.search__popup-item i' );

                searchItems.each( function () {

                    $( this ).html(function( _, html ) {
                        return html.replace( new RegExp( _searchInput.val().toLowerCase(), 'i\g' ), '<b>$&</b>' )
                    } );

                } );

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
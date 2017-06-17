( function(){

    "use strict";

    $( function(){

        $.each( $( '.validation-form' ), function() {

            new FormValidator ( $( this ) );

        } );

        $.each( $( '.comments' ), function() {

            new AddComments ( $( this ) );

        } );

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

        $.each( $('.site__form'), function () {

            new LabelForm( $(this) );

        } );

    } );

    var AsideMenu = function( obj ) {

        //private properties
        var _obj = obj,
            _linksWraps = _obj.find( '.links' ),
            _bonusShowAll = _obj.find( '.links__show-all' ),
            _linkWrapBonus = _obj.find( '.links_casinos-search' ),
            _curLinksWrap = _linkWrapBonus.find( '.links__wrap' ),
            _linksNoResults = _linkWrapBonus.find( '.links__no-results' ),
            _hideSearch = _linkWrapBonus.find( '.links__back' ),
            _formSearch = _linkWrapBonus.find( '.links__search' ),
            _btnCancel = _linkWrapBonus.find( '.links__search-cancel' ),
            _searchInput = _obj.find( '.links__search-input' ),
            _siteHeader = $( '.site__header' ),
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
                        } else if ( _window.width() < 1200 ) {
                            _hideBonusSearch();
                            _hideMobileAside();
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

                        if ( $( e.target ).closest( _obj ).length == 0 && _window.width() <= 1200 ){
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

                _bonusShowAll.on(
                    'click', function () {
                        _showBonusSearch();
                    }
                );

                _hideSearch.on(
                    'click', function () {
                        _hideBonusSearch();
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
                );

                _btnCancel.on(
                    'click', function() {

                        _formSearch[0].reset();

                        _ajaxRequest();

                        setTimeout( function () {
                            _curLinksWrap.getNiceScroll().resize();
                        }, 300 )

                        return false;

                    }
                )

            },
            _ajaxRequest = function( ){

                _linkWrapBonus.addClass( 'load' );

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

                curElement.addClass( 'hide-links' );
                curElement.html( 'Show Less' );
                curLinksWrap.css( 'height', curBoxLinks.outerHeight() * curBoxLinks.length );

                setTimeout( function () {
                    _obj.getNiceScroll().resize();
                }, 500 );

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

                    curWrap.css( 'height', curBoxLinks.outerHeight() * viewNum );

                } );

                setTimeout( function () {
                    _obj.getNiceScroll().resize();
                }, 500 );

            },
            _showBonusSearch = function () {

                if ( _obj.hasClass( 'fixed' ) ){
                    _obj.css( 'height', _body.height() );
                } else {
                    _obj.css( 'height', _body.height() - _siteHeader.height() );
                }

                _obj.animate( { scrollTop: 0 }, 200);
                _obj.getNiceScroll().remove();

                _linkWrapBonus.addClass( 'active' );

                if ( _window.width() >= 768 ){

                    _curLinksWrap.niceScroll( {
                        cursorcolor: "#45b8c7",
                        cursorwidth: "10",
                        cursorborder: "none",
                        cursorborderradius: "0",
                        autohidemode: false,
                        background: "#445669"
                    } );

                } else {

                    _curLinksWrap.niceScroll( {
                        cursorcolor: "#45b8c7",
                        cursorwidth: "5",
                        cursorborder: "none",
                        cursorborderradius: "0",
                        autohidemode: false,
                        background: "#445669"
                    } );

                }

                _ajaxRequest();

            },
            _hideBonusSearch = function () {

                $( '.links__search' )[0].reset();

                _curLinksWrap.getNiceScroll().remove();
                _linkWrapBonus.removeClass( 'active' );

                if ( _obj.hasClass( 'fixed' ) ){
                    _obj.css( 'height', _body.height() );
                } else {
                    _obj.css( 'height', _body.height() - _siteHeader.height() );
                }

                _initScroll();

            },
            _fixedDesktopAside = function () {
                _obj.addClass( 'fixed' );
                _obj.css( 'height', _body.height() );
                _obj.getNiceScroll().resize();
            },
            _unfixedDesktopAside = function () {
                _obj.removeClass( 'fixed' );
                _obj.css( 'height', _body.height() - _siteHeader.height() );
                _obj.getNiceScroll().resize();
            },
            _showMobileAside = function() {

                _mobileBtnOpen.addClass( 'close' );
                _obj.addClass( 'show' );
                _body.css( 'overflow-y', 'hidden' );

                setTimeout( function () {
                    _initScroll();
                }, 300 )

                _uploadAsideHeight();

            },
            _hideMobileAside = function() {

                _mobileBtnOpen.removeClass( 'close' );

                _obj.removeClass( 'show' );

                _body.css( 'overflow-y', 'visible' );

                _obj.getNiceScroll().remove();

            },
            _uploadAsideHeight = function () {

                _obj.css( 'height', _body.height() - _siteHeader.height() );

                if ( _window.scrollTop() >= _objTopPosition && _window.width() >= 1200 ){
                    _fixedDesktopAside();
                    _initScroll();
                } else if ( _window.width() >= 1200 ) {
                    _initScroll();
                }

            },
            _initScroll = function () {

                if ( _window.width() >= 768 ){

                    _obj.niceScroll( {
                        cursorcolor: "#45b8c7",
                        cursorwidth: "10",
                        cursorborder: "none",
                        cursorborderradius: "0",
                        autohidemode: false,
                        background: "#445669"
                    } );

                } else {

                    _obj.niceScroll( {
                        cursorcolor: "#45b8c7",
                        cursorwidth: "5",
                        cursorborder: "none",
                        cursorborderradius: "0",
                        autohidemode: false,
                        background: "#445669"
                    } );

                }

            },
            _loadData = function ( data, num ) {

                _curLinksWrap.empty();

                var arr = data.items,
                    number = arr.length;

                for ( var i = 0; i < number; i++ ){

                    if ( i == 0 ){
                        _curLinksWrap.html( '<a href="'+ arr[i].href +'" class="links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    } else {
                        _curLinksWrap.append( '<a href="'+ arr[i].href +'" class="links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    }

                }

                if ( data == undefined || data.items == undefined || data.items.length == 0 ) {

                    _curLinksWrap.find( '.search__popup-title' ).hide( 300 );
                    _linksNoResults.show( 300 );

                } else {

                    _curLinksWrap.find( '.search__popup-title' ).show( 300 );
                    _linksNoResults.hide( 300 );

                };

                _linkWrapBonus.removeClass( 'load' );

            },
            _init = function() {
                _showLessLinks( 0 );
                _uploadAsideHeight();

                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

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

                if ( _window.scrollTop() > 75 ){
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
            _bonusItem = _obj.find( '.bonus__item' ),
            _bonusMinimizeItem = _obj.find( '.bonus__item-minimize' ),
            _bonusNotResult = _obj.find( '.bonus__not-result' ),
            _positionMobileWindow = 0,
            _body = $( 'body, html' ),
            _window = $( window ),
            _loadFlag = true,
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _window.on( {
                    scroll: function() {

                        if ( _obj.hasClass( 'bonus_auto-load' ) && _window.scrollTop() + _window.height() >= _obj.offset().top + _obj.height() - 10 ) {

                            if ( _loadFlag ){
                                _ajaxRequest();
                            }

                        }

                    }
                } );

                _body.on(
                    'click', function ( e ) {

                        var bonusPopup = _obj.find( '.popup' ),
                            openPopup = _obj.find( '.popup__open' );

                        if ( $( e.target ).closest( bonusPopup ).length == 0 ){
                            _hidePopup();
                        }

                    }
                );

                _bonusMinimizeItem.on(
                    'click', function ( ) {

                        var curBtn = $( this ),
                            curParent = curBtn.parents( '.bonus__item' );

                        if ( !curParent.hasClass( 'hide' ) ) {

                            var curHead = curParent.find( '.bonus__header' );

                            curParent.addClass( 'hide' );
                            curParent.css( 'height', curHead.outerHeight() );

                        } else {

                            curParent.removeClass( 'hide' );
                            curParent.css( 'height', curParent.attr( 'data-height' ) );

                            setTimeout( function () {

                                var centerCurParent = curParent.offset().top + curParent.outerHeight() / 2,
                                    centerBody = _window.height() / 2;

                                _body.animate( { scrollTop : centerCurParent - centerBody }, 500, 'swing' )

                            }, 300 )

                        }

                        return false;

                    }
                );

            },
            _ajaxRequest = function(){

                _obj.addClass( 'load' );
                _loadFlag = false;

                _request = $.ajax( {
                    url: _obj.data( 'link' ),
                    data: {
                        loadedCount: 5
                    },
                    dataType: 'html',
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
            _ajaxPopupRequest = function( element ){

                var curElemetn = element,
                    curParentElemetn = curElemetn.parents( '.bonus__item' ),
                    curElemtnType = curElemetn.attr( 'data-type' ),
                    curElemtnLink = curElemetn.attr( 'data-link' );

                _request = $.ajax( {
                    url: 'php/popups.php',
                    data: {
                        loadedType: curElemtnType,
                        loadedLink: curElemtnLink
                    },
                    dataType: 'html',
                    type: 'GET',
                    success: function ( data ) {

                        _loadPopup( curParentElemetn, curElemetn, data );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

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
            _initPopups = function() {

                var items = _obj.find( '.bonus__item' ),
                    popupBtn = items.find( '.popup__open' );

                popupBtn.on( 'click', function () {

                    _hidePopup();

                    var curBtn = $( this );

                    _ajaxPopupRequest( curBtn );
                    return false;

                } );

            },
            _loadPopup = function ( box, btn, data ) {

                var curBox = box,
                    curBtn = btn,
                    arr = data;

                curBox.append( arr );

                var curPopup = curBox.find( '.popup' ),
                    bonusPopupClose = curPopup.find( '.popup__close' );

                if ( curPopup.attr( 'data-type' ) == 'bonus' ){

                    curPopup.addClass( 'show' );

                    var popupTabsLink = curPopup.find( '.popup__tabs-links a' ),
                        popupTabsContent = curPopup.find( '.popup__tabs-content' ),
                        popupTabsContentItem = curPopup.find( '.popup__tabs-content div' );

                    popupTabsLink.removeClass( 'active' );
                    popupTabsContentItem.removeClass( 'active' );

                    popupTabsLink.eq( 0 ).addClass( 'active' );
                    popupTabsContentItem.eq( 0 ).addClass( 'active' );
                    popupTabsContent.css( 'height', popupTabsContentItem.filter( '.active' ).height() );

                    if ( _window.width() < 768 ){

                        _positionMobileWindow = _window.scrollTop();

                        _body.css( 'overflow-y', 'hidden' );

                    } else if  ( _window.width() >= 768 ) {

                        curPopup.css ( {
                            'top' : curBtn.offset().top - curBtn.height() - curPopup.height() - 20,
                            'left': _obj.offset().left
                        } );

                    }

                    popupTabsLink.on( {
                        'click': function () {

                            var curBtn = $( this ),
                                tabs = curBtn.parents( '.popup__tabs' ),
                                tabsLinks = tabs.find( '.popup__tabs-links a' ),
                                tabsContent = tabs.find( '.popup__tabs-content > div' ),
                                popupTabsContent = tabs.find( '.popup__tabs-content' ),
                                bonusSwiper = tabs.find( '.popup__swiper' ),
                                swiperNextButton = tabs.find( '.popup__button-next' ),
                                swiperPrevButton = tabs.find( '.popup__button-prev' ),
                                popupSwiper;

                            tabsContent.removeClass( 'active' );
                            tabsLinks.removeClass( 'active' );

                            popupSwiper = new Swiper ( bonusSwiper, {
                                autoplay: false,
                                speed: 500,
                                effect: 'slide',
                                slidesPerView: 2,
                                spaceBetween: 8,
                                loop: false,
                                nextButton: swiperNextButton,
                                prevButton: swiperPrevButton,
                                breakpoints: {
                                    768: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                }
                            } );

                            curBtn.addClass( 'active' );
                            tabsContent.eq( curBtn.index() ).addClass( 'active' );
                            popupTabsContent.css( 'height', tabsContent.filter( '.active' ).height() );

                            return false;

                        }
                    } );

                }
                else if ( curPopup.attr( 'data-type' ) == 'warning' ) {

                    curPopup.addClass( 'show' );

                    if ( _window.width() < 768 ){

                        _positionMobileWindow = _window.scrollTop();

                        _body.css( 'overflow-y', 'hidden' );

                    } else if  ( _window.width() >= 768 ) {

                        curPopup.css ( {
                            'top' : curBtn.offset().top - curBtn.height() - curPopup.height() - 20,
                            'left': _obj.offset().left
                        } );

                    }

                }
                else if ( curPopup.attr( 'data-type' ) == 'game' ) {

                    curPopup.addClass( 'show' );

                    if ( _window.width() < 768 ){

                        _positionMobileWindow = _window.scrollTop();

                        _body.css( 'overflow-y', 'hidden' );

                    } else if  ( _window.width() >= 768 ) {

                        curPopup.css ( {
                            'top' : _window.height() / 2 - curPopup.height() / 2,
                            'left': _window.width() / 2 - curPopup.width() / 2
                        } );

                    }

                }
                else if ( curPopup.attr( 'data-type' ) == 'comments' ) {

                    curPopup.addClass( 'show' );

                    if ( _window.width() < 768 ){

                        _positionMobileWindow = _window.scrollTop();

                        _body.css( 'overflow-y', 'hidden' );

                    } else if  ( _window.width() >= 768 ) {

                        curPopup.css ( {
                            'top' : curBtn.offset().top - curBtn.height() - curPopup.height() + 10,
                            'left': _obj.offset().left
                        } );

                    }

                }

                bonusPopupClose.on(
                    'click', function ( ) {
                        _hidePopup();
                        return false;
                    }
                );

            },
            _hidePopup = function () {

                var _bonusPopup = _obj.find( '.popup' );

                if ( _window.width() < 768 ){

                    _body.css( 'overflow-y', 'auto' );
                    _body.scrollTop( _positionMobileWindow );

                }

                _bonusPopup.removeClass( 'show' );

                setTimeout( function () {
                    _bonusPopup.remove();
                }, 300 );

            },
            _loadData = function ( data ) {

                var arr = data;

                _obj.prepend( data );
                _obj.removeClass( 'load' );

                if ( arr == 0 || arr == null ){
                    _bonusNotResult.show( 300 );
                    return false;
                }

                _initSlider();
                _initPopups();
                _minimizeAllItems();

                _loadFlag = true;

            },
            _minimizeAllItems = function () {

                if ( !_obj.hasClass( 'bonus_minimize' ) ){
                    return false;
                }

                _bonusItem.each( function () {

                    var curElem = $( this ),
                        curHead = curElem.find( '.bonus__header' );

                    curElem.addClass( 'hide' );

                    if ( _window < 768 ) {
                        curElem.attr( 'data-height', curElem.outerHeight() + 10 );
                    } else {
                        curElem.attr( 'data-height', curElem.outerHeight() + 20 );
                    }

                    curElem.css( 'height', curHead.outerHeight() );

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

    var Filter = function( obj ) {

        //private properties
        var _obj = obj,
            _filterFrame = _obj.find( '.filter__frame' ),
            _filterBtn = _obj.find( '.filter__frame-btn' ),
            _filterPopup = _obj.find( '.filter__popup' ),
            _filterItem = _filterPopup.find( 'label' ),
            _filterCheckbox = _filterItem.find( 'input' ),
            _filterSort = _obj.find( '.filter__sort' ),
            _filterSortBtn = _filterSort.find( '.filter__sort-select' ),
            _filterSortPopup = _filterSort.find( '.filter__sort-popup' ),
            _filterSortItem = _filterSort.find( 'label' ),
            _filterSortRadio = _filterSortItem.find( 'input' ),
            _body = $( 'html, body' ),
            _window = $( window );

        //private methods
        var _onEvent = function() {

                _body.on(
                    'click', function ( e ) {

                        if ( $( e.target ).closest( _filterBtn ).length != 0  ){
                            _hideSortPopup();
                            return false;
                        }

                        if ( $( e.target ).closest( _filterPopup ).length == 0 ){
                            _hideFilterPopup();
                        }

                        if ( $( e.target ).closest( _filterSort ).length == 0 ){
                            _hideSortPopup();
                        }

                    }
                );

                _filterBtn.on( 'click', function () {

                    var curElem = $( this );

                    if ( !curElem.hasClass( 'close' ) ){
                        _showFilterPopup();
                    } else {
                        _hideFilterPopup();
                    }

                } );

                _filterSortBtn.on( 'click', function () {

                    if ( _filterSort.hasClass( 'show' ) ){
                        _hideSortPopup();
                    } else {
                        _showSortPopup();
                    }

                } );

                _filterCheckbox.on( 'click', function () {

                    _illuminationItem();

                } );

                _filterSortRadio.on( 'change', function () {
                    _illuminationFilterItem();

                } );

            },
            _showSortPopup = function() {

                _filterSort.addClass( 'show' );

            },
            _hideSortPopup = function() {

                _filterSort.removeClass( 'show' );

            },
            _showFilterPopup = function() {

                _filterBtn.addClass( 'close' );
                _filterPopup.addClass( 'show' );

            },
            _hideFilterPopup = function() {

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
            _illuminationFilterItem = function() {

                _filterSortItem.each( function () {

                    var curElem = $( this ),
                        curCheckbox = curElem.find( 'input' );

                    if ( curCheckbox.is(" :checked ") ){
                        curElem.addClass( 'illumination' );

                        _filterSortBtn.html( curElem.text() )

                        /*if ( _window.width() >= 1200 ){
                            _filterSortBtn.html( curElem.text() )
                        }*/

                    } else {
                        curElem.removeClass( 'illumination' );
                    }

                } );

                if ( _filterSortItem.first().hasClass( 'illumination' ) ) {
                    _filterSortPopup.addClass( 'gray' );
                } else {
                    _filterSortPopup.removeClass( 'gray' );
                }

                var illumination = _filterSortPopup.find( '.illumination' );

            },
            _init = function() {
                _illuminationItem();
                _illuminationFilterItem();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var FormValidator = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _fields = _obj.find( '[data-required]' );

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _addNotTouchedClass = function () {

                _fields.each( function() {

                    var curItem = $(this);

                    if( curItem.val() === '' ){

                        curItem.addClass( 'not-touched' );

                        _validateField( curItem );

                    }

                } );

            },
            _onEvents = function () {
                _fields.on( {
                    focus: function() {

                        $( this ).removeClass( 'not-touched' );

                    },
                    keyup: function() {

                        var curItem = $(this);

                        _validateField( curItem );

                    }
                } );
                _obj.on( {
                    submit: function() {

                        _addNotTouchedClass();

                        if( _fields.hasClass('not-touched') || _fields.hasClass('not-valid') ) {

                            _obj.find('.not-touched:first').focus();
                            _obj.find('.not-valid:first').focus();
                            return false;

                        } else {

                            return true;

                        }
                    }
                } );

            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.removeClass( 'valid' );
            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _validateField = function ( field ) {
                var type = field.attr( 'type'),
                    tagName = field[0].tagName;

                if( type === 'email' || type === 'text' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                if( type === 'email' ){
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                }


                if( tagName.toLocaleLowerCase() == 'textarea' ){

                    if( field.val() === '' || field.val().length < 80 ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                _makeValid( field );
            };

        //public properties

        //public methods
        _self.checkValid = function () {
            var valid = true;

            _fields.each( function () {
                $( this ).removeClass( 'not-touched' );
                if( $( this ).hasClass( 'not-valid' ) ){
                    valid = false;

                }
            } );

            return valid;
        };

        _constructor();
    };

    var InfoPanel = function( obj ) {

        //private properties
        var _obj = obj,
            _btnShowInfo = _obj.find( '.info__btn-open' ),
            _infoFrame = _obj.find( '.info__frame' ),
            _infoSubFrame = _obj.find( '.info__sub-frame' ),
            _body = $( 'body, html' ),
            _window = $( window );

        //private methods
        var _onEvent = function() {

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
                _btnShowInfo.addClass( 'checker' );
                _infoFrame.addClass( 'show' );
                _infoSubFrame.addClass( 'show' );
            },
            _hidePanelOnMobile = function () {
                _btnShowInfo.removeClass( 'checker' );
                _infoFrame.removeClass( 'show' );
                _infoSubFrame.removeClass( 'show' );
            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

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
            _btnCancel = _obj.find( '.search__btn-cancel' ),
            _body = $( 'html, body' ),
            _window = $( window ),
            _loadNewContent = true,
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

                        _ajaxRequest();

                    },
                    'keyup': function( e ) {
                        if( e.keyCode == 27 ){

                        } else if( e.keyCode == 40 ){

                        } else if( e.keyCode == 38 ){

                        } else if ( e.keyCode == 13 ) {

                        } else {

                            var searchPopup = _obj.find( '.search__popup' );
                            searchPopup.addClass( 'load' );
                            _ajaxRequest();
                        }
                    }
                } );

            },
            _ajaxRequest = function(){

                _request = $.ajax( {
                    url: _obj.data( 'link' ),
                    data: {
                        value: _searchInput.val(),
                        loadedCount: _searchInput.val().length
                    },
                    dataType: 'html',
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

                var searchPopup = _obj.find( '.search__popup' );

                _searchForm.addClass( 'increase' );

                searchPopup.addClass( 'show' );
                searchPopup.removeClass( 'load' );

            },
            _reduceSearch = function () {

                var searchPopup = _obj.find( '.search__popup' );

                searchPopup.removeClass( 'show' );

                setTimeout( function () {
                    _searchForm.removeClass( 'increase' );
                }, 300 );

            },
            _showPopup = function () {

                var searchPopup = _obj.find( '.search__popup' );

                searchPopup.addClass( 'show' );

                searchPopup.css( {
                    'left': _btnShowMobile.offset().left * -1 + 10,
                    'width': _body.width() - 35
                } );

                searchPopup.removeClass( 'load' );

            },
            _hidePopup = function () {

                var searchPopup = _obj.find( '.search__popup' );

                searchPopup.remove( );

                _loadNewContent = true;

            },
            _searchMoreLink = function () {

                var searchPopup = _obj.find( '.search__popup' ),
                    searchLinksResults =  searchPopup.find( '.search__popup-links' );

                if ( _searchInput.val().length > 0 ) {
                    searchLinksResults.find( 'span' ).html( _searchInput.val() );
                };

            },
            _showPanelOnMobile = function () {

                _searchForm.addClass( 'show' );
                _searchForm.css( {
                    'left': _btnShowMobile.offset().left * -1,
                    'width': _body.outerWidth()
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

                if ( _loadNewContent ){

                    _obj.append( '<div class="search__popup load"><div class="search__preload"><div class="search__preload-element"></div></div></div>' )

                }

                var searchPopup = _obj.find( '.search__popup' ),
                    arr = data;

                if ( _loadNewContent ){

                    searchPopup.prepend( data );
                    _loadNewContent = false;

                } else {

                    searchPopup.empty();
                    searchPopup.append( '<div class="search__preload"><div class="search__preload-element"></div></div>' );
                    searchPopup.prepend( data );

                }

                var searchUpdate = searchPopup.find( '.search__popup-update' );

                _illumination();
                _searchMoreLink();

                if (_body.width() < 1200) {
                    _showPopup();
                } else if (_body.width() >= 1200) {
                    _increaseSearch();
                }

                searchUpdate.on (
                    'click', function () {

                        _searchForm[0].reset();
                        _ajaxRequest();

                        return false;

                    }
                );

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
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

} )();
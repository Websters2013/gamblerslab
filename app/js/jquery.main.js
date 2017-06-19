( function(){

    "use strict";

    $( function(){

        $.each( $( '.anchor' ), function() {
            new Anchor( $( this ) );
        } );

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

        $.each( $('.casino-info__content'), function () {

            new CasinoInfo( $(this) );

        } );

    } );

    var Anchor = function ( obj ) {
        var _obj = obj,
            _window = $( 'html, body' );

        var _onEvents = function() {

                _obj.on( {
                    click: function() {

                        _window.animate( {
                            scrollTop: $( $.attr(this, 'href') ).offset().top
                        }, 600);

                        return false;
                    }
                } );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var AsideMenu = function( obj ) {

        //private properties
        var _obj = obj,
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
            _body = $( 'body' ),
            _html = $( 'html' ),
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

                        if (_window.scrollTop() >= _objTopPosition) {
                            _fixedDesktopAside();
                        } else if (_window.scrollTop() < _objTopPosition) {
                            _unfixedDesktopAside();
                        } else if ( _linkWrapBonus.hasClass( 'active' ) && _window.width() < 1200 ) {
                            _uploadAsideHeight();
                            _curLinksWrap.getNiceScroll().resize();
                            console.log( '_hideBonusSearch' );
                        } else if ( _obj.hasClass( 'show' ) && _window.width() < 1200 ) {
                            _hideMobileAside();
                            console.log( '_hideMobileAside' );
                        }

                    }
                } );

                _mobileBtnOpen.on (
                    'click', function () {

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

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _mobileBtnOpen ).length != 0  ){
                            return false;
                        }

                        if ( _linkWrapBonus.hasClass( 'active' ) && $( e.target ).closest( _obj ).length == 0 ){
                            _hideBonusSearch();
                            console.log( '_hideBonusSearch' );
                        }

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _window.width() <= 1200 ){
                            _hideMobileAside();
                            console.log( '_hideMobileAside' );
                        }

                        if ( _moreLinksBtn.hasClass( 'hide-links' ) && $( e.target ).closest( _lessLinksBox ).length == 0 ){
                            _showLessLinks( 0 );
                            _moreLinksBtn.removeClass( 'hide-links' );
                            _moreLinksBtn.html( 'Show More' );
                            console.log( '_showLessLinks' );
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
                        return false;
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
                );

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
                    curBoxLinks = curLinksWrap.find( '.links__item' ),
                    sumHeight = 0;

                curElement.addClass( 'hide-links' );
                curElement.html( 'Show Less' );

                for ( var i = 0; i < curBoxLinks.length; i++ ){

                    var sumHeight = sumHeight + curBoxLinks.eq( i ).outerHeight();

                }

                curLinksWrap.css( 'height', sumHeight );

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
                _html.css( 'overflow-y', 'hidden' );

                setTimeout( function () {
                    _initScroll();
                }, 300 )

                _uploadAsideHeight();

            },
            _hideMobileAside = function() {

                _mobileBtnOpen.removeClass( 'close' );

                _obj.removeClass( 'show' );

                _html.css( 'overflow-y', 'auto' );

                _hideBonusSearch();

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
            _bonusInsert = _obj.find( '.bonus__insert' ),
            _bonusNotResult = _obj.find( '.bonus__not-result' ),
            _btnLoadMore = _obj.find( '.casino-offers__more' ),
            _positionMobileWindow = 0,
            _body = $( 'body' ),
            _html = $( 'html' ),
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
                            popupMoreInfoPopup = bonusPopup.find( '.popup__welcome-more-popup' ),
                            innerPopup = _obj.find( '.popup_inner' );

                        if ( bonusPopup.length > 0 && $( e.target ).closest( bonusPopup ).length == 0 ){
                            _hidePopup();
                            console.log( '_hidePopup' );
                        }

                        if ( innerPopup.length > 0 && $( e.target ).closest( innerPopup ).length == 0 ){
                            innerPopup.removeClass( 'show' );
                            console.log( '_hidePopup' );
                        }

                        if ( popupMoreInfoPopup.hasClass( 'show' ) && $( e.target ).closest( popupMoreInfoPopup ).length == 0 ){

                            popupMoreInfoPopup.removeClass( 'show' );

                            setTimeout( function () {
                                popupMoreInfoPopup.remove();
                            }, 300 );

                            console.log( 'popupMoreInfoPopup' );
                        }

                    }
                );

                _btnLoadMore.on(
                    'click', function ( e ) {

                        _ajaxRequest();
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
            _ajaxPopupRequest = function( element, inner ){

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

                        _loadPopup( curParentElemetn, curElemetn, data, inner );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _initSlider = function() {

                var bonusBox = _obj.find( '.bonus__item' ),
                    bonusSlider = bonusBox.find( '.bonus__slider' ).filter( '.new' );

                bonusSlider.each( function () {

                    var curItem = $( this ),
                        bonusItem = curItem.find( '.bonus__slide' ),
                        curParents = curItem.parents( '.bonus__item' );

                    curItem.removeClass( 'new' );

                    if ( bonusItem.length > 1 ){

                        var bonusSwiper = curItem.find( '.bonus__swiper' ),
                            swiperPagination = $( '<div class="bonus__pagination"></div>' ),
                            swiperNextButton = $( '<div class="bonus__button-next"></div>' ),
                            swiperPrevButton = $( '<div class="bonus__button-prev"></div>' ),
                            bonus;

                        curItem.append( swiperPagination );
                        curItem.append( swiperNextButton );
                        curItem.append( swiperPrevButton );

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
                    popupBtn = items.find( '.popup__open' ),
                    popupMobileBtn =  items.find( '.popup__open-mobile' );

                popupBtn.on( 'click', function () {

                    var curBtn = $( this );

                    if ( curBtn.hasClass( 'busy' ) ){

                        curBtn.removeClass( 'busy' );
                        _hidePopup();

                    } else {

                        _hidePopup();

                        curBtn.addClass( 'busy' );

                        var curBtn = $( this );
                        _ajaxPopupRequest( curBtn, 0 );
                    }

                } );

                popupMobileBtn.on( 'click', function () {

                    var curBtn = $( this );

                    if ( _window.width() < 768 ){

                        console.log(popupMobileBtn)

                        _ajaxPopupRequest( curBtn, 0 );

                    }

                } );

                return false;

            },
            _loadPopup = function ( box, btn, data, inner ) {

                var curBox = box,
                    curBtn = btn,
                    arr = data,
                    inside = inner,
                    curElemtnType = curBtn.attr( 'data-type' ),
                    curElemtnLink = curBtn.attr( 'data-link' );

                curBox.append( arr );

                var curPopup = curBox.find( '.popup' ).filter( "[data-type="+ curElemtnType +"]" ).filter( "[data-link="+ curElemtnLink +"]" ),
                    bonusPopupClose = curPopup.find( '.popup__close' );

                if ( inside > 0 ){
                    curPopup.addClass( 'popup_inner' );
                }

                if ( curPopup.attr( 'data-type' ) == 'bonus' ){

                    _positionPopup( curPopup, curBtn );

                    var popupTabsLink = curPopup.find( '.popup__tabs-links a' ),
                        popupTabsContent = curPopup.find( '.popup__tabs-content' ),
                        popupTabsContentItem = curPopup.find( '.popup__tabs-content div' ),
                        popupMoreInfoBtn = curPopup.find( '.popup__welcome-more' );

                    popupTabsLink.removeClass( 'active' );
                    popupTabsContentItem.removeClass( 'active' );

                    popupTabsLink.eq( 0 ).addClass( 'active' );
                    popupTabsContentItem.eq( 0 ).addClass( 'active' );
                    popupTabsContent.css( 'height', popupTabsContentItem.filter( '.active' ).height() );

                    popupTabsLink.on( 'click', function () {

                            var curTab = $( this ),
                                tabs = curTab.parents( '.popup__tabs' ),
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

                            curTab.addClass( 'active' );
                            tabsContent.eq( curTab.index() ).addClass( 'active' );
                            popupTabsContent.css( 'height', tabsContent.filter( '.active' ).height() );

                            if  ( _window.width() >= 768 ) {
                                _positionPopup( curPopup, curBtn );
                            }

                            return false;

                        }
                    );

                    popupMoreInfoBtn.on( 'click', function () {

                        var curBtn = $( this ),
                            curBtnId = curBtn.data( 'id' ),
                            curParent = curBtn.parents( '.popup__welcome' ),
                            popupMoreInfoPopup = curParent.find( '.popup__welcome-more-popup' ),
                            curPopupMoreInfoPopup = popupMoreInfoPopup.filter( '[data-id='+ curBtnId +']' );

                        if ( !curPopupMoreInfoPopup.hasClass( 'show' ) ) {

                            popupMoreInfoPopup.removeClass( 'show' )
                            curPopupMoreInfoPopup.addClass( 'show' );

                            curPopupMoreInfoPopup.css( {
                                top: curBtn.offset().top - curParent.offset().top - popupMoreInfoPopup.outerHeight() - 8,
                                left: curBtn.offset().left + curBtn.outerWidth() / 2 - curParent.offset().left - popupMoreInfoPopup.outerWidth() / 2
                            } );

                        } else {

                            curPopupMoreInfoPopup.removeClass( 'show' );

                        }

                        return false;

                    } )

                    var popupBtn = curPopup.find( '.popup__open' );

                    popupBtn.on( 'click', function () {

                        var curBtn = $( this );

                        _ajaxPopupRequest( curBtn, 1 );

                    } );

                }
                else if ( curPopup.attr( 'data-type' ) == 'comments' ) {

                    _positionPopup( curPopup, curBtn );

                    curPopup.find( '.comments' ).each( function() {
                        new AddComments ( $( this ) );
                        new LabelForm( $(this) );
                    } );

                    curPopup.find( '.validation-form' ).each( function() {
                        new FormValidator ( $( this ) );
                    } );

                    if ( _window.width() >= 768 ) {

                        var commentsWrap = curBox.find( '.comments__wrap' ),
                            commentsItem = commentsWrap.find( '.comments__item' );

                        commentsWrap.css( 'height', commentsItem.eq( 0 ).outerHeight() + commentsItem.eq( 2 ).outerHeight() + 21 )

                        commentsWrap.niceScroll( {
                            cursorcolor: "#abb1b9",
                            cursorwidth: "6",
                            cursorborder: "none",
                            cursorborderradius: "0",
                            autohidemode: false,
                            background: "#f2f2f2"
                        } );

                    }

                }
                else if ( curPopup.attr( 'data-type' ) == 'game' ) {

                    if ( _window.width() < 768 ){

                        _positionMobileWindow = _window.scrollTop();
                        _html.css( 'overflow-y', 'hidden' );

                        curBox.append( '<div class="popup__back"></div>' );
                        curPopup.addClass( 'show' );

                    } else if  ( _window.width() >= 768 ) {

                        setTimeout( function () {

                            _html.css( 'overflow-y', 'hidden' );

                            curPopup.css ( {
                                'top' : _window.scrollTop() + _window.outerHeight() / 2 - curPopup.outerHeight() / 2,
                                'left': _obj.offset().left + ( _obj.outerWidth() - curPopup.outerWidth() ) / 2
                            } );

                            var centerCurParent = curPopup.offset().top + curPopup.outerHeight() / 2,
                                centerBody = _window.height() / 2;

                            curBox.append( '<div class="popup__back"></div>' );
                            curPopup.addClass( 'show' );

                        }, 300 );

                    }

                }
                else if ( curPopup.attr( 'data-type' ) == 'warning' ) {

                    _positionPopup( curPopup, curBtn );

                }

                bonusPopupClose.on(
                    'click', function ( ) {
                        _hidePopup();
                        return false;
                    }
                );

            },
            _positionPopup = function ( box, btn ) {

                var curPopup = box,
                    curBtn = btn;

                if ( _window.width() < 768 ){

                    _positionMobileWindow = _window.scrollTop();
                    _html.css( 'overflow-y', 'hidden' );

                    curPopup.addClass( 'show' );

                } else if  ( _window.width() >= 768 ) {

                    setTimeout( function () {

                        curPopup.css ( {
                            'top' : curBtn.offset().top - curPopup.outerHeight() - 10,
                            'left': _obj.offset().left
                        } );

                        if ( curPopup.offset().top < 0 ){

                            curPopup.css ( {
                                'top': 0
                            } );
                        }

                        var centerCurParent = curPopup.offset().top + curPopup.outerHeight() / 2,
                            centerBody = _window.height() / 2;

                        _body.animate( { scrollTop : centerCurParent - centerBody }, 500, 'swing' );

                        curPopup.addClass( 'show' );

                    }, 300 );

                }

            },
            _hidePopup = function () {

                var bonusItem = _obj.find( '.bonus__item' ),
                    busyBtn = bonusItem.find( '.busy' ),
                    busyBack = bonusItem.find( '.popup__back' ),
                    bonusPopup = bonusItem.find( '.popup' );

                busyBtn.removeClass( 'busy' );

                if ( bonusPopup.length < 1 ){
                    return false;
                }

                _html.css( 'overflow-y', 'auto' );

                if ( _window.width() < 768 ){
                    _html.css( 'overflow-y', 'auto' );
                    _html.scrollTop( _positionMobileWindow );
                }

                busyBack.remove();
                bonusPopup.removeClass( 'show' );

                setTimeout( function () {
                    bonusPopup.remove();
                }, 300 );

            },
            _loadData = function ( data ) {

                var arr = data;

                _bonusInsert.append( data );
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

                var bonusItem = _obj.find( '.bonus__item' ).filter( '.new' ),
                    bonusMinimizeItem = bonusItem.find( '.bonus__item-minimize' );

                bonusItem.each( function () {

                    var curElem = $( this ),
                        bonusItemBody = curElem.find( '.bonus__body' ),
                        curHead = curElem.find( '.bonus__header' );

                    setTimeout( function () {

                        bonusItemBody.attr( 'data-height', bonusItemBody.outerHeight() );

                        curElem.removeClass( 'new' );
                        curElem.addClass( 'hide' );

                        bonusItemBody.css( 'height', 0 );

                    }, 300 );

                } );

                bonusMinimizeItem.on(
                    'click', function ( ) {

                        var curBtn = $( this );

                        _minimizeEvent( curBtn );
                        return false;

                    }
                );

            },
            _minimizeEvent = function ( e ) {

                var curBtn = e,
                    curParent = curBtn.parents( '.bonus__item' ),
                    bonusItemBody = curParent.find( '.bonus__body' );

                if ( !curParent.hasClass( 'hide' ) ) {

                    curParent.addClass( 'hide' );
                    curParent.removeClass( 'show' );
                    bonusItemBody.css( 'height', 0 );

                } else {

                    curParent.removeClass( 'hide' );
                    curParent.addClass( 'show' );
                    bonusItemBody.css( 'height', bonusItemBody.attr( 'data-height' ) );

                    setTimeout( function () {

                        var centerCurParent = curParent.offset().top + curParent.outerHeight() / 2,
                            centerBody = _window.height() / 2;

                        _body.animate( { scrollTop : centerCurParent - centerBody }, 500, 'swing' )

                    }, 300 )

                }

            },
            _init = function() {
                _ajaxRequest();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var CasinoInfo = function( obj ) {

        //private properties
        var _obj = obj,
            _content = _obj.find( '.casino-info__hide-text' ),
            _readMore = _obj.find( 'a' );

        //private methods
        var _onEvent = function() {

                _readMore.on( 'click', function () {

                    if ( _content.css( 'display' ) == 'block' ) {
                        _hideContent();
                    } else {
                        _showContent();
                    }

                    return false;

                } )

            },
            _showContent = function() {

                _content.slideDown( 300 );

            },
            _hideContent = function() {

                _content.slideUp( 300 );

            },
            _init = function() {
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

                _window.on(
                    'resize', function ( e ) {

                        if ( _filterPopup.hasClass( 'show' ) ){
                            _hideFilterPopup();
                        }

                        if ( _filterSort.hasClass( 'show' ) ){
                            _hideSortPopup();
                        }

                    }
                );

                _body.on(
                    'click', function ( e ) {

                        if ( _filterPopup.hasClass( 'show' ) && $( e.target ).closest( _filterFrame ).length == 0 ){
                            _hideFilterPopup();
                            console.log( '_hideFilterPopup' );
                        }

                        if ( _filterSort.hasClass( 'show' )&& $( e.target ).closest( _filterSort ).length == 0 ){
                            _hideSortPopup();
                            console.log( '_hideSortPopup' );
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
            _init = function() {
                _illuminationItem();
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
            _valueFlag = false,
            _fields = _obj.find( '[data-required]' );

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;

                if ( _fields.val().left > 0 ){
                    _valueFlag = true;
                }

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
                    focusout: function() {

                        var curItem = $(this);

                        if ( _fields.val().length > 0 ){
                            _valueFlag = true;
                        } else {
                            _fields.removeClass( 'not-valid' );
                            _valueFlag = false;
                        }

                        console.log(_valueFlag);

                        if ( _valueFlag ){
                            _validateField( curItem );
                        }

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

                        if ( _infoFrame.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 ){
                            _hidePanel();
                            console.log( '_hidePanel' );
                        }

                    }
                );

                _btnShowInfo.on (
                    'click', function () {

                        if ( !_infoFrame.hasClass( 'show' ) ) {
                            _showInfo();
                        } else {
                            _hidePanel();
                        }

                    }
                );

                _window.on (
                    'resize', function () {

                        if ( _infoFrame.hasClass( 'show' ) ) {
                            _hidePanelOnMobile();
                        }

                    }
                );

            },
            _showInfo = function () {
                _btnShowInfo.addClass( 'checker' );
                _infoFrame.addClass( 'show' );
                _infoSubFrame.addClass( 'show' );
            },
            _hidePanel = function () {
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

                            var searchPopup = _obj.find( '.search__popup' );

                            searchPopup.css( {
                                'left': _btnShowMobile.offset().left * -1 + 10,
                                'width': _body.outerWidth() - 20
                            } );

                        }

                    }
                );

                _body.on(
                    'click', function ( e ) {

                        if ( _searchForm.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _body.width() < 1200 ){
                            _hidePanelOnMobile();
                            _searchForm[0].reset();
                            console.log('_hidePanelOnMobile');
                        } else if ( $( '.search__popup' ).hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _body.width() >= 1200 ){
                            _reduceSearch();
                            _searchForm[0].reset();
                            console.log('_reduceSearch');
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
                    'width': _body.outerWidth() - 20
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
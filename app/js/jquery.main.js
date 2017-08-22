( function(){

    "use strict";

    $( function(){

        new Preload ( $( '#preload' ) );

        new BackToTop ( $( '#back-to-top' ) );

        new AsideMenu ( $( '#site__aside' ) );

        new SearchPanel ( $( '#search' ) );

        new InfoPanel ( $( '#info' ) );

        if ( $( '#anchor' ).length == 1 ){
            new Anchor( $( '#anchor' ) );
        };

        if ( $( '.bonus' ).length == 1 ){
            new BonusLoad( $( '.bonus' ) );
        };

        if ( $( '#bonus__single' ).length == 1 ){
            new BonusInitFunctions( $( '#bonus__single' ) );
        };

        if ( $( '#filter-bonus' ).length == 1 ){
            new Filter( $( '#filter-bonus' ) );
        };

        if ( $( '.validation-form' ).length == 1 ){
            new FormValidator( $( '.validation-form' ) );
        };

        if ( $( '#casino-info__content' ).length == 1 ){
            new CasinoInfo( $( '#casino-info__content' ) );
        };

        if ( $( '#comments' ).length == 1 ){
            new AddComments( $( '#comments' ) );
        };

        if ( $( '.site__form' ).length == 1 ){
            new LabelForm( $( '.site__form' ) );
        };

        if ( $( '#casino-bonuses' ).length == 1 ){
            new AjaxLoadContent( $( '#casino-bonuses' ) );
        };

        if ( $( '.bonus' ).length == 1 ){
            new BonusMinimize( $( '.bonus' ) );
        };

    } );

    var AjaxLoadContent = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find( '#casino-bonuses__more' ),
            _wrapper = _obj.find( '#casino-bonuses__items' ),
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
                                            <a href="'+ this.href +'" class="casino-bonuses__item hidden">\
                                                <h2 class="casino-bonuses__item-title">'+ this.title +'</h2>\
                                                <div class="casino-bonuses__footer">\
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
                    _showNewItems( $( this ), i );
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

                var items = _obj.find( '#casino-bonuses__items>div' );
                _request.abort();
                _request = $.ajax( {
                    url: 'php/search-results.php',
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
            _bonusShowAll = _obj.find( '#aside-links__show-all' ),
            _linkWrapBonus = _obj.find( '.aside-links_casinos-search' ),
            _curLinksScroll = _linkWrapBonus.find( '.aside-links__wrap' ),
            _curLinksWrap = _linkWrapBonus.find( '.aside-links__wrap > div' ),
            _linksNoResults = _linkWrapBonus.find( '#aside-links__no-results' ),
            _hideSearch = _linkWrapBonus.find( '#aside-links__back' ),
            _formSearch = _linkWrapBonus.find( '#aside-links__search' ),
            _btnCancel = _linkWrapBonus.find( '#aside-links__search-cancel' ),
            _searchInput = _obj.find( '#aside-links__search-input' ),
            _siteHeader = $( '#site__header' ),
            _mobileBtnOpen = $( '#mobile-btn' ),
            _lessLinksBox = _obj.find( '.aside-links_less' ),
            _moreLinksBtn = _lessLinksBox.find( '.aside-links__show-more' ),
            _body = $( 'body' ),
            _html = $( 'html' ),
            _site = $( '#site' ),
            _window = $( window ),
            _objTopPosition = _obj.offset().top,
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _window.on( {
                    'scroll': function () {

                        if (_window.scrollTop() >= _objTopPosition && _window.width() >= 1200 ) {
                            _fixedDesktopAside();
                        } else if (_window.scrollTop() < _objTopPosition && _window.width() >= 1200) {
                            _unfixedDesktopAside();
                        }

                        if ( _window.width() >= 768 && _window.width() <= 1200 ) {
                            _hideMobileAside();
                        }

                    },
                    'resize': function () {

                        if (_window.scrollTop() >= _objTopPosition) {
                            _fixedDesktopAside();
                        } else if (_window.scrollTop() < _objTopPosition) {
                            _unfixedDesktopAside();
                        } else if ( _linkWrapBonus.hasClass( 'active' ) && _window.width() < 1200 ) {
                            _uploadAsideHeight();
                        } else if ( _obj.hasClass( 'show' ) && _window.width() < 1200 ) {
                            _hideMobileAside();
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

                _site.on(
                    'click', function ( e ) {

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _mobileBtnOpen ).length != 0  ){
                            return false;
                        }

                        if ( _linkWrapBonus.hasClass( 'active' ) && $( e.target ).closest( _obj ).length == 0 ){
                            _hideBonusSearch();
                        }

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _window.width() <= 1200 ){
                            _hideMobileAside();
                        }

                        if ( _moreLinksBtn.hasClass( 'hide-links' ) && $( e.target ).closest( _lessLinksBox ).length == 0 ){
                            _showLessLinks( 0 );
                            _moreLinksBtn.removeClass( 'hide-links' );
                            _moreLinksBtn.html( 'Show More' );
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
                        return false;
                    }
                );

                _formSearch.on(
                    'submit', function( e ) {
                        e.preventDefault();
                    }
                );

                _searchInput.on(
                    'keyup', function( e ) {
                        if( e.keyCode == 27 ){

                        } else if( e.keyCode == 40 ){

                        } else if( e.keyCode == 38 ){

                        } else if ( e.keyCode == 13 ) {
                            return false;
                        } else {
                            _ajaxRequest( 1 );

                            if ( $( this ).val() == '' ){
                                _btnCancel.removeClass( 'visible' )
                            } else {
                                _btnCancel.addClass( 'visible' )
                            }

                        }
                    }
                );

                _btnCancel.on(
                    'click', function() {

                        _formSearch[0].reset();
                        _btnCancel.removeClass( 'visible' );

                        _ajaxRequest();

                        return false;

                    }
                );

            },
            _ajaxRequest = function( ){

                _linkWrapBonus.addClass( 'load' );

                _request = $.ajax( {
                    url: 'php/links.php',
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
                    curLinksWrap = curElement.prev( '.aside-links__wrap' ),
                    curBoxLinks = curLinksWrap.find( '.aside-links__item' ),
                    sumHeight = 0;

                curElement.addClass( 'hide-links' );
                curElement.html( 'Show Less' );

                for ( var i = 0; i < curBoxLinks.length; i++ ){

                    var sumHeight = sumHeight + curBoxLinks.eq( i ).outerHeight();

                }

                curLinksWrap.css( 'height', sumHeight );

            },
            _showLessLinks = function ( o ) {

                if ( o.length > 0 ){

                    var curElement = o;

                    _lessLinksBox = o.parents( '.aside-links_less' );

                    curElement.removeClass( 'hide-links' );
                    curElement.html( 'Show More' );

                }

                _lessLinksBox.each( function () {

                    var curBox = $( this ),
                        curWrap = curBox.find( '.aside-links__wrap' ),
                        viewNum = curWrap.data( 'show' ),
                        curBoxLinks = curBox.find( '.aside-links__item' );

                    for ( var i = 5; i < curBoxLinks.length; i++ ){

                        curBoxLinks.eq( i ).addClass( 'hide' );

                    }

                    curWrap.css( 'height', curBoxLinks.outerHeight() * viewNum );

                    setTimeout( function () {
                        curBoxLinks.removeClass( 'hide' );
                    }, 300 )

                } );

            },
            _showBonusSearch = function () {

                if ( _obj.hasClass( 'fixed' ) ){
                    _obj.css( 'height', _body.height() );
                } else {
                    _obj.css( 'height', _body.height() - _siteHeader.height() );
                }

                _obj.mCustomScrollbar( 'destroy' );
                _curLinksWrap.mCustomScrollbar();

                setTimeout( function () {
                    _linkWrapBonus.addClass( 'active' );
                }, 100 )

                _ajaxRequest();

            },
            _hideBonusSearch = function () {

                $( '#aside-links__search' )[0].reset();

                if ( _obj.hasClass( 'fixed' ) ){
                    _obj.css( 'height', _body.height() );
                } else {
                    _obj.css( 'height', _body.height() - _siteHeader.height() );
                }

                _linkWrapBonus.removeClass( 'active' );
                _btnCancel.removeClass( 'visible' );

                setTimeout( function () {
                    _initScroll();
                }, 300 )

            },
            _fixedDesktopAside = function () {
                _obj.addClass( 'fixed' );
                _obj.css( 'height', _body.height() );
            },
            _unfixedDesktopAside = function () {
                _obj.removeClass( 'fixed' );
                _obj.css( 'height', _body.height() - _siteHeader.height() );
            },
            _showMobileAside = function() {

                _mobileBtnOpen.addClass( 'close' );
                _obj.addClass( 'show' );

                if ( _window.width() < 768 ){
                    _body.css( 'overflow-y', 'hidden' );
                }

                _uploadAsideHeight();
                _initScroll();

            },
            _hideMobileAside = function() {

                _mobileBtnOpen.removeClass( 'close' );

                _obj.removeClass( 'show' );

                if ( _window.width() < 768 ){
                    _body.css( 'overflow-y', 'auto' );
                }

                _hideBonusSearch();

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

                _obj.mCustomScrollbar();

            },
            _loadData = function ( data, num ) {

                _curLinksWrap.empty();

                var arr = data.items,
                    number = arr.length;

                for ( var i = 0; i < number; i++ ){

                    if ( i == 0 ){
                        _curLinksWrap.html( '<a href="'+ arr[i].href +'" class="aside-links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
                    } else {
                        _curLinksWrap.append( '<a href="'+ arr[i].href +'" class="aside-links__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countBonuses +'</span></a>' );
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

                _curLinksScroll.mCustomScrollbar();

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
            _add = _obj.find('#comments__add'),
            _write = _obj.find('#comments__write'),
            _dom = $( 'html, body'),
            _commentBlock = _obj.find( '#contact-us' );

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
            _window = $( window ),
            _lastPos;

        //private methods
        var _onEvent = function() {

                _obj.on (
                    'click', function () {
                        _backToTop();
                    }
                );

                _window.on ( {
                    'DOMMouseScroll': function ( e ) {
                        var delta = e.originalEvent.detail;
                        if ( delta ) {
                            var direction = ( delta > 0 ) ? 1 : -1;
                            _checkScroll( direction );
                        }
                    },
                    'mousewheel': function ( e ) {
                        var delta = e.originalEvent.wheelDelta;
                        if ( delta ) {
                            var direction = ( delta > 0 ) ? -1 : 1;
                            _checkScroll( direction );
                        }
                    },
                    'touchmove': function ( e ) {
                        var currentPos = e.originalEvent.touches[0].clientY;
                        if ( currentPos > _lastPos ) {
                            _checkScroll( -1 );
                        } else if ( currentPos < _lastPos ) {
                            _checkScroll( 1 );
                        }
                        _lastPos = currentPos;
                    },
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
                    }
                } );

            },
            _backToTop = function() {

                _body.animate( { scrollTop : 0 }, 500, 'swing' )

            },
            _checkScroll = function ( direction ) {

                if( direction > 0 || _window.scrollTop() < 75 ) {
                    _hideBtn();
                }
                if( direction < 0 && _window.scrollTop() > 75 ) {
                    _showBtn();
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

    var BonusLoad = function( obj ) {

        //private properties
        var _obj = obj,
            _filter = $( '#filter-bonus' ),
            _filterInput = _filter.find( 'input:checked' ),
            _bonusInsert = _obj.find( '#bonus__insert' ),
            _bonusNotResult = _obj.find( '#bonus__not-result' ),
            _btnLoadMore = _obj.find( '#casino-offers__more' ),
            _window = $( window ),
            _body = $( 'body' ),
            _loadFlag = true,
            _arr = {},
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _btnLoadMore.on(
                    'click', function ( e ) {

                        _ajaxRequest();
                        return false;

                    }
                );

            },
            _setHeight = function () {

                var height = _obj.offset().top + $( '#pagination' ).outerHeight() - parseInt( _obj.css(  'margin-bottom' ) );

                _obj.css( 'min-height', $( '#site__content' ).outerHeight() - height )

            },
            _collectData = function () {

                _filterInput.each( function () {

                    var curElem = $( this ),
                        curElemName = curElem.attr( 'name' ),
                        curElemVal = curElem.val();

                    _arr[curElemName] = curElemVal;

                } );

                _ajaxRequest();

            },
            _ajaxRequest = function(){

                _obj.addClass( 'load' );
                _loadFlag = false;

                _request = $.ajax( {
                    url: 'php/bonuses.php',
                    data: {
                        loadedCount: 5,
                        filterCriterias: _arr
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
            _loadData = function ( data ) {

                var arr = data;

                _bonusInsert.append( arr );
                _obj.removeClass( 'load' );

                if ( arr == 0 || arr == null ){
                    _bonusNotResult.show( 300 );
                    return false;
                }

                if ( _obj.hasClass( 'bonus_minimize' ) ){
                    $( '.bonus_minimize' )[0].obj.minimize();
                };

                new BonusInitFunctions( $( '.bonus' ) );

                _loadFlag = true;

            },
            _init = function() {
                _setHeight();
                _collectData();
                _onEvent();
            };

        //public properties

        //public methods

        _init();

    };

    var BonusInitFunctions = function( obj ) {

        //private properties
        var _obj = obj,
            _positionMobileWindow = 0,
            _body = $( 'body' ),
            _html = $( 'html' ),
            _site = $( '#site' ),
            _casinoList = $( '.bonus__casinos' ).filter( '.new' ),
            _window = $( window ),
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _site.on(
                    'click', function ( e ) {

                        var bonusPopup = _obj.find( '.popup' ),
                            popupMoreInfoPopup = bonusPopup.find( '.popup__more-popup' ),
                            innerPopup = _obj.find( '.popup_inner' );

                        if ( bonusPopup.length > 0 && $( e.target ).closest( bonusPopup ).length == 0 ){
                            _hidePopup();
                        }

                        if ( innerPopup.length > 0 && $( e.target ).closest( innerPopup ).length == 0 ){
                            innerPopup.removeClass( 'show' );
                        }

                        if ( popupMoreInfoPopup.hasClass( 'show' ) && $( e.target ).closest( popupMoreInfoPopup ).length == 0 ){

                            popupMoreInfoPopup.removeClass( 'show' );

                        }

                    }
                );

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

                var items = _obj.find( '.bonus__item.new' ),
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

                    var contentRow = curPopup.find( '.popup__content-line' ),
                        popupTabsContent = curPopup.find( '#popup__tabs-content' ),
                        rowId = 0;

                    contentRow.each( function () {

                        var curRow = $( this ),
                            arrRow = curRow.text().split(',');

                        rowId = rowId + 1;

                        if ( arrRow.length > 6 ){

                            curRow.html( arrRow[0] +', ' );

                            for ( var i = 1; i <= 5; i++ ){
                                curRow.append( arrRow[i] +', ' );
                            }

                            curRow.append( '<a href="#" data-id="'+ rowId +'" class="popup__more-btn">More</a>' );
                            popupTabsContent.append( '<span class="popup__more-popup" data-id="'+ rowId +'">'+ arrRow.slice( 6, arrRow.length ) +'</span>' );

                        }

                    } );

                    var bonusSwiper = curPopup.find( '#popup__swiper' ),
                        swiperNextButton = curPopup.find( '#popup__button-next' ),
                        swiperPrevButton = curPopup.find( '#popup__button-prev' ),
                        popupSwiper;

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
                            }
                        }
                    } );

                    _positionPopup( curPopup, curBtn );

                    var popupTabsLink = curPopup.find( '#popup__tabs-links a' ),
                        popupTabsContentItem = curPopup.find( '#popup__tabs-content > div' ),
                        arrHeight = [];

                    popupTabsLink.removeClass( 'active' );
                    popupTabsContentItem.removeClass( 'active' );

                    popupTabsLink.eq( 0 ).addClass( 'active' );
                    popupTabsContentItem.eq( 0 ).addClass( 'active' );

                    popupTabsContent.css( 'height', popupTabsContentItem.eq( 0 ).outerHeight() );

                    popupTabsContentItem.each( function () {

                        var curTab = $( this );

                        arrHeight.push( curTab.outerHeight() );

                    } );

                    popupTabsContent.css( 'height', Math.max.apply( Math, arrHeight ) );

                    popupTabsContent.css( 'height', popupTabsContent );

                    popupTabsLink.on( 'click', function () {

                        var curTab = $( this ),
                            tabs = curTab.parents( '#popup__tabs' ),
                            tabsLinks = tabs.find( '#popup__tabs-links a' ),
                            tabsContent = tabs.find( '#popup__tabs-content > div' ),
                            popupMoreInfoPopup = curPopup.find( '.popup__more-popup' );

                        tabsContent.removeClass( 'active' );
                        tabsLinks.removeClass( 'active' );

                        curTab.addClass( 'active' );

                        tabsContent.eq( curTab.index() ).addClass( 'active' );

                        _positionPopup( curPopup, curBtn );

                        if ( popupMoreInfoPopup.hasClass( 'show' ) ){
                            popupMoreInfoPopup.removeClass( 'show' );
                        }

                        return false;

                    } );

                    var popupMoreInfoBtn = curPopup.find( '.popup__more-btn' );

                    popupMoreInfoBtn.on( 'click', function () {

                        var curBtn = $( this ),
                            curBtnId = curBtn.data( 'id' ),
                            curParent = curBtn.parents( '#popup__tabs-content > div' ),
                            popupMoreInfoPopup = popupTabsContent.find( '.popup__more-popup' ),
                            curPopupMoreInfoPopup = popupMoreInfoPopup.filter( '[data-id='+ curBtnId +']' );

                        if ( !curPopupMoreInfoPopup.hasClass( 'show' ) ) {

                            popupMoreInfoPopup.removeClass( 'show' );
                            curPopupMoreInfoPopup.addClass( 'show' );

                            curPopupMoreInfoPopup.css( {
                                top: curBtn.offset().top - popupTabsContent.offset().top - curPopupMoreInfoPopup.outerHeight() - 8,
                                left: curBtn.offset().left + curBtn.outerWidth() / 2 - popupTabsContent.offset().left - curPopupMoreInfoPopup.outerWidth() / 2
                            } );

                        } else {

                            curPopupMoreInfoPopup.removeClass( 'show' );

                        }

                        return false;

                    } );

                    var popupBtn = curPopup.find( '.popup__open' );

                    popupBtn.on( 'click', function () {

                        var curBtn = $( this );

                        _ajaxPopupRequest( curBtn, 1 );

                    } );

                }
                else if ( curPopup.attr( 'data-type' ) == 'comments' ) {

                    _positionPopup( curPopup, curBtn );

                    curPopup.find( '#comments' ).each( function() {
                        new AddComments ( $( this ) );
                        new LabelForm( $(this) );
                    } );

                    curPopup.find( '.validation-form' ).each( function() {
                        new FormValidator ( $( this ) );
                    } );

                    if ( _window.width() >= 768 ) {

                        var commentsWrap = curBox.find( '#comments__wrap' ),
                            commentsItem = commentsWrap.find( '.comments__item' );

                        commentsWrap.css( 'height', commentsItem.eq( 0 ).outerHeight() + commentsItem.eq( 2 ).outerHeight() + 21 )

                        commentsWrap.mCustomScrollbar();

                    }

                }
                else if ( curPopup.attr( 'data-type' ) == 'game' ) {

                    if ( _window.width() < 768 ){

                        _positionMobileWindow = _window.scrollTop();

                        if ( _window.width() < 768 ) {
                            _body.css('overflow-y', 'hidden');
                        }

                        curBox.append( '<div id="popup__back"></div>' );
                        curPopup.addClass( 'show' );

                    } else if  ( _window.width() >= 768 ) {

                        setTimeout( function () {

                            if ( _window.width() < 768 ) {
                                _body.css('overflow-y', 'hidden');
                            }

                            curPopup.css ( {
                                'top' : _window.scrollTop() + _window.outerHeight() / 2 - curPopup.outerHeight() / 2,
                                'left': _obj.offset().left + ( _obj.outerWidth() - curPopup.outerWidth() ) / 2
                            } );

                            var centerCurParent = curPopup.offset().top + curPopup.outerHeight() / 2,
                                centerBody = _window.height() / 2;

                            curBox.append( '<div id="popup__back"></div>' );
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

                    if ( _window.width() < 768 ) {
                        _body.css('overflow-y', 'hidden');
                    }

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
                    busyBack = bonusItem.find( '#popup__back' ),
                    bonusPopup = bonusItem.find( '.popup' );

                busyBtn.removeClass( 'busy' );

                if ( bonusPopup.length < 1 ){
                    return false;
                }

                if ( _window.width() < 768 ){
                    _body.css( 'overflow-y', 'auto' );
                    _html.scrollTop( _positionMobileWindow );
                }

                busyBack.remove();
                bonusPopup.removeClass( 'show' );

                setTimeout( function () {
                    bonusPopup.remove();
                }, 300 );

            },
            _minimizeCasinoList = function () {

                _casinoList.each( function () {

                    var curElem = $( this ),
                        casinoListItem = curElem.find( '.bonus__casinos-item' ),
                        itemNumber = casinoListItem.length;

                    curElem.removeClass( 'new' );

                    if ( itemNumber >= 3 ){

                        curElem.append( '<a href="#" class="bonus__casinos-show"><span><i>Show '+ ( itemNumber - 3 ) +' More</i></span></a>' );

                        for ( var i = 3; i <= itemNumber; i++ ) {

                            casinoListItem.eq( i ).css( 'height', 0 );
                            casinoListItem.eq( i ).addClass( 'hidden' );

                        }

                    }

                } );

                var casinoShowMore = _casinoList.find( '.bonus__casinos-show' );

                casinoShowMore.on( 'click', function () {

                    var curElem = $( this ),
                        parentCasinoList = curElem.parents( '.bonus__casinos' ),
                        parentItemFrame = curElem.parents( '.bonus__frame' ),
                        parentItemBody = curElem.parents( '.bonus__body' ),
                        casinoListItem = parentCasinoList.find( '.hidden' );

                    if ( !curElem.hasClass( 'less' ) ){

                        curElem.html( '<span><i>Show Less</i></span>' );
                        curElem.addClass( 'less' );
                        casinoListItem.removeClass( 'hidden' );
                        casinoListItem.css( 'height', 29 );

                        setTimeout( function () {
                            parentItemBody.attr( 'data-height', parentItemFrame.outerHeight() )
                            parentItemBody.css( 'height', parentItemFrame.outerHeight() );
                        }, 300 )

                    } else {

                        curElem.html( '<span><i>Show '+ ( parentCasinoList.find( '.bonus__casinos-item' ).length - 3 ) +' More</i></span>' );
                        curElem.removeClass( 'less' );

                        for ( var i = 3; i <= parentCasinoList.find( '.bonus__casinos-item' ).length; i++ ) {

                            parentCasinoList.find( '.bonus__casinos-item' ).eq( i ).css( 'height', 0 );
                            parentCasinoList.find( '.bonus__casinos-item' ).eq( i ).addClass( 'hidden' );

                        }

                        setTimeout( function () {
                            parentItemBody.attr( 'data-height', parentItemFrame.outerHeight() )
                            parentItemBody.css( 'height', parentItemFrame.outerHeight() );
                        }, 300 )

                    }

                    return false;

                } );

            },
            _init = function() {
                _initSlider();
                _initPopups();
                _minimizeCasinoList();
                _onEvent();
            };
        //public properties

        //public methods

        _init();

    };

    var BonusMinimize = function( obj ) {

        //private properties
        var _obj = obj,
            _self = this,
            _body = $( 'body' ),
            _window = $( window );

        //private methods
        var _onEvent = function() {

            },
            _minimizeAllItems = function () {

                if ( !_obj.hasClass( 'bonus_minimize' ) ){
                    _unMinimizeAllItems();
                    return false;
                }

                var bonusItem = _obj.find( '.bonus__item' ).filter( '.new' ),
                    bonusOldItem = _obj.find( '.bonus__item' ).filter( '.show' ),
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

                bonusOldItem.each( function () {

                    var curElem = $( this ),
                        bonusItemBody = curElem.find( '.bonus__body' ),
                        curHead = curElem.find( '.bonus__header' );

                    setTimeout( function () {

                        bonusItemBody.attr( 'data-height', bonusItemBody.outerHeight() );

                        curElem.removeClass( 'show' );
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
            _unMinimizeAllItems = function () {

                var bonusItem = _obj.find( '.bonus__item' ).filter( '.hide' );

                bonusItem.each( function () {

                    var curElem = $( this ),
                        bonusItemBody = curElem.find( '.bonus__body' );

                    curElem.addClass( 'show' );
                    curElem.removeClass( 'hide' );
                    bonusItemBody.css( 'height', bonusItemBody.attr( 'data-height' ) );

                } );

            },
            _minimizeEvent = function ( e ) {

                var curBtn = e,
                    curParent = curBtn.parents( '.bonus__item' ),
                    bonusItemBody = curParent.find( '.bonus__body' );

                if ( !curParent.hasClass( 'hide' ) ) {

                    curParent.addClass( 'hide' );
                    curParent.removeClass( 'show' );
                    bonusItemBody.css( 'height', 0 );

                    var curParentTop = curParent.offset().top;

                    _body.animate( { scrollTop :curParentTop }, 500, 'swing' )

                } else {

                    curParent.removeClass( 'hide' );
                    curParent.addClass( 'show' );
                    bonusItemBody.css( 'height', bonusItemBody.attr( 'data-height' ) );

                    setTimeout( function () {

                        if ( curParent.outerHeight() > _window.outerHeight() ) {

                                var curParentTop = curParent.offset().top;

                                _body.animate( { scrollTop :curParentTop }, 500, 'swing' )

                        } else if ( curParent.outerHeight() < _window.outerHeight() ){

                            var centerCurParent = curParent.offset().top + curParent.outerHeight() / 2,
                                centerBody = _window.height() / 2;

                            _body.animate( { scrollTop : centerCurParent - centerBody }, 500, 'swing' )

                        }

                    }, 300 )

                }

            },
            _init = function() {
                _minimizeAllItems();
                _onEvent();
                _obj[ 0 ].obj = _self;
            };

        //public properties

        //public methods
        _self.minimize = function () {
            _onEvent();
            _minimizeAllItems();
        };

        _init();
    };

    var CasinoInfo = function( obj ) {

        //private properties
        var _obj = obj,
            _content = _obj.find( '#casino-info__hide-text' ),
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
                _readMore.html( 'Show Less' );

            },
            _hideContent = function() {

                _content.slideUp( 300 );
                _readMore.html( 'Read More' );

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
            _filterInput = _obj.find( 'input' ),
            _filterFrame = _obj.find( '#filter-bonus__frame' ),
            _filterBtn = _obj.find( '#filter-bonus__frame-btn' ),
            _filterPopup = _obj.find( '#filter-bonus__popup' ),
            _filterItem = _filterPopup.find( 'label' ),
            _filterCheckbox = _filterItem.find( 'input' ),
            _filterSort = _obj.find( '#filter-bonus__sort' ),
            _filterSortBtn = _filterSort.find( '#filter-bonus__sort-select' ),
            _filterSortPopup = _filterSort.find( '#filter-bonus__sort-popup' ),
            _filterSortItem = _filterSortPopup.find( 'label' ),
            _filterSortRadio = _filterSortPopup.find( 'input' ),
            _bonusWrap = $( '.bonus' ),
            _displayBonusCell = _obj.find( '#filter-bonus__display-cell' ),
            _displayBonusMinimize = _obj.find( '#filter-bonus__display-minimize' ),
            _site = $( '#site' ),
            _window = $( window ),
            _bonusInsert = _bonusWrap.find( '#bonus__insert' );

        //private methods
        var _onEvent = function() {

                _window.on(
                    'resize', function () {

                        if ( _filterPopup.hasClass( 'show' ) ){
                            _hideFilterPopup();
                        }

                        if ( _filterSort.hasClass( 'show' ) ){
                            _hideSortPopup();
                        }

                    }
                );

                _site.on(
                    'click', function ( e ) {

                        if ( _filterPopup.hasClass( 'show' ) && $( e.target ).closest( _filterFrame ).length == 0 ){
                            _hideFilterPopup();
                        }

                        if ( _filterSort.hasClass( 'show' )&& $( e.target ).closest( _filterSort ).length == 0 ){
                            _hideSortPopup();
                        }

                    }
                );

                _filterInput.on(
                    'change', function ( ) {

                        _bonusInsert.empty();
                        new BonusLoad( $( '.bonus' ) );

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

                _filterSortRadio.on( 'click', function () {

                    _illuminationRadio();

                } );

                _displayBonusCell.on( 'click', function () {

                    _unMinimizeBonus();
                    return false;

                } );

                _displayBonusMinimize.on( 'click', function () {

                    _minimizeBonus();
                    return false;
                } );

            },
            _minimizeBonus = function () {

                _displayBonusMinimize.addClass( 'active' );
                _displayBonusCell.removeClass( 'active' );
                _bonusWrap.addClass( 'bonus_minimize' );

                if ( _bonusWrap.hasClass( 'bonus_minimize' ) ){
                    $( '.bonus' )[0].obj.minimize();
                };

            },
            _unMinimizeBonus = function () {

                _displayBonusCell.addClass( 'active' );
                _displayBonusMinimize.removeClass( 'active' );
                _bonusWrap.removeClass( 'bonus_minimize' );

                $( '.bonus' )[0].obj.minimize();

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
            _illuminationRadio = function() {

                _filterSortItem.each( function () {

                    var curElem = $( this ),
                        curCheckbox = curElem.find( 'input' );

                    if ( curCheckbox.is(" :checked ") ){
                        curElem.addClass( 'illumination' );
                    } else {
                        curElem.removeClass( 'illumination' );
                    }

                } );

            },
            _init = function() {
                _illuminationItem();
                _illuminationRadio();
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
            _inputs = _obj.find( 'input, textarea' ),
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
                    focusout: function() {

                        var curItem = $(this);

                        _validateField( curItem );

                    }
                } );
                _inputs.on( {
                    focusout: function() {

                        var letterCounter = 0;

                        _inputs.each( function () {

                            var curItem = $(this);

                            if ( curItem.val().length > 0 ){
                                letterCounter = letterCounter + 1
                            }

                        } );

                        if ( letterCounter == 0 ){
                            _inputs.removeClass( 'not-valid' );
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
            _btnShowInfo = _obj.find( '#info__btn-open' ),
            _infoFrame = _obj.find( '#info__frame' ),
            _infoSubFrame = _obj.find( '#info__sub-frame' ),
            _body = $( 'body, html' ),
            _site = $( '#site' ),
            _window = $( window );

        //private methods
        var _onEvent = function() {

                _site.on(
                    'click', function ( e ) {

                        if ( _infoFrame.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 ){
                            _hidePanel();
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
            _btnShowMobile = _obj.find( '#search__btn-open' ),
            _searchForm = _obj.find( '#search__form' ),
            _searchInput = _obj.find( 'input' ),
            _btnCancel = _obj.find( '#search__btn-cancel' ),
            _body = $( 'html, body' ),
            _site = $( '#site' ),
            _window = $( window ),
            _loadNewContent = true,
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _window.on (
                    'resize', function () {

                        if ( _body.width() < 1200 ){

                            var searchPopup = _obj.find( '#search__popup' );

                            searchPopup.css( {
                                'left': _btnShowMobile.offset().left * -1 + 10,
                                'width': _body.outerWidth() - 20
                            } );

                        }

                    }
                );

                _site.on(
                    'click', function ( e ) {

                        if ( _searchForm.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _body.width() < 1200 ){
                            _hidePanelOnMobile();
                            _searchForm[0].reset();
                        } else if ( $( '#search__popup' ).hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _body.width() >= 1200 ){
                            _reduceSearch();
                            _searchForm[0].reset();
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

                            var searchPopup = _obj.find( '#search__popup' );
                            searchPopup.addClass( 'load' );
                            _ajaxRequest();
                        }
                    }
                } );

            },
            _ajaxRequest = function(){

                _request = $.ajax( {
                    url: 'php/header-search.php',
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

                var searchPopup = _obj.find( '#search__popup' );

                _searchForm.addClass( 'increase' );

                searchPopup.addClass( 'show' );
                searchPopup.removeClass( 'load' );

            },
            _reduceSearch = function () {

                var searchPopup = _obj.find( '#search__popup' );

                searchPopup.removeClass( 'show' );

                setTimeout( function () {
                    _searchForm.removeClass( 'increase' );
                }, 300 );

            },
            _showPopup = function () {

                var searchPopup = _obj.find( '#search__popup' );

                searchPopup.addClass( 'show' );

                searchPopup.css( {
                    'left': _btnShowMobile.offset().left * -1 + 10,
                    'width': _body.outerWidth() - 20
                } );

                searchPopup.removeClass( 'load' );

            },
            _hidePopup = function () {

                var searchPopup = _obj.find( '#search__popup' );

                searchPopup.remove( );

                _loadNewContent = true;

            },
            _searchMoreLink = function () {

                var searchPopup = _obj.find( '#search__popup' ),
                    searchLinksResults =  searchPopup.find( '#search__popup-links' );

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

                    _obj.append( '<div id="search__popup" class="load"><div id="search__preload"><div id="search__preload-element"></div></div></div>' )

                }

                var searchPopup = _obj.find( '#search__popup' ),
                    arr = data;

                if ( _loadNewContent ){

                    searchPopup.prepend( arr );
                    _loadNewContent = false;

                } else {

                    searchPopup.empty();
                    searchPopup.append( '<div id="search__preload"><div id="search__preload-element"></div></div>' );
                    searchPopup.prepend( arr );

                }

                var searchUpdate = searchPopup.find( '#search__popup-update' );

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
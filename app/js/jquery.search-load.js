( function(){

    "use strict";

    $( function(){

        $.each( $( '.casino-bonuses' ), function() {

            new AjaxLoadContent ( $( this ) );

        } );


    } );


} )();
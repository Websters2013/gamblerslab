<?php

$loadedCount = $_GET['loadedCount'];

if ( $loadedCount == 0 ){

echo " 
    <div class=\"search__popup-title\">
        <h2>Bonus lists (<span class=\"search__lists-results\">25</span> results)</h2>
        <button class=\"search__popup-update\">Updated</button>
    </div>

    <div class=\"search__popup-wrap search__popup_lists\" style=\"\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>All Bonuses</i>
            <span>3m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>No Deposit Bonuses</i>
            <span>5m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Free Spins</i>
            <span>2h</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>First Deposit Bonuses</i>
            <span>2h</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Tourament Bonuses</i>
            <span>Mar 27, 2017</span>
        </a>
    </div>

    <div class=\"search__popup-title\" style=\"\">
        <h2>Bonus offers (<span class=\"search__offers-results\">15</span> results)</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_offers\" style=\"\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>15- 100 Free Spins at Casino Extra &amp;amp; Lucky 31 Casino</i>
            <span>3m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>100 Free Spins at Casino Room</i>
            <span>5m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>30 Free Spins at VIP Stakes Casino</i>
            <span>2h</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>25$ No Deposit at Cool Cat Casino</i>
            <span>2h</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>€10 No Deposit Bonus at VIPSpel Casino</i>
            <span>Mar 27, 2017</span>
        </a>
    </div>
       
";

} else if ( $loadedCount >= 1 && $loadedCount < 5 ) {

echo " 
    <div class=\"search__popup-title\">
        <h2>Bonus lists (<span class=\"search__lists-results\">15</span> results)</h2>
        <button class=\"search__popup-update\">Updated</button>
    </div>

    <div class=\"search__popup-wrap search__popup_lists\" style=\"\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>All Bonuses</i>
            <span>3m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>No Deposit Bonuses</i>
            <span>5m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Free Spins</i>
            <span>2h</span>
        </a>
    </div>

    <div class=\"search__popup-title\" style=\"\">
        <h2>Bonus offers (<span class=\"search__offers-results\">5</span> results)</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_offers\" style=\"\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>30 Free Spins at VIP Stakes Casino</i>
            <span>2h</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>25$ No Deposit at Cool Cat Casino</i>
            <span>2h</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>€10 No Deposit Bonus at VIPSpel Casino</i>
            <span>Mar 27, 2017</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>15- 100 Free Spins at Casino Extra &amp;amp; Lucky 31 Casino</i>
            <span>3m</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>100 Free Spins at Casino Room</i>
            <span>5m</span>
        </a>
    </div>

    <a href=\"#\" class=\"search__popup-links\">Show all results for \"<span></span>\"</a>          
";

} else if ( $loadedCount >= 5 ) {

    echo "
        <p class=\"search__popup-no-results\" style=\"\">Sorry, there are no results for your query.</p>
        <a href=\"#\" class=\"search__popup-links\">Show all results for \"<span></span>\"</a>  
    ";

};

?>
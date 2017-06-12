<?php

$loadedCount = $_GET['loadedCount'];

//  "has_items" - the number of not downloaded items
//  "title" - title of item
//  "countBonuses" - total count of bonuses
//  "countToday" - new added bonuses per day
//  "href" - link to single item

if ( $loadedCount == 0 ){

    $json_data = '{
        "lists_results": 25, 
        "lists":[
            {
                "title": "All Bonuses",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "No Deposit Bonuses",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "Free Spins",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "First Deposit Bonuses",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "Tourament Bonuses",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            }
        ],
        "offers_results": 15, 
        "offers":[
            {
                "title": "15- 100 Free Spins at Casino Extra & Lucky 31 Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "100 Free Spins at Casino Room",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "30 Free Spins at VIP Stakes Casino",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "25$ No Deposit at Cool Cat Casino",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "€10 No Deposit Bonus at VIPSpel Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            }
        ]
    }';

} else if ( $loadedCount >= 1 && $loadedCount < 5 ) {

    $json_data = '{
        "lists_results": 15,  
        "lists":[
            {
                "title": "All Bonuses",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "No Deposit Bonuses",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "Free Spins",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "First Deposit Bonuses",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "Tourament Bonuses",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            }
        ],
        "offers_results": 10, 
        "offers":[
            {
               "title": "30 Free Spins at VIP Stakes Casino",
                "countBonuses": "2h",
                "href": "#"
            },
            {
                "title": "15- 100 Free Spins at Casino Extra & Lucky 31 Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "€10 No Deposit Bonus at VIPSpel Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            },
            {
                "title": "100 Free Spins at Casino Room",
                "countBonuses": "5m",
                "href": "#"
            },
            {
                "title": "25$ No Deposit at Cool Cat Casino",
                "countBonuses": "2h",
                "href": "#"
            }
        ]
    }';

} else if ( $loadedCount >= 5 ) {

    $json_data = '{
        "lists_results": 0,
        "offers_results": 0
    }';

};

echo $json_data;
exit;
?>
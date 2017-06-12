<?php

$val = $_GET['value'];
$loadedCount = $_GET['loadedCount'];

//  "has_items" - the number of not downloaded items
//  "title" - title of item
//  "countBonuses" - total count of bonuses
//  "countToday" - new added bonuses per day
//  "href" - link to single item

if ( $loadedCount == 0 ){

    $json_data = '{
        "items":[
            {
                "title": "10Bet Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "188Bet Casino",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "21 Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "SlotsMobile Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "YoYo Casino",
                "countBonuses": "4d",
                "href": "#"
            },
            {
                "title": "Wixstars Caino",
                "countBonuses": "6d",
                "href": "#"
            },
            {
                "title": "Buran Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            },
            {
                "title": "10Bet Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "188Bet Casino",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "21 Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "SlotsMobile Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "YoYo Casino",
                "countBonuses": "4d",
                "href": "#"
            },
            {
                "title": "Wixstars Caino",
                "countBonuses": "6d",
                "href": "#"
            },
            {
                "title": "Buran Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            },
            {
                "title": "10Bet Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "188Bet Casino",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "21 Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "SlotsMobile Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "YoYo Casino",
                "countBonuses": "4d",
                "href": "#"
            },
            {
                "title": "Wixstars Caino",
                "countBonuses": "6d",
                "href": "#"
            },
            {
                "title": "Buran Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            },
            {
                "title": "10Bet Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "188Bet Casino",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "21 Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "SlotsMobile Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "YoYo Casino",
                "countBonuses": "4d",
                "href": "#"
            },
            {
                "title": "Wixstars Caino",
                "countBonuses": "6d",
                "href": "#"
            },
            {
                "title": "Buran Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            },
            {
                "title": "10Bet Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "188Bet Casino",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "21 Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "SlotsMobile Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "YoYo Casino",
                "countBonuses": "4d",
                "href": "#"
            },
            {
                "title": "Wixstars Caino",
                "countBonuses": "6d",
                "href": "#"
            },
            {
                "title": "Buran Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            }

        ]
    }';

} else if ( $loadedCount >= 1 && $loadedCount < 5 ) {

    $json_data = '{
        "items":[
            {
                "title": "10Bet Casino",
                "countBonuses": "3m",
                "href": "#"
            },
            {
                "title": "188Bet Casino",
                "countBonuses": "5m",
                "href": "#"
            },
            {
               "title": "21 Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "SlotsMobile Casino",
                "countBonuses": "2d",
                "href": "#"
            },
            {
                "title": "YoYo Casino",
                "countBonuses": "4d",
                "href": "#"
            },
            {
                "title": "Wixstars Caino",
                "countBonuses": "6d",
                "href": "#"
            },
            {
                "title": "Buran Casino",
                "countBonuses": "Mar 27, 2017",
                "href": "#"
            },
            {
                "title": "21 Dukes Casino",
                "countBonuses": "1h",
                "href": "#"
            },
            {
                "title": "Very Vegas Mobile Casino",
                "countBonuses": "1d",
                "href": "#"
            },
            {
                "title": "King Billy Casino",
                "countBonuses": "2d",
                "href": "#"
            }
        ]
    }';

} else if ($loadedCount >= 5){

    $json_data = '{
        "items":[
       
        ]
    }';

};

$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);
echo $json_data;
exit;
?>
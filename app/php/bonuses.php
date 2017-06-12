<?php

$loadedCount = $_GET['loadedCount'];

//  "has_items" - the number of not downloaded items
//  "title" - title of item
//  "countBonuses" - total count of bonuses
//  "countToday" - new added bonuses per day
//  "href" - link to single item

if ( $loadedCount == 5 ){

    $json_data = '{
        "has_items": 1,
        "items":[
            {
                "title": "15 - 100 Free Spins at Casino Extra & Lucky31 Casino",
                "time": "2 Minutes Agos",
                "country_flag": "img/flag-001.jpg",
                "country_status": "true",
                "expires": "Expires in 360 days",
                "expires_status": "true",
                "code": "MARSPEL28TBFCL",
                "likes": "121",
                "dislike": "16",
                "comments": "5",
                "comments_item": [
                    {
                      "flag": "img/flag-001.jpg",  
                      "name": "Monarch2345",
                      "time": "2 minutes ago",
                      "content": "<p>Nice casino!</p><p>This is a sister casino of Exclusive casino! Exclusive, have paid me the max cash out of a welcome bonus they allow me to play! Going try to claim these $10!</p>"
                    },
                    {
                      "flag": "img/flag-001.jpg",  
                      "name": "Monarch2345",
                      "time": "2 minutes ago",
                      "content": "<p>Nice casino!</p><p>This is a sister casino of Exclusive casino! Exclusive, have paid me the max cash out of a welcome bonus they allow me to play! Going try to claim these $10!</p>"
                    }
                ],
                "warning": "70 x B",
                "max_cash_out": "$/€/£50",
                "min_deposit": "$10",
                "availability": "<p>All players</p>",
                "content": "<p>The free spins can be played on Warlords Crystals of Power</p><p>Bonus is valid for players from: Australia, Austria, Finland, Germany, New Zealand, Norway, Sweden, Switzerland</p><p>Several free spins bonuses in a row are prohibited, as well as several multiple accounts. Hence, if your recent transaction included a free bonus, you must make a deposit before using this free spins offer.</p><p>Best of luck!</p>",
                "casino": [
                    {
                      "img": "pic/img-002.jpg",  
                      "status": "1"
                    },
                    {
                      "img": "pic/img-002.jpg",  
                      "status": "2"
                    },
                    {
                      "img": "pic/img-002.jpg",  
                      "status": "3"
                    },
                    {
                      "img": "pic/img-002.jpg",  
                      "status": "4"
                    }
                ]
            }

        ]
    }';

} else {

    $json_data = '{

        "has_items": 0,
        "items":[

            {
                "title": "Title",
                "countBonuses": "100 Bonuses",
                "countToday": "80 New Today",
                "href": "#"
            },
            {
                "title": "Title",
                "countBonuses": "100 Bonuses",
                "countToday": "80 New Today",
                "href": "#"
            }

        ]
        }';

};
echo $json_data;
exit;
?>
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
            },
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

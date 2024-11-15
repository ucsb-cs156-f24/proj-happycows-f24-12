const pagedProfitsFixtures = {
    emptyPage: {
        "content": [],
        "pageable": {
            "sort": {
                "empty": false,
                "unsorted": false,
                "sorted": true
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 5,
            "paged": true,
            "unpaged": false
        },
        "totalPages": 0,
        "totalElements": 0,
        "last": true,
        "size": 5,
        "number": 0,
        "sort": {
            "empty": false,
            "unsorted": false,
            "sorted": true
        },
        "numberOfElements": 0,
        "first": true,
        "empty": true
    },
    onePage:
    {
        "content": [
            {
                "amount": 110,
                "timestamp": "2024-06-16T20:55:00.01234",
                "numCows": 5,
                "avgCowHealth": 100,

            },
            {
                "amount": 105,
                "timestamp": "2024-07-16T20:55:00.01234",
                "numCows": 4,
                "avgCowHealth": 94,
            },

        ],
        "pageable": {
            "sort": {
                "empty": false,
                "unsorted": false,
                "sorted": true
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 5,
            "paged": true,
            "unpaged": false
        },
        "totalPages": 1,
        "totalElements": 2,
        "last": true,
        "size": 5,
        "number": 0,
        "sort": {
            "empty": false,
            "unsorted": false,
            "sorted": true
        },
        "numberOfElements": 2,
        "first": true,
        "empty": false
    },
    twoPages: [
        {
            "content": [
                {
                    "amount": 20,
                    "timestamp": "2024-10-20T11:45:00.01234",
                    "numCows": 4,
                    "avgCowHealth": 90,
                },
                {
                    "amount": 19,
                    "timestamp": "2025-10-12T11:45:00.01234",
                    "numCows": 9,
                    "avgCowHealth": 91,
                },
                {
                    "amount": 18,
                    "timestamp": "2024-10-20T11:45:00.01234",
                    "numCows": 7,
                    "avgCowHealth": 50,
                },
                {
                    "amount": 18,
                    "timestamp": "2023-03-03T11:45:00.01234",
                    "numCows": 8,
                    "avgCowHealth": 34,
                },
                {
                    "amount": 120,
                    "timestamp": "2022-05-16T11:45:00.01234",
                    "numCows": 6,
                    "avgCowHealth": 78,
                }
            ],
            "pageable": {
                "sort": {
                    "empty": false,
                    "unsorted": false,
                    "sorted": true
                },
                "offset": 0,
                "pageNumber": 0,
                "pageSize": 5,
                "paged": true,
                "unpaged": false
            },
            "totalPages": 2,
            "totalElements": 9,
            "last": false,
            "size": 5,
            "number": 0,
            "sort": {
                "empty": false,
                "unsorted": false,
                "sorted": true
            },
            "numberOfElements": 5,
            "first": true,
            "empty": false
        },
        {
            "content": [
                {
                    "amount": 6,
                    "timestamp": "2022-03-10T11:45:00.01234",
                    "numCows": 9,
                    "avgCowHealth": 60,
                },
                {
                    "amount": 90,
                    "timestamp": "2020-11-03T11:45:00.01234",
                    "numCows": 9,
                    "avgCowHealth": 60,
                },
                {
                    "amount": 10,
                    "timestamp": "2019-03-17T11:45:00.01234",
                    "numCows": 10,
                    "avgCowHealth": 81,
                },
                {
                    "amount": 15,
                    "timestamp": "2003-04-19T11:45:00.01234",
                    "numCows": 20,
                    "avgCowHealth": 98,
                }
            ],
            "pageable": {
                "sort": {
                    "empty": false,
                    "unsorted": false,
                    "sorted": true
                },
                "offset": 5,
                "pageNumber": 1,
                "pageSize": 5,
                "paged": true,
                "unpaged": false
            },
            "totalPages": 2,
            "totalElements": 9,
            "last": true,
            "size": 5,
            "number": 1,
            "sort": {
                "empty": false,
                "unsorted": false,
                "sorted": true
            },
            "numberOfElements": 4,
            "first": false,
            "empty": false
        }
    ]

};

export default pagedProfitsFixtures;
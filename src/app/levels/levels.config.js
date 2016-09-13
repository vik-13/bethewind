window.app = window.app || {};
window.app.levels = [
    {
        level: 0,
        timeToFall: 3,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 1,
                livingTime: 30000
            }
        ],
        goals: [
            {
                type: 0,
                amount: 1
            }
        ]
    },
    {
        level: 1,
        timeToFall: 3,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 4,
                livingTime: 25000
            }
        ],
        goals: [
            {
                type: 0,
                amount: 2
            }
        ]
    },
    {
        level: 2,
        timeToFall: 3,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 3
            },
            {
                type: 1,
                amount: 4
            }
        ],
        goals: [
            {
                type: 0,
                amount: 2
            },
            {
                type: 1,
                amount: 2
            }
        ]
    },
    {
        level: 3,
        timeToFall: 3,
        isDown: false,
        leaves: [
            {
                type: 1,
                amount: 8,
                livingTime: 30000
            },
            {
                type: 2,
                amount: 1,
                livingTime: 10000
            }
        ],
        goals: [
            {
                type: 1,
                amount: 4
            },
            {
                type: 2,
                amount: 1
            }
        ]
    },
    {
        level: 4,
        timeToFall: 7,
        isDown: false,
        leaves: [
            {
                type: 3,
                amount: 3,
                livingTime: 2000
            },
            {
                type: 3,
                amount: 1,
                livingTime: 10000
            }
        ],
        goals: [
            {
                type: 3,
                amount: 1
            }
        ]
    },
    {
        level: 5,
        timeToFall: 0,
        leaves: [
            {
                type: 4,
                amount: 1,
                isDown: true,
                livingTime: 8000
            }
        ],
        goals: [
            {
                type: 4,
                amount: 1
            }
        ]
    },
    {
        level: 6,
        timeToFall: 1,
        isDown: false,
        leaves: [
            {
                type: 4,
                amount: 1,
                isDown: true,
                livingTime: 10000
            },
            {
                type: 5,
                amount: 5,
                livingTime: 15000
            }
        ],
        goals: [
            {
                type: 4,
                amount: 1
            },
            {
                type: 5,
                amount: 4
            }
        ]
    },
    {
        level: 7,
        timeToFall: 3,
        isDown: false,
        leaves: [
            {
                type: 4,
                amount: 10
            },
            {
                type: 6,
                amount: 3
            }
        ],
        goals: [
            {
                type: 6,
                amount: 3
            }
        ]
    },
    {
        level: 8,
        timeToFall: 7,
        isDown: false,
        leaves: [
            {
                type: 2,
                amount: 10,
                isDown: true
            }
        ],
        goals: [
            {
                type: 2,
                amount: 6
            }
        ]
    },
    {
        level: 9,
        timeToFall: 3,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 10
            },
            {
                type: 5,
                amount: 5,
                isDown: true
            },
            {
                type: 6,
                amount: 5,
                isDown: true
            }
        ],
        goals: [
            {
                type: 0,
                amount: 0
            },
            {
                type: 5,
                amount: 3
            },
            {
                type: 6,
                amount: 3
            }
        ]
    },
    {
        level: 10,
        timeToFall: 7,
        isDown: false,
        leaves: [
            {
                type: 4,
                amount: 30
            },
            {
                type: 1,
                amount: 1
            }
        ],
        goals: [
            {
                type: 1,
                amount: 1
            },
            {
                type: 4,
                amount: 0
            }
        ]
    },
    {
        level: 11,
        timeToFall: 10,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 2
            },
            {
                type: 2,
                amount: 3
            },
            {
                type: 4,
                amount: 3
            },
            {
                type: 5,
                amount: 2
            },
            {
                type: 6,
                amount: 3
            }
        ],
        goals: [
            {
                type: 0,
                amount: 0
            },
            {
                type: 2,
                amount: 2
            },
            {
                type: 4,
                amount: 3
            },
            {
                type: 5,
                amount: 1
            },
            {
                type: 6,
                amount: 0
            }
        ]
    },
    {
        level: 12,
        timeToFall: 15,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 1,
                isDown: true
            },
            {
                type: 1,
                amount: 3,
                isDown: true
            },
            {
                type: 2,
                amount: 2
            },
            {
                type: 3,
                amount: 3
            },
            {
                type: 4,
                amount: 2
            },
            {
                type: 5,
                amount: 3
            },
            {
                type: 6,
                amount: 3
            }
        ],
        goals: [
            {
                type: 0,
                amount: 1
            },
            {
                type: 1,
                amount: 0
            },
            {
                type: 2,
                amount: 0
            },
            {
                type: 3,
                amount: 0
            },
            {
                type: 4,
                amount: 2
            },
            {
                type: 5,
                amount: 0
            },
            {
                type: 6,
                amount: 0
            }
        ]
    },
    {
        level: 13,
        timeToFall: 0,
        isDown: false,
        leaves: [
            {
                type: 2,
                amount: 7,
                isDown: true,
                livingTime: 40000
            },
            {
                type: 3,
                amount: 7,
                livingTime: 40000
            },
            {
                type: 5,
                amount: 7,
                isDown: true,
                livingTime: 40000
            }
        ],
        goals: [
            {
                type: 2,
                amount: 7
            },
            {
                type: 3,
                amount: 7
            },
            {
                type: 5,
                amount: 7
            }
        ]
    },
    {
        level: 14,
        timeToFall: 0,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 15,
                isDown: true,
                livingTime: 25000
            },
            {
                type: 1,
                amount: 15,
                isDown: true,
                livingTime: 25000
            },
            {
                type: 2,
                amount: 1,
                isDown: true,
                livingTime: 20000
            },
            {
                type: 3,
                amount: 15,
                isDown: true,
                livingTime: 25000
            },
            {
                type: 5,
                amount: 10,
                livingTime: 25000
            }
        ],
        goals: [
            {
                type: 0,
                amount: 0,
            },
            {
                type: 1,
                amount: 0,
            },
            {
                type: 2,
                amount: 1,
            },
            {
                type: 3,
                amount: 0,
            },
            {
                type: 5,
                amount: 0,
            }
        ]
    },
    {
        level: 15,
        timeToFall: 20,
        isDown: false,
        leaves: [
            {
                type: 0,
                amount: 8,
                livingTime: 60000
            },
            {
                type: 1,
                amount: 8,
                livingTime: 60000
            },
            {
                type: 2,
                amount: 8,
                livingTime: 60000
            },
            {
                type: 3,
                amount: 8,
                livingTime: 60000
            },
            {
                type: 4,
                amount: 8,
                livingTime: 60000
            },
            {
                type: 5,
                amount: 8,
                livingTime: 60000
            },
            {
                type: 6,
                amount: 8,
                livingTime: 60000
            }
        ],
        goals: [
            {
                type: 0,
                amount: 1
            },
            {
                type: 1,
                amount: 1
            },
            {
                type: 2,
                amount: 1
            },
            {
                type: 3,
                amount: 1
            },
            {
                type: 4,
                amount: 1
            },
            {
                type: 5,
                amount: 1
            },
            {
                type: 6,
                amount: 1
            }
        ]
    }
];
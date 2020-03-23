

const getUser = async (): Promise<{}>  => {
    let user ={
        following: ['trevor'],
        alias: 'x',
        feed: [],
        password: '$2a$10$1x5y0vksEXoKN5/eb6MDm.8xx810t9JeRLcB6P1DWTq9C8wfaAbZS',
        followers: [ 'trevor' ],
        updatedAt: 1584913173079,
        createdAt: 1584665743717,
        id: '86ecb950-6a45-11ea-abaf-ff24a9268b9a',
        picture: 'https://i.imgur.com/oo67PIH.jpg',
        statuses: [
            'c49b4820-6a45-11ea-abaf-ff24a9268b9a',
            '02642ad0-6a48-11ea-abaf-ff24a9268b9a',
            '5df840e0-6a50-11ea-b952-4b1f1a6002db',
            '5f70fe30-6a50-11ea-b952-4b1f1a6002db',
            '7a2451f0-6a50-11ea-b952-4b1f1a6002db',
            '1d6f6a80-6ab4-11ea-b37f-15ff1bb86ca9',
            '25e7d1b0-6af6-11ea-876a-6922dd998755',
            '4f2ce4b0-6af7-11ea-9651-f3dbee7ec58f',
            '644c2680-6af7-11ea-a524-d13bcde41e17',
            '6adbaf70-6af7-11ea-a524-d13bcde41e17',
            'd00b4f90-6af7-11ea-88af-59d2de80ff6a',
            'd27b6530-6af7-11ea-88af-59d2de80ff6a',
            'd4d9eea0-6af7-11ea-88af-59d2de80ff6a',
            'c2cdd900-6be3-11ea-8ff4-fdcc2fc4a104',
            '8e5aa750-6be5-11ea-b960-6b6368b242e4',
            '2776dfd0-6beb-11ea-88ef-3bbe4fd91758',
            '37349160-6beb-11ea-88ef-3bbe4fd91758',
            '26a6f9c0-6bf8-11ea-976e-11e771b86f7b',
            '50d872b0-6c74-11ea-9c37-a1418ac44379'
        ]
    }

    return Promise.resolve(user);     
}

const getUsers = async (): Promise<{}>  => {
    let data =  [
        {
          following: [],
          alias: 'trevor',
          feed: [],
          password: '$2a$10$/I9MgpgUteR45VNfw2qAoOUooBUZYKE/ZnuM0oTpTDq8LnFQulBVu',
          followers: [ 'x' ],
          updatedAt: 1584913176136,
          createdAt: 1584665035236,
          id: 'e0a31a40-6a43-11ea-abaf-ff24a9268b9a',
          picture: 'https://i.imgur.com/oo67PIH.jpg',
          statuses: [
            'e670d9d0-6a43-11ea-abaf-ff24a9268b9a',
            'c60b2140-6a44-11ea-abaf-ff24a9268b9a'
          ]
        }
      ]

      return Promise.resolve(data); 
      
}

const createUser = async (): Promise<{}>  => {
    let user ={
        following: ['trevor'],
        alias: 'x',
        feed: [],
        password: '$2a$10$1x5y0vksEXoKN5/eb6MDm.8xx810t9JeRLcB6P1DWTq9C8wfaAbZS',
        followers: [ 'trevor' ],
        updatedAt: 1584913173079,
        createdAt: 1584665743717,
        id: '86ecb950-6a45-11ea-abaf-ff24a9268b9a',
        picture: 'https://i.imgur.com/oo67PIH.jpg',
        statuses: [
            'c49b4820-6a45-11ea-abaf-ff24a9268b9a',
            '02642ad0-6a48-11ea-abaf-ff24a9268b9a',
            '5df840e0-6a50-11ea-b952-4b1f1a6002db',
            '5f70fe30-6a50-11ea-b952-4b1f1a6002db',
            '7a2451f0-6a50-11ea-b952-4b1f1a6002db',
            '1d6f6a80-6ab4-11ea-b37f-15ff1bb86ca9',
            '25e7d1b0-6af6-11ea-876a-6922dd998755',
            '4f2ce4b0-6af7-11ea-9651-f3dbee7ec58f',
            '644c2680-6af7-11ea-a524-d13bcde41e17',
            '6adbaf70-6af7-11ea-a524-d13bcde41e17',
            'd00b4f90-6af7-11ea-88af-59d2de80ff6a',
            'd27b6530-6af7-11ea-88af-59d2de80ff6a',
            'd4d9eea0-6af7-11ea-88af-59d2de80ff6a',
            'c2cdd900-6be3-11ea-8ff4-fdcc2fc4a104',
            '8e5aa750-6be5-11ea-b960-6b6368b242e4',
            '2776dfd0-6beb-11ea-88ef-3bbe4fd91758',
            '37349160-6beb-11ea-88ef-3bbe4fd91758',
            '26a6f9c0-6bf8-11ea-976e-11e771b86f7b',
            '50d872b0-6c74-11ea-9c37-a1418ac44379'
        ]
    }
    return Promise.resolve(user); 
}

const updateUserStatuses = async (): Promise<{}>  => {
    console.log('mock was used')
    let user = {alias: "x", password: "x"}
    return Promise.resolve(user);    
}


const updateUserFollowing = async (): Promise<{}>  => {
    let data =   [
        {
            following: [],
            alias: 'trevor',
            feed: [],
            password: '$2a$10$/I9MgpgUteR45VNfw2qAoOUooBUZYKE/ZnuM0oTpTDq8LnFQulBVu',
            followers: [],
            updatedAt: 1584917169825,
            createdAt: 1584665035236,
            id: 'e0a31a40-6a43-11ea-abaf-ff24a9268b9a',
            picture: 'https://i.imgur.com/oo67PIH.jpg',
            statuses: [
            'e670d9d0-6a43-11ea-abaf-ff24a9268b9a',
            'c60b2140-6a44-11ea-abaf-ff24a9268b9a'
            ]
        }
    ]

    return Promise.resolve(data);
}

const updateUserFollowers = async (): Promise<{}>  => {
    let data =   [
        {
            following: [],
            alias: 'trevor',
            feed: [],
            password: '$2a$10$/I9MgpgUteR45VNfw2qAoOUooBUZYKE/ZnuM0oTpTDq8LnFQulBVu',
            followers: [],
            updatedAt: 1584917169825,
            createdAt: 1584665035236,
            id: 'e0a31a40-6a43-11ea-abaf-ff24a9268b9a',
            picture: 'https://i.imgur.com/oo67PIH.jpg',
            statuses: [
            'e670d9d0-6a43-11ea-abaf-ff24a9268b9a',
            'c60b2140-6a44-11ea-abaf-ff24a9268b9a'
            ]
        }
    ]

    return Promise.resolve(data);
}

export { 
    getUser,
    updateUserStatuses, 
    getUsers,
    createUser,
    updateUserFollowing,
    updateUserFollowers
}
const createStatus = async () : Promise<{}>  => {
    let data = {alias: "x", message: "new status message"}
    return Promise.resolve(data);
}

const getStatuses = async (): Promise<{}[]>  => {

    let data  =  [
        {
          createdAt: 1584665044973,
          alias: 'trevor',
          message: 'wow cool status',
          id: 'e670d9d0-6a43-11ea-abaf-ff24a9268b9a',
          updatedAt: 1584665044973
        },
        {
          createdAt: 1584665420116,
          alias: 'trevor',
          message: 'asdfasdfasdfsaf',
          id: 'c60b2140-6a44-11ea-abaf-ff24a9268b9a',
          updatedAt: 1584665420116
        }
      ]

    return Promise.resolve(data);
}


export {
    createStatus,
    getStatuses
}
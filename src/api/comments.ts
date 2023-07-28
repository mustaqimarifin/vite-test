export const getComments = async () => {
  return [
    {
      id: 1,
      body: 'First comment',
      username: 'Jack',
      userId: 1,
      parentId: null,
      createdAt: '2021-08-16T23:00:33.010+02:00',
    },
    {
      id: 2,
      body: 'Second comment',
      username: 'John',
      userId: 2,
      parentId: null,
      createdAt: '2021-08-16T23:00:33.010+02:00',
    },
    {
      id: 2,
      body: 'First comment first child',
      username: 'John',
      userId: 2,
      parentId: 2,
      createdAt: '2021-08-16T23:00:33.010+02:00',
    },
    {
      id: 4,
      body: 'Second comment second child',
      username: 'John',
      userId: 2,
      parentId: 2,
      createdAt: '2021-08-16T23:00:33.010+02:00',
    },
  ]
}



export const createComment = async (text: string, parentId: number| null) => {
  return {
    id: Math.random(),
    body: text,
    parentId: null,
    userId: 1,
    username: 'John',
    createdAt: new Date().toISOString(),
  }
}

export const updateComment = async (text: string) => {
  return { text }
}

export const deleteComment = async () => {
  return {}
}

export const fetchUser = e => async dispatch => {
  console.warn(e)

  const res = await fetch(`${process.env.REACT_APP_API}/user`, {
    headers: { authorization: localStorage.getItem('token') }
  })
  const { user } = await res.json()
  dispatch({ type: 'GET_USER', user })
}

export const updateUser = user => async dispatch => {
  console.warn(user)

  const res = await fetch(`${process.env.REACT_APP_API}/user`, {
    method: 'PUT',
    headers: {
      authorization: localStorage.getItem('token'),
      'content-type': 'application/json'
    },
    body: JSON.stringify({ user })
  })

  const data = await res.json()
  dispatch({ type: 'GET_USER', user: data.user })
}

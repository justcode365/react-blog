export const fetchUser = () => async dispatch => {
  const res = await fetch(`${process.env.REACT_APP_API}/user`, {
    headers: { authorization: localStorage.getItem('token') }
  })
  const { user } = await res.json()
  dispatch({ type: 'GET_USER', user })
}

export const updateUser = user => async dispatch => {
  const res = await fetch(`${process.env.REACT_APP_API}/user`, {
    method: 'PUT',
    headers: { authorization: localStorage.getItem('token') },
    body: JSON.stringify({ user })
  })

  const { user } = await res.json()
  dispatch({ type: 'GET_USER', user })
}

// export const Log = () => async dispatch => {
//   const res = await fetch(`${process.env.REACT_APP_API}/user`, {
//     headers: { authorization: localStorage.getItem('token') }
//   })
//   const { user } = await res.json()
//   dispatch({ type: 'GET_USER', user })
// }

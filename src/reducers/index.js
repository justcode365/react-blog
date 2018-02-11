const initialState = {
  user: {},
  tags: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@login': {
      localStorage.setItem('token', action.data.user.token)
      return { ...state, ...action.data }
    }


    default:
      return state
  }
}

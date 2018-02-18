const initialState = {
  tags: [],
  items: [],
  count: 0,
  page_no: 0,
  tabs: [],
  activeTabIndex: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TAGS':
      return { ...state, tags: action.tags }

    case 'GET_Articles':
      const { items, count } = action
      return { ...state, items, count }

    default:
      return state
  }
}

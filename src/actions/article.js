export const fetchTags = () => async dispatch => {
  const res = await fetch(`${process.env.REACT_APP_API}/tags`)
  const { tags } = await res.json()
  dispatch({ type: 'GET_TAGS', tags })
}

export const fetchArticles = () => async dispatch => {
  const res = await fetch(`${process.env.REACT_APP_API}/articles?limit=5&offset=0`)
  const { articles, articlesCount } = await res.json()
  dispatch({ type: 'GET_Articles', items: articles, count: articlesCount })
}

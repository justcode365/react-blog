export default (state = [], action) => {
  switch (action.type) {
    case "GET_TAGS":
      return action.tags;
    default:
      return state;
  }
};

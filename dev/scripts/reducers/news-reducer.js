const initialState = {
  fetching: false,
  fetched: false,
  list: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS_PENDING': {
      return {
        ...state,
        fetching: true
      }
      break;
    }
    case 'GET_NEWS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      break;
    }
    case 'GET_NEWS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.payload.data.articles
      }
      break;
    }
  }
  return state
}
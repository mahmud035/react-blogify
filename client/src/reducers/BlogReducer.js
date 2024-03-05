import { actions } from '../actions';

const blogInitialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  // console.log('profileState =>', state);
  // console.log('profileAction =>', action);

  switch (action.type) {
    // Data Fetching
    case actions.blog.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    // Data Fetched
    case actions.blog.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        blogs: action.data,
      };
    }
    // Data Fetch Error
    case actions.blog.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export { blogInitialState, blogReducer };

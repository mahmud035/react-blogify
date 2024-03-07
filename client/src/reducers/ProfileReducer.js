import { actions } from '../actions';

const profileInitialState = {
  user: null,
  blogAuthor: null,
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  // console.log('profileState =>', state);
  // console.log('profileAction =>', action);

  switch (action.type) {
    // Data Fetching
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    // Data Fetch Error
    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    // Data Fetched
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    // Blog Author's Data Fetched
    case actions.profile.BLOG_AUTHOR_DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        blogAuthor: action.data,
      };
    }
    // User Data Edited
    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    // Image Updated
    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }
    // User Logout
    case actions.profile.USER_LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export { profileInitialState, profileReducer };

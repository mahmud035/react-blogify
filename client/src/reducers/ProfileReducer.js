import { actions } from '../actions';

const profileInitialState = {
  user: null,
  blogs: [],
  favourites: [],
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
    // Data Fetched
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data,
        //! re-think if this two needed or not
        blogs: action.data.blogs,
        favourites: action.data.favourites,
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
    // User Data Edited
    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    // Image Updated
    case actions.profile.DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export { profileInitialState, profileReducer };

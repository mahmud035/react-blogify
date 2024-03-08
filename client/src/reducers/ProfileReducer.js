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
    // Create New Blog
    case actions.profile.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          blogs: [...state.user.blogs, action.data],
        },
      };
    }
    // Favorite Blog's Data Fetched
    case actions.profile.FAVORITE_BLOG_DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favourites: action.data,
        },
      };
    }
    // Toggle Favorite Blog
    case actions.profile.TOGGLE_FAVORITE: {
      const newData = action.data;
      const favorites = state.user?.favourites || [];

      // Check if newData already exists in favorites
      const existingIndex = favorites.findIndex(
        (item) => item.id === newData.id
      );

      if (existingIndex === -1) {
        // newData does not exist in favorites
        const updatedFavorites = [...favorites, newData];

        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            favourites: updatedFavorites,
          },
        };
      } else {
        // newData already exists in favorites, remove it
        const updatedFavorites = favorites.filter(
          (item) => item.id !== newData.id
        );

        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            favourites: updatedFavorites,
          },
        };
      }
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

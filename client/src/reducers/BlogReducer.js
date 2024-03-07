import { actions } from '../actions';

const blogInitialState = {
  blogs: [],
  popularBlogs: [],
  singleBlog: {},
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
    // Data Fetch Error
    case actions.blog.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    // Data Fetched
    case actions.blog.DATA_FETCHED: {
      const existingBlogIds = new Set(state.blogs.map((blog) => blog?.id));

      const newBlogs = action.data.filter(
        (blog) => !existingBlogIds.has(blog?.id)
      );

      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, ...newBlogs],
      };
    }
    // Popular Blogs Data Fetched
    case actions.blog.POPULAR_BLOG_DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        popularBlogs: action.data,
      };
    }
    // Single Blog Data Fetched
    case actions.blog.SINGLE_BLOG_DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        singleBlog: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export { blogInitialState, blogReducer };

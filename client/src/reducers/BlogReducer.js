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
    // Toggle Like Blog
    case actions.blog.TOGGLE_LIKE: {
      return {
        ...state,
        loading: false,
        singleBlog: {
          ...state.singleBlog,
          likes: action.data,
        },
      };
    }
    // Add Comment To Blog
    case actions.blog.ADD_COMMENT: {
      return {
        ...state,
        loading: false,
        singleBlog: {
          ...state.singleBlog,
          comments: action.data,
        },
      };
    }
    // Delete Comment From Blog
    case actions.blog.DELETE_COMMENT: {
      return {
        ...state,
        loading: false,
        singleBlog: {
          ...state.singleBlog,
          comments: action.data,
        },
      };
    }
    // Data Edited
    case actions.blog.DATA_EDITED: {
      return {
        ...state,
        loading: false,
        blogs: state.blogs?.map((blog) => {
          if (blog.id === action.data.id) return action.data;
          else return blog;
        }),
      };
    }
    // Delete Blog
    case actions.blog.DATA_DELETED: {
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog?.id !== action.data),
      };
    }
    default: {
      return state;
    }
  }
};

export { blogInitialState, blogReducer };

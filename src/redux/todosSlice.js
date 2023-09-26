import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postToJSONPlaceholder } from "../api";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  filteredTodos: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    return response.data;
  }
);

export const postNewData = createAsyncThunk(
  "posts/postNewData",
  async (data) => {
    return postToJSONPlaceholder(data);
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedPost }) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      updatedPost
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Define a reducer to filter todos based on a keyword
    filterTodos: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.filteredTodos = state.posts.filter((todo) =>
        todo.title.toLowerCase().includes(keyword)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.filteredTodos = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // post

      .addCase(postNewData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postNewData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // end  post

      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
export const { filterTodos } = postSlice.actions;

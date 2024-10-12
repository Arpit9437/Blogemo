import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000/blog/api";

export const usePostStore = create((set) => ({
  posts: [],
  addPosts: async (post) => {
    try {
      const formData = new FormData();
      formData.append("file", post.files[0]);
      formData.append("title", post.title);
      formData.append("summary", post.summary);
      formData.append("content", post.content);

      const response = await axios.post(`${API_URL}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  getPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}/post`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getPostById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/post/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  putPost: async (post) => {
    try {
      const response = await axios.put(
        `${API_URL}/post/${post.get("id")}`,
        post,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post updated successfully:", response.data); // Log the updated post data

      set((state) => {
        const index = state.posts.findIndex((p) => p._id === post.get("id"));
        if (index !== -1) {
          state.posts[index] = response.data;
        }
        return { posts: [...state.posts] };
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  },
  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}/post/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  },
}));

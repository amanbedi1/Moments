import axios from "axios";

const url = "https://moments--project.herokuapp.com/posts";

export const fetchPosts = async () => {
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const getPost = async (id) => {
  try {
    const { data: response } = await axios.get(`${url}/${id}`);
    return response;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const sendPosts = async (data) => {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${url}/${id}`);
    return true;
  } catch (error) {
    console.error(error.response.data.message);
    return false;
  }
};

export const updatePost = async (data, id) => {
  try {
    const response = await axios.patch(`${url}/${id}`, data);
    return response;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

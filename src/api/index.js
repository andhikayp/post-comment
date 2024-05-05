import axios from 'axios';

import constants from '../utils/constants';

const { URL } = constants;

const headers = {
  'Content-type': 'application/json; charset=UTF-8'
};

const fetchUsers = async () => {
  const response = await axios.get(`${URL.service}/users`, { headers });

  return response.data;
};

const fetchUserById = async (id) => {
  const response = await axios.get(`${URL.service}/users/${id}`, { headers });

  return response.data;
};

const fetchPostsById = async (id) => {
  const response = await axios.get(`${URL.service}/users/${id}/posts`, { headers });

  return response.data;
};

const fetchAlbumsById = async (id) => {
  const response = await axios.get(`${URL.service}/users/${id}/albums`, { headers });

  return response.data;
};

const fetchPhotosByAlbumId = async (id) => {
  const response = await axios.get(`${URL.service}/albums/${id}/photos`, { headers });

  return response.data;
};

const fetchAlbumByAlbumId = async (id) => {
  const response = await axios.get(`${URL.service}/albums/${id}`, { headers });

  return response.data;
};

const fetchPostsByUserId = async (id) => {
  const response = await axios.get(`${URL.service}/users/${id}/posts`, { headers });

  return response.data;
};

const fetchPostByPostId = async (id) => {
  const response = await axios.get(`${URL.service}/posts/${id}`, { headers });

  return response.data;
};

const fetchCommentsByPostId = async (id) => {
  const response = await axios.get(`${URL.service}/posts/${id}/comments`, { headers });

  return response.data;
};

const fetchPhotoByPhotoId = async (id) => {
  const response = await axios.get(`${URL.service}/photos/${id}`, { headers });

  return response.data;
};

const fetchPhoto = async (id) => {
  const photo = await fetchPhotoByPhotoId(id);
  const { albumId } = photo;
  const album = await fetchAlbumByAlbumId(albumId);

  return {
    ...photo,
    albumTitle: album.title
  };
};

const deletePostByPostId = async (id) => {
  const response = await axios.delete(`${URL.service}/posts/${id}`, { headers });

  return response.data;
};

const editPostByPostId = async (id, title, content, userId) => {
  const body = {
    title, body: content, userId, id
  };
  const response = await axios.put(`${URL.service}/posts/${id}`, { headers, body });

  return response.data;
};

const createPost = async (title, content, userId) => {
  const body = {
    title, body: content, userId
  };
  const response = await axios.post(`${URL.service}/posts`, { headers, body });

  return response.data;
};

const createdComment = async (body) => {
  const response = await axios.post(`${URL.service}/comments`, { headers, body });

  return response.data;
};

const deleteCommentByCommentId = async (id) => {
  const response = await axios.delete(`${URL.service}/comments/${id}`, { headers });

  return response.data;
};

const editCommentByPostId = async (body) => {
  const response = await axios.put(`${URL.service}/comments/${body.id}`, { headers, body });

  return response.data;
};

export default {
  fetchUsers,
  fetchUserById,
  fetchPostsById,
  fetchAlbumsById,
  fetchPhotosByAlbumId,
  fetchAlbumByAlbumId,
  fetchPostsByUserId,
  fetchPostByPostId,
  fetchCommentsByPostId,
  fetchPhotoByPhotoId,
  fetchPhoto,
  deletePostByPostId,
  createPost,
  editPostByPostId,
  createdComment,
  deleteCommentByCommentId,
  editCommentByPostId
};

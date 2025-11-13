import axios from "../lib/axios";
import { getRandomItems } from "../lib/utils/random";

export const postCrop = async (crop) => {
  const res = await axios.post("/crops", crop);
  return res.data;
};

export const getCropById = async (id) => {
  const res = await axios.get(`/crops/${id}`);
  return res.data;
};

export const getCropsByEmail = async (email) => {
  const res = await axios.get(`/crops?email=${email}`);
  return res.data;
};

export const getCrops = async (limit) => {
  const res = await axios.get(`/crops?limit=${limit ? limit : ""}`);
  return res.data;
};

export const getRandomCrops = async (count = 1) => {
  const crops = await getCrops();
  const randomizedCrops = getRandomItems(crops, count);
  return randomizedCrops;
};

export const updateCrop = async (id, crop) => {
  const res = await axios.patch(`/crops/${id}`, crop);
  return res.data;
};

export const deleteCrop = async (id) => {
  const res = await axios.delete(`/crops/${id}`);
  return res.data;
};

export const postInterest = async (interest) => {
  const res = await axios.post("/interests", interest);
  return res.data;
};

export const getInterestsByCropId = async (cropId) => {
  const res = await axios.get(`/interests?cropId=${cropId}`);
  return res.data;
};

export const getInterestsByEmail = async (email) => {
  const res = await axios.get(`/interests?email=${email}`);
  return res.data;
};

export const updateInterest = async (interestId, interest) => {
  const res = await axios.patch(`/interests/${interestId}`, interest);
  return res.data;
};

export const deleteInterest = async (id) => {
  const res = await axios.delete(`/interests/${id}`);
  return res.data;
};

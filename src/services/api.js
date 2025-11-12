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

export const getCropByEmail = async (email) => {
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

import axios from "../lib/axios";
import { getRandomItems } from "../lib/utils/random";

export const postCrop = async (crop) => {
  const res = await axios.post("/crops", crop);
  return res.data;
};

export const getCrops = async () => {
  const res = await axios.get("/crops");
  return res.data;
};

export const getRandomCrops = async (count = 1) => {
  const crops = await getCrops();
  const randomizedCrops = getRandomItems(crops, count);
  return randomizedCrops;
};

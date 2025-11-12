import axios from "../lib/axios";

export const postCrop = async (crop) => {
  const res = await axios.post("/crops", crop);
  return res.data;
};

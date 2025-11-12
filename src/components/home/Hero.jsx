import { use } from "react";

import Slider from "../shared/Slider";
import CropSlide from "../crops/CropSlide";

const Hero = ({ cropsPromise }) => {
  const crops = use(cropsPromise);

  return (
    <Slider>
      {crops.map((crop) => (
        <CropSlide key={crop._id} crop={crop} />
      ))}
    </Slider>
  );
};

export default Hero;

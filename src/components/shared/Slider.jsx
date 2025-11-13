import SlickSlider from "react-slick";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 top-1/2 z-20 cursor-pointer text-white hover:text-accent transition-colors duration-200 ease-in-out"
    onClick={onClick}
  >
    <HiChevronLeft className="font-bold text-xl md:text-2xl lg:text-4xl" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-0 top-1/2 z-20 cursor-pointer text-white hover:text-accent transition-colors duration-200 ease-in-out"
    onClick={onClick}
  >
    <HiChevronRight className="font-bold text-xl md:text-2xl lg:text-4xl" />
  </div>
);

const Slider = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="slider-container overflow-hidden">
      <SlickSlider {...settings}>{children}</SlickSlider>
    </div>
  );
};

export default Slider;

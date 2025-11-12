import SlickSlider from "react-slick";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -left-8 top-1/2 z-20 cursor-pointer text-primary hover:text-accent transition-colors duration-200 ease-in-out"
    onClick={onClick}
  >
    <HiChevronLeft size={24} />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute -right-8 top-1/2 z-20 cursor-pointer text-primary hover:text-accent transition-colors duration-200 ease-in-out"
    onClick={onClick}
  >
    <HiChevronRight size={24} />
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
    <div className="slider-container">
      <SlickSlider {...settings}>{children}</SlickSlider>
    </div>
  );
};

export default Slider;

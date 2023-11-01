import { Carousel } from "antd";

const index = () => {
  return (
    <div className="w-full sm:w-3/4 mx-auto px-3">
      <Carousel
        dotPosition="top"
        draggable
        adaptiveHeight
        infinite
        accessibility
        autoplay
      >
        <div className="h-96 w-full relative">
          <div className="w-full h-[99%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg aspect-video object-cover">
            <p className="text-opacity-0" />
          </div>
        </div>
        <div className="h-96 w-full relative">
          <div className="w-full h-[99%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg aspect-video object-cover">
            <p className="text-opacity-0" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default index;

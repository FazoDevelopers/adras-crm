import { Carousel } from "antd";
import { useSelector } from "react-redux";

const index = () => {
  const { main_banners } = useSelector((state) => state.data);

  return (
    <div className="w-full sm:w-3/4 mx-auto px-3">
      <Carousel
        effect="fade"
        draggable
        adaptiveHeight
        infinite
        accessibility
        autoplay
      >
        {main_banners?.map?.((item, ind) => {
          return (
            <div key={ind} className="h-full w-full relative">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                alt="carousel image"
                className="w-full h-[99%] rounded-lg"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default index;

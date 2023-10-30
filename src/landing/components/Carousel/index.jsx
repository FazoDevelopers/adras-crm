import { Button, Carousel } from "antd";
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
            <div key={ind} className="h-96 w-full relative">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                alt="carousel image"
                className="w-full h-[99%] rounded-lg aspect-video object-cover"
              />
              <div className="absolute inset-0 grid place-items-center">
                <button
                  type="outline"
                  className="rounded-none border-2 border-black text-2xl px-3 py-1 font-semibold bg-white bg-opacity-50 backdrop-blur-sm"
                >
                  {item?.text}
                  {/* <span className="fa-solid fa-arrow-right" /> */}
                </button>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default index;

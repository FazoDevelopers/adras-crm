import axios from "axios";
import { Carousel } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState();

  async function getData() {
    try {
      let { data } = await axios.get("/news/get");
      setData(data?.news?.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full mx-auto px-3">
      <div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl text-center font-medium mb-5">
          Aksiya
        </h2>
      </div>
      <Carousel
        dotPosition="top"
        draggable
        adaptiveHeight
        slidesToShow={1.1}
        infinite
        autoplay
      >
        {data?.map?.((item, ind) => {
          return (
            <div key={ind} className="relative h-96 w-full px-4 md:px-14">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                alt="carousel image"
                className="w-full h-4/5 md:h-3/4 aspect-video object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 place-items-center z-10">
                <h3 className="text-xl md:text-3xl font-bold px-3 mt-auto bg-white bg-opacity-70 backdrop-blur-sm rounded-t-lg">
                  {item?.title}
                </h3>
                <h3 className="text-base md:text-xl font-bold font-serif px-3 mt-auto bg-white bg-opacity-70 backdrop-blur-sm rounded-t-lg">
                  Tugash sanasi: {item?.time.slice(4,11)} 
                </h3>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default index;

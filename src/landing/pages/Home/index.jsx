import { useEffect, useState } from "react";
import {
  Carousel,
  CategoryButton,
  Footer,
  Nav,
  StockCarousel,
} from "../../components";
import NewItems from "./NewItems";
import Category from "./Category";
import SecondCategory from "./SecondCategory";
import Newsletter from "./Newsletter";
import Top from "./Top";
import axios from "axios";

const index = () => {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      let { data } = await axios.get("/parent-category/get");
      setCategories(data?.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Nav />
      <div className="my-10">
        <Carousel />
      </div>
      <div className="w-full md:w-4/5 mx-auto px-3 md:px-0">
        <div className="flex items-center justify-center gap-10 flex-wrap my-20">
          {categories?.map?.((item, ind) => (
            <CategoryButton
              key={ind}
              id={item?.id}
              title={item?.name}
              img={item?.image}
            />
          ))}
        </div>
        <div className="my-10">
          <NewItems />
        </div>
        <div className="mb-10 mt-20">
          <StockCarousel />
        </div>
        <div className="my-10">
          <Top />
        </div>
      </div>
      <div className="my-10 mt-20 pr-5 pl-5 lg:pl-0">
        <Category />
      </div>
      <div>
        <div className="my-10 pr-5 pl-5 lg:pl-0 mb-52 lg:mb-0 translate-y-1/3 lg:translate-y-0">
          <SecondCategory />
        </div>
      </div>
      <div className="w-full md:w-4/5 mx-auto px-3 md:mt-20 max-[1024px]:mb-52 max-[600px]:mb-10 md:px-0 sm:translate-y-1/3 lg:translate-y-0">
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};

export default index;

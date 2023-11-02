import { Carousel } from 'antd'
import {
  Carousel as Car,
  CarouselPlaceholder,
  CategoryButton,
  CategoryButtonPlaceholder,
  Footer,
  Nav,
  StockCarousel,
  StockCarouselPlaceholder,
} from "../../components";
import NewItems from "./NewItems";
import Category from "./Category";
import SecondCategory from "./SecondCategory";
import Newsletter from "./Newsletter";
import Top from "./Top";
import { useSelector } from "react-redux";

const index = () => {
  const { main_banners, stock_banners, categories } = useSelector((state) => state.data);

  return (
    <>
      <Nav />
      <div className="my-10">
        {main_banners.length > 0 ? <Car /> : <CarouselPlaceholder />}
      </div>
      <div className="w-full md:w-4/5 mx-auto px-3 md:px-0">
        <Carousel draggable adaptiveHeight infinite accessibility autoplay slidesToShow={window.innerWidth > 1000 ? 5 : window.innerWidth > 600 ? 3 : 2}>
          {categories?.length > 0
            ? categories?.map?.((item, ind) => (
                <CategoryButton
                  key={ind}
                  id={item?.slug}
                  title={item?.name}
                  img={item?.image}
                />
              ))
            : new Array(10)
                .fill(null)
                .map((_, ind) => <CategoryButtonPlaceholder key={ind} />)}
        </Carousel>
        <div className="my-10">
          <NewItems />
        </div>
        <div className="mb-10 mt-20">
          {stock_banners.length > 0 ? (
            <StockCarousel />
          ) : (
            <StockCarouselPlaceholder />
          )}
        </div>
        <div className="my-10">
          <Top />
        </div>
      </div>
      <div className="my-10 mt-20 pr-5 pl-5 lg:pl-0">
        <Category />
      </div>
      <div>
        <div className="my-10 pr-5 pl-5 lg:pl-0 mb-[400px] lg:mb-0 -translate-y-1/3 lg:translate-y-0">
          <SecondCategory />
        </div>
      </div>
      <div className="w-full md:w-4/5 mx-auto px-3 md:mt-20 max-[1024px]:mb-52 max-[600px]:mb-10 max-[600px]:mt-[200px] md:px-0 sm:translate-y-1/3 lg:translate-y-0">
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};

export default index;

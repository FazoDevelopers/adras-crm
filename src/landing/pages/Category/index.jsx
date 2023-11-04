import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Footer, Nav, SubCategoryButton } from "../../components";

const index = () => {
  const { id: category } = useParams();
  const { categories, news_products } = useSelector((state) => state.data);
  const [products, setProducts] = useState([]);
  const [curCategory, setCategory] = useState([]);

  async function getProducts() {
    try {
      if (category === "new") {
        setProducts(news_products);
      } else {
        let { data } = await axios.get(`/products/get-by-category/${category}`);
        setProducts(data?.products?.data);
      }
    } catch (error) {
      return;
    }
  }

  function findCategory() {
    categories.forEach((i) => {
      if (i?.slug === category) {
        setCategory(i);
      }
    });
  }

  useEffect(() => {
    getProducts();
    findCategory();
  }, []);

  return (
    <>
      <Nav />
      {curCategory?.image_2?.length > 0 && (
        <div className="w-full h-[70vh]">
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${curCategory?.image_2}`}
            alt="category image"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      {curCategory?.child_categories?.length > 0 && (
        <div className="flex gap-x-6 gap-y-3 overflow-x-auto scrollbar-none my-10">
          {curCategory?.child_categories?.map?.((i, ind) => (
            <SubCategoryButton
              to={`${i?.slug}`}
              image={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${i?.image}`}
              title={i?.name}
            />
          ))}
        </div>
      )}
      <div className="md:w-4/5 mx-auto">
        <h2 className="text-3xl font-semibold text-center my-5 md:text-5xl">
          {category === "new" ? "Yangi mahsulotlar" : "Mahsulotlar"}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-2 md:px-0">
          {products.map((product, ind) => {
            return <Card data={product} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;

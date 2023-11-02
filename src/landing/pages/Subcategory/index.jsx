import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Footer, Nav } from "../../components";

const index = () => {
  const { id: category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [curSubCategory, setSubCategory] = useState([]);

  async function getSubCategories() {
    try {
      let { data } = await axios.get(`/child-category/get`);
      setCategories(data?.data);
    } catch (error) {
      return;
    }
  }

  async function getProducts() {
    try {
      let { data } = await axios.get(`/products/get-by-category/${category}`);
      setProducts(data?.products?.data);
    } catch (error) {
      return;
    }
  }

  function findSubCategory() {
    console.log(categories);
    categories.map((c) => {
      console.log(c);
        if(c.slug === category){
        }
    });
  }

  useEffect(() => {
    // getProducts();
    getSubCategories()
    findSubCategory();
  }, []);

  return (
    <>
      <Nav />
      <div className="w-full h-[60vh]">
        {/* <img
          src="/carousel-1.jpg"
          alt="category image"
          className="w-full max-h-full object-cover object-center"
        /> */}
      </div>
      <div className="md:w-4/5 mx-auto">
        <h2 className="text-3xl font-semibold text-center my-5 md:text-5xl">
          Mahsulotlar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0">
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

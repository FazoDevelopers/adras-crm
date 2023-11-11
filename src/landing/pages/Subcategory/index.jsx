import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Footer, Nav } from "../../components";

const index = () => {
  const { id: category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next_page, setNextPage] = useState("");
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
      let { data } = await axios.get(
        `/products/get-by-parent-category/${category}`
      );
      setProducts(data?.products?.data);
        setNextPage(data?.products?.next_page_url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return;
    }
  }
  
  async function getMore() {
    try {
      let { data } = await axios.get(next_page);
      setProducts((prev) => [...prev, ...data?.products?.data]);
      setNextPage(data?.products?.next_page_url);
    } catch (error) {
      return;
    }
  }

  function findSubcategory() {
    categories?.map((c) => {
      if (c?.slug === category) {
        setSubCategory(c);
      }
    });
  }

  useEffect(() => {
    getProducts();
    getSubCategories();
  }, []);

  useEffect(() => {
    findSubcategory();
  }, [categories]);

  if (loading) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center px-2">
          <img
            draggable={false}
            src="../logo.png"
            alt=""
            className="animate-pulse select-none"
          />
          <h1>Yuklanmoqda...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="w-full md:h-[60vh] p-1">
        <img
          src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${curSubCategory?.image_2}`}
          alt="category image"
          className="w-full max-h-full object-cover object-center rounded-lg"
        />
      </div>
      <div className="md:w-4/5 mx-auto">
        <h2 className="text-3xl font-semibold text-center my-5 md:text-5xl">
          Mahsulotlar
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-2 md:px-0">
          {products.map((product, ind) => {
            return <Card data={product} />;
          })}
        </div>
        <Button
          hidden={next_page == null}
          type="default"
          className="w-full mt-20 h-10"
          onClick={getMore}
        >
          Ko'proq ko'rish
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default index;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";

const index = () => {
  const { categories } = useSelector((state) => state.data);
  const [products, setProducts] = useState([]);

  async function getCategory() {
    try {
      let { data } = await axios.get(
        `/products/get-by-category/${categories?.[0]?.slug}`
      );
      setProducts(data?.products?.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getCategory();
  }, [categories]);

  return (
    <div className="grid gap-3 max-[700px]:grid-cols-2 grid-cols-3 lg:grid-cols-4">
      <div className="category-image-wrapper col-span-3 row-span-3 relative">
        <div className="category-main-image absolute -top-6 right-6 flex flex-col gap-3">
          <h3 className="text-3xl sm:text-5xl font-semibold">
            {categories?.[0]?.name}
          </h3>
          <Link
            to={`/category/${categories?.[0]?.slug}`}
            className="category-image-see-more text-lg bg-white bg-opacity-50"
          >
            Mahsulotlarni ko'rish{" "}
            <span className="fa-solid fa-chevron-right transition" />
          </Link>
        </div>
        <img
          src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${categories?.[0]?.image_2}`}
          alt="category image"
          className="w-full max-h-[400px] lg:min-h-full object-cover rounded-lg border border-gray-400"
        />
      </div>
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 max-[1024px]:col-span-3 lg:flex-col gap-3 md:gap-[53px] max-[1024px]:-translate-y-1/2">
        {products?.[0] && (
          <Link
            to={`/category/${categories?.[0]?.slug}`}
            className="bg-white grid lg:grid-cols-2 gap-2 border rounded-lg p-1"
          >
            <div className="w-[200px] lg:w-full">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[0]?.image}`}
                alt="cateogry product image"
                className="rounded-lg w-full h-full object-cover border"
              />
            </div>
            <div className="px-3">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{products?.[0]?.name}</h3>
                <p>Narx: UZS {products?.[0]?.price}</p>
              </div>
              <hr className="my-3" />
              <p className="text-sm line-clamp-2">
                {products?.[0]?.description}{" "}
              </p>
            </div>
          </Link>
        )}
        {products?.[1] && (
          <Link
            to={`/category/${categories?.[0]?.slug}`}
            className="bg-white grid lg:grid-cols-2 gap-2 border rounded-lg p-1"
          >
            <div className="max-sm:w-[200px] lg:w-full">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[1]?.image}`}
                alt="cateogry product image"
                className="rounded-lg w-full h-full object-cover border"
              />
            </div>
            <div className="px-3">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{products?.[1]?.name}</h3>
                <p>Narx: UZS {products?.[1]?.price}</p>
              </div>
              <hr className="my-3" />
              <p className="text-sm line-clamp-2">
                {products?.[1]?.description}
              </p>
            </div>
          </Link>
        )}
        {products?.[2] && (
          <Link
            to={`/category/${categories?.[0]?.slug}`}
            className="bg-white grid lg:grid-cols-2 gap-2 border rounded-lg p-1"
          >
            <div className="w-[200px] lg:w-full">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[2]?.image}`}
                alt="cateogry product image"
                className="rounded-lg w-full h-full object-cover border"
              />
            </div>
            <div className="px-3">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{products?.[2]?.name}</h3>
                <p>Narx: UZS {products?.[2]?.price}</p>
              </div>
              <hr className="my-3" />
              <p className="text-sm line-clamp-2">
                {products?.[2]?.description}
              </p>
            </div>
          </Link>
        )}
        {products?.[3] && (
          <Link
            to={`/category/${categories?.[0]?.slug}`}
            className="bg-white grid md:grid-cols-2 gap-2 border rounded-lg p-1"
          >
            <div className="w-[200px] lg:w-full">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[3]?.image}`}
                alt="cateogry product image"
                className="rounded-lg w-full h-full object-cover border"
              />
            </div>
            <div className="px-3">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{products?.[3]?.name}</h3>
                <p>Narx: UZS {products?.[3]?.price}</p>
              </div>
              <hr className="my-3" />
              <p className="text-sm line-clamp-2">
                {products?.[3]?.description}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default index;

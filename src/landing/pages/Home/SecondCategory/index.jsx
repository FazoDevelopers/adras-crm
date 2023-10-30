import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const index = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  async function getCategory() {
    try {
      let { data } = await axios.get("/parent-category/get");
      setCategory(data?.data);
    } catch (error) {
      return;
    }
  }

  async function getProducts() {
    try {
      let { data } = await axios.get(
        `/products/get-by-category/${category?.[1]?.child_categories?.[0]?.slug}`
      );
      setProducts(data?.products?.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    <>
      {category?.[1] && (
        <div className="grid gap-3 grid-cols-3 lg:grid-cols-4">
          <div className="z-10 flex max-[1024px]:col-span-3 lg:flex-col gap-3 md:gap-[53px] max-[1024px]:translate-y-[200%]">
            {products?.[0] && (
              <div className="bg-white grid lg:grid-cols-2 gap-2 border rounded-lg p-1">
                <div className="w-[250px] lg:w-full h-[170px]">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[0]?.image}`}
                    alt="cateogry product image"
                    className="rounded-lg w-full h-full object-cover border"
                  />
                </div>
                <div className="px-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      {products?.[0]?.name}
                    </h3>
                    <p>Narx: UZS {products?.[0]?.price}</p>
                  </div>
                  <hr className="my-3" />
                  <p className="text-sm line-clamp-2">
                    {products?.[0]?.description}{" "}
                  </p>
                </div>
              </div>
            )}
            {products?.[1] && (
              <div className="bg-white grid lg:grid-cols-2 gap-2 border rounded-lg p-1">
                <div className="w-[250px] lg:w-full">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[1]?.image}`}
                    alt="cateogry product image"
                    className="rounded-lg w-full h-full object-cover border"
                  />
                </div>
                <div className="px-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      {products?.[1]?.name}
                    </h3>
                    <p>Narx: UZS {products?.[1]?.price}</p>
                  </div>
                  <hr className="my-3" />
                  <p className="text-sm line-clamp-2">
                    {products?.[1]?.description}
                  </p>
                </div>
              </div>
            )}
            {products?.[2] && (
              <div className="bg-white hidden sm:grid lg:grid-cols-2 gap-2 border rounded-lg p-1">
                <div className="w-[250px] lg:w-full">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[2]?.image}`}
                    alt="cateogry product image"
                    className="rounded-lg w-full h-full object-cover border"
                  />
                </div>
                <div className="px-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      {products?.[2]?.name}
                    </h3>
                    <p>Narx: UZS {products?.[2]?.price}</p>
                  </div>
                  <hr className="my-3" />
                  <p className="text-sm line-clamp-2">
                    {products?.[2]?.description}
                  </p>
                </div>
              </div>
            )}
            {products?.[3] && (
              <div className="bg-white hidden lg:grid md:grid-cols-2 gap-2 border rounded-lg p-1">
                <div className="w-[250px] lg:w-full">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${products?.[3]?.image}`}
                    alt="cateogry product image"
                    className="rounded-lg w-full h-full object-cover border"
                  />
                </div>
                <div className="px-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      {products?.[3]?.name}
                    </h3>
                    <p>Narx: UZS {products?.[3]?.price}</p>
                  </div>
                  <hr className="my-3" />
                  <p className="text-sm line-clamp-2">
                    {products?.[3]?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="category-image-wrapper col-span-3 row-span-3 relative">
            <div className="category-main-image absolute -top-6 left-1/2 flex flex-col gap-3">
              <h3 className="text-3xl sm:text-5xl font-semibold">
                {category?.[1]?.name}
              </h3>
              <Link
                to={`/category/${category?.[1]?.id}`}
                className="category-image-see-more text-lg"
              >
                Mahsulotlarni ko'rish{" "}
                <span className="fa-solid fa-chevron-right transition" />
              </Link>
            </div>
            <img
              src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${category?.[1]?.image_2}`}
              alt="category image"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default index;

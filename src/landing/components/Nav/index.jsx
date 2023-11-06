import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import Card from "../Card";

const index = () => {
  const searchModal = useRef();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "eng",
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  async function handleSearch(value) {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://api.abdullajonov.uz/adras-market-api/api/search?query=${value?.q}`
      );
      setProducts(response?.data?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return;
    }
  }

  return (
    <nav className="z-50 sticky top-0 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center sm:place-items-center p-2">
        <Link
          to="/"
          className="hidden sm:block text-4xl font-semibold"
          style={{ color: "rgb(30, 63, 134)" }}
        >
          adras
        </Link>
        <Link to="/" className="max-w-[50px] hidden sm:block">
          <img src="/logo-icon.png" alt="Adras logo" />
        </Link>
        <Link to="/" className="max-w-[130px] block sm:hidden">
          <img src="/logo.png" alt="Adras logo" />
        </Link>
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            className="bg-blue-500 w-8"
            icon={<span className="fa-solid fa-search" />}
            onClick={() => searchModal.current.showModal()}
          />
          <div id="google_translate_element" className="border"></div>
        </div>
      </div>
      <dialog ref={searchModal} className="z-10 w-screen p-3 rounded-lg">
        <Form onFinish={handleSearch}>
          <div className="w-full flex items-center justify-between">
            <h2>Mahsulorlarni izlash:</h2>
            <Button
              type="outline"
              icon={<span className="fa-solid fa-x" />}
              onClick={() => searchModal.current.close()}
            />
          </div>
          <Form.Item name="q" required>
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="bg-blue-500"
              htmlType="submit"
              loading={loading}
              icon={<span className="fa-solid fa-search" />}
            >
              Izlash
            </Button>
          </Form.Item>
        </Form>
        <div className="grid min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0">
          {products.length > 0 ? (
            products.map((product, ind) => {
              return <Card key={ind} data={product} />;
            })
          ) : (
            <h3 className="uppercase font-bold opacity-50 text-2xl whitespace-nowrap">
              Mahsulotlar yo'q
            </h3>
          )}
        </div>
      </dialog>
    </nav>
  );
};

export default index;

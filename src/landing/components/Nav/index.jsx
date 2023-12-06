import axios from "axios";
import Card from "../Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Select } from "antd";
import { PRODUCT_NAMES } from "../../constants";

const index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "uz",
        includedLanguages: "uz,en,ru",
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
          translate="no"
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
            icon={<span className="fa-solid fa-search w-8" />}
            onClick={() => setIsSearchModalOpen(true)}
          />
          <div id="google_translate_element" className="border"></div>
        </div>
      </div>
      <Modal
        width={"100%"}
        destroyOnClose
        footer={[]}
        onCancel={() => setIsSearchModalOpen(false)}
        open={isSearchModalOpen}
        className="z-10 p-3 rounded-lg"
        title="Mahsulotlarni izlash"
      >
        <Form onFinish={handleSearch}>
          <Form.Item name="q" required>
            <Select
              showSearch
              placeholder="Mahsulot nomi"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={PRODUCT_NAMES.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            />
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
      </Modal>
    </nav>
  );
};

export default index;

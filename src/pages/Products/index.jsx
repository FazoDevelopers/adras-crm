import axios from "axios";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({
    products: [],
    categories: [],
    subcategories: [],
  });
  const [pagination, setPagination] = useState({
    next: null,
    prev: null,
  });
  const [addedProductSlug, setAddedProductSlug] = useState();
  const [image, setImage] = useState();
  const [parentSlug, setParentSlug] = useState();
  const [slug, setSlug] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  async function getData() {
    try {
      let products = await axios.get("/products/get");
      let categories = await axios.get("/parent-category/get");
      let subcategories = await axios.get("/child-category/get");
      setPagination({
        next: products?.data?.products?.next_page_url,
        prev: products?.data?.products?.prev_page_url,
      });
      setData((prev) => ({
        ...prev,
        products: products?.data?.products?.data,
        categories: categories?.data?.data,
        subcategories: subcategories?.data?.data,
      }));
    } catch (error) {
      return;
    }
  }

  async function getChildCategories(slug) {
    try {
      let subcategories = await axios.get("/child-category/get");
      let category = data?.categories?.find?.((item) => item?.slug === slug);
      let foundSubcategories = [];
      subcategories?.data?.data?.forEach?.((item) => {
        if (item?.parent_id == category?.id) {
          foundSubcategories.push(item);
        }
      });
      setData((prev) => ({
        ...prev,
        subcategories: foundSubcategories,
      }));
    } catch (error) {
      return;
    }
  }

  async function getPaginationData(url) {
    try {
      let products = await axios.get(url);
      setPagination({
        next: products?.data?.products?.next_page_url,
        prev: products?.data?.products?.prev_page_url,
      });
      setData((prev) => ({
        ...prev,
        products: products?.data?.products?.data,
      }));
    } catch (error) {
      return;
    }
  }

  async function searchProduct(value) {
    try {
      let response = await axios.get(
        `https://api.abdullajonov.uz/adras-market-api/api/search?query=${value?.q}`
      );
      setPagination({
        next: response?.data?.data?.next_page_url,
        prev: response?.data?.data?.prev_page_url,
      });
      setData((prev) => ({
        ...prev,
        products: response?.data?.data?.data,
      }));
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleCreate(values) {
    setLoading(true);
    let data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("image", image);
    data.append("category", parentSlug);
    data.append("sub_category", slug);
    data.append("sku", values.sku);
    data.append("amount", values.amount);
    data.append("type", values.type);
    data.append("shipping_price", values.shipping_price);
    if (!values.shipping_price) data.delete("shipping_price");
    if (!slug) data.delete("sub_category");
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/products/store`,
        data
      );
      if (response.status === 200) {
        setAddedProductSlug(response?.data?.slug);
        getData();
        setImage(null);
        setSlug(null);
        setParentSlug(null);
        setIsAddModalOpen(false);
        setLoading(false);
        messageApi.success("Mahsulot qo'shildi!");
      }
    } catch (error) {
      if (
        error?.response?.data?.message?.startsWith(
          `The image field must be a file`
        )
      ) {
        messageApi.error(
          "Kiritilgan rasm .jpeg, png, jpg, gif, svg turida bo'lishi kerak."
        );
      } else {
        messageApi.error(
          "Nimadadir xatolik ketdi! Kiritilgan ma'lumotlarni tekshiring va qaytadan uruning."
        );
      }
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    console.log("p", parentSlug);
    console.log("", slug);
    let data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("image", image);
    data.append("category", parentSlug);
    data.append("sub_category", slug);
    data.append("sku", values.sku);
    data.append("amount", values.amount);
    data.append("type", values.type);
    data.append("shipping_price", values.shipping_price);
    if (!image) data.delete("image");
    if (!values.name) data.delete("name");
    if (!values.description) data.delete("description");
    if (!values.price) data.delete("price");
    if (!parentSlug) data.delete("category");
    if (!slug) data.delete("sub_category");
    if (!values.sku) data.delete("sku");
    if (!values.amount) data.delete("amount");
    if (!values.type) data.delete("type");
    if (!values.shipping_price) data.delete("shipping_price");
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/products/${
          modalData?.id
        }/update`,
        data
      );
      if (response.status === 200) {
        getData();
        setSlug(null);
        setParentSlug(null);
        setIsEditModalOpen(false);
        setLoading(false);
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      let response = await axios.delete(
        `/admin/${localStorage.getItem("adras-token")}/products/${id}`
      );
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      return;
    }
  }

  async function handleAddVariant(values) {
    setLoading(true);
    let data = new FormData();
    data.append("image", image);
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("oldPrice", values.oldPrice);
    data.append("product_slug", addedProductSlug);
    if (!values.oldPrice) data.delete("oldPrice");
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/product-type/store`,
        data
      );
      if (response.status === 200) {
        getData();
        setImage(null);
        form.resetFields();
        setLoading(false);
        messageApi.success(
          "Mahsulot varianti qo'shildi! Yana qo'shish uchun formani to'ldiring."
        );
      }
    } catch (error) {
      if (
        error?.response?.data?.message?.startsWith(
          `The image field must be a file`
        )
      ) {
        messageApi.error(
          "Kiritilgan rasm .jpeg, png, jpg, gif, svg turida bo'lishi kerak."
        );
      } else {
        messageApi.error(
          "Nimadadir xatolik ketdi! Kiritilgan ma'lumotlarni tekshiring va qaytadan uruning."
        );
      }
      setLoading(false);
    }
  }

  async function handleDeleteVariant(id) {
    try {
      let response = await axios.delete(
        `/admin/${localStorage.getItem("adras-token")}/product-type/delete/${id}`
      );
      if (response.status === 200) {
        getData();
        setIsVariantModalOpen(false)
      }
    } catch (error) {
      return;
    }
  }
 
  return (
    <div>
      {contextHolder}
      {/* add */}
      <div>
        <Button
          type="primary"
          className="bg-blue-500 ml-auto"
          icon={<span className="fa-solid fa-plus" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Yangi mahsulot qo'shish
        </Button>
        <Modal
          title="Mahsulot qo'shish"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          destroyOnClose={true}
          footer={[]}
        >
          <Form name="form" onFinish={handleCreate} autoComplete="off">
            <Form.Item
              label="Nomi"
              name="name"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="border rounded border-blue-500 p-2" />
            </Form.Item>
            <Form.Item
              label="SKU"
              name="sku"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="border rounded border-blue-500 p-2" />
            </Form.Item>
            <Form.Item
              label="Tafsilot"
              name="description"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input.TextArea className="border rounded border-blue-500 p-2" />
            </Form.Item>
            <div className="grid grid-cols-2 gap-5">
              <Form.Item
                label="Qiymati"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  className="border rounded border-blue-500"
                />
              </Form.Item>
              <Form.Item
                label="O'lchov birligi"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Select className="w-full border rounded-lg border-blue-500">
                  <option value="dona">Dona</option>
                  <option value="quti">Quti</option>
                  <option value="pack">Bog'lam</option>
                  <option value="kg">Kilogram</option>
                  <option value="gr">Gram</option>
                  <option value="mlgr">Milligram</option>
                  <option value="l">Litr</option>
                  <option value="ml">Millilitr</option>
                  <option value="m">Metr</option>
                  <option value="sm">Santimetr</option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label="Narxi"
              name="price"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                type="number"
                min={0}
                className="border rounded border-blue-500 p-2"
              />
            </Form.Item>
            <Form.Item label="Eski narxi" name="shipping_price">
              <Input
                type="number"
                min={0}
                className="border rounded border-blue-500 p-2"
              />
            </Form.Item>
            <Form.Item
              label="Kategoriya"
              name="cetegory"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                className="w-full border rounded-lg border-blue-500"
                onChange={(e) => {
                  setParentSlug(e);
                  getChildCategories(e);
                }}
              >
                {data?.categories?.map?.((item, ind) => (
                  <option key={ind} value={item?.slug}>
                    {item?.name}
                  </option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Subkategoriya" name="sub_cetegory">
              <Select
                disabled={!parentSlug}
                className="w-full border rounded-lg border-blue-500"
                onChange={(e) => setSlug(e)}
              >
                {data?.subcategories?.map?.((item, ind) => (
                  <option key={ind} value={item?.slug}>
                    {item?.name}
                  </option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Rasm"
              name="image"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <input
                type="file"
                name="image"
                className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="bg-blue-500"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* table */}
      <div className="mt-5 mb-2">
        <h3 className="text-3xl font-semibold">Mahsulotlar: </h3>
        <div className="my-2">
          <Form
            name="search"
            onFinish={searchProduct}
            className="flex items-center w-full"
          >
            <Form.Item label="Qidirish" name="q" className="w-full">
              <Input className="border rounded border-blue-500 " />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Izlash
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 md:px-0 my-3">
          {data?.products?.map?.((item, ind) => (
            <div key={ind}>
              <div className="group border rounded-lg bg-slate-100 border-gray-300 p-1">
                <div className="aspect-h-1 aspect-w-1 max-w-full overflow-hidden rounded-lg bg-gray-200 w-72">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                    alt={item?.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="mt-4 line-clamp-1 text-sm">{item?.description}</p>
                <h3 className="mt-1 text-lg sm:text-xl line-clamp-1 font-medium text-gray-700">
                  {item?.name}
                </h3>
                {item?.shipping_price ? (
                  <div className="mt-1 flex items-center justify-start gap-5 text-sm sm:text-base">
                    <p className="line-through opacity-75">
                      UZS {item?.shipping_price}
                    </p>
                    <p translate="no" className="font-semibold">
                      UZS {item?.price}
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-xl text-gray-900">
                    <span className="font-semibold">UZS {item?.price}</span>
                  </p>
                )}
                <Button
                  type="primary"
                  className="bg-blue-500 w-full mt-2"
                  icon={<span className="fa-solid fa-cart-shopping" />}
                  onClick={() => {}}
                >
                  Sotib olish
                </Button>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-3 my-2">
                {item?.types?.length > 0 && (
                  <Button
                    onClick={() => {
                      setModalData(item?.types);
                      setIsVariantModalOpen(true);
                    }}
                    icon={<span className="fa-solid fa-bars" />}
                  />
                )}
                <Button
                  onClick={() => {
                    setModalData(item);
                    setIsModalOpen(true);
                  }}
                  icon={<span className="fa-solid fa-eye" />}
                />
                <Button
                  onClick={() => {
                    setModalData(item);
                    setIsEditModalOpen(true);
                  }}
                  icon={<span className="fa-solid fa-edit" />}
                />
                <Button
                  onClick={() => handleDelete(item?.id)}
                  danger
                  icon={<span className="fa-solid fa-trash" />}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <h4 className="text-lg font-semibold">Paginatsiya:</h4>
          <Button.Group>
            <Button
              disabled={pagination?.prev === null}
              icon={<span className="fa-solid fa-arrow-left" />}
              onClick={() => getPaginationData(pagination?.prev)}
            />
            <Button
              disabled={pagination?.next === null}
              icon={<span className="fa-solid fa-arrow-right" />}
              onClick={() => getPaginationData(pagination?.next)}
            />
          </Button.Group>
        </div>
      </div>

      {/* see */}
      <Modal
        title="Mahsulot"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="w-full">
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
            alt="image"
            className="min-w-full w-full"
          />
        </div>
        <table className="text-left w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="py-3">Nomi:</th>
              <td>{modalData?.name}</td>
            </tr>
            <tr>
              <th className="py-3">SKU:</th>
              <td>{modalData?.sku}</td>
            </tr>
            <tr>
              <th className="py-3">Qiymati:</th>
              <td>{modalData?.amount}</td>
            </tr>
            <tr>
              <th className="py-3">O'lchov birligi:</th>
              <td>{modalData?.type}</td>
            </tr>
            <tr>
              <th className="py-3">Tafsiloti:</th>
              <td>{modalData?.description}</td>
            </tr>
            <tr>
              <th className="py-3">Narxi:</th>
              <td>{modalData?.price}</td>
            </tr>
            <tr>
              <th className="py-3">Eski narxi:</th>
              <td>{modalData?.shipping_price}</td>
            </tr>
            <tr>
              <th className="py-3">Yaratilgan sana:</th>
              <td>{modalData?.created_at?.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      {/* edit */}
      <Modal
        title="Mahsulotni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setModalData({});
        }}
        destroyOnClose={true}
        footer={[]}
      >
        <div className="w-full my-2">
          Hozirgi rasm:
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
            alt="image"
            className="min-w-full w-full"
          />
        </div>
        <Form name="edit" onFinish={handleEdit} autoComplete="off">
          <Form.Item label="Nomi" name="name">
            <Input
              defaultValue={modalData?.name}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="SKU" name="sku">
            <Input
              defaultValue={modalData?.sku}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Qiymati" name="amount">
            <Input
              defaultValue={modalData?.amount}
              min={0}
              className="border rounded border-blue-500"
            />
          </Form.Item>
          <Form.Item label="O'lchov birligi" name="type">
            <Select
              defaultValue={modalData?.type}
              className="w-full border rounded-lg border-blue-500"
            >
              <option value="dona">Dona</option>
              <option value="quti">Quti</option>
              <option value="pack">Bog'lam</option>
              <option value="kg">Kilogram</option>
              <option value="gr">Gram</option>
              <option value="mlgr">Milligram</option>
              <option value="l">Litr</option>
              <option value="ml">Millilitr</option>
              <option value="m">Metr</option>
              <option value="sm">Santimetr</option>
            </Select>
          </Form.Item>
          <Form.Item label="Tafsilot" name="description">
            <Input.TextArea
              defaultValue={modalData?.description}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Narxi" name="price">
            <Input
              defaultValue={modalData?.price}
              type="number"
              min={0}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>

          <Form.Item label="Kategoriya" name="cetegory">
            <Select
              defaultValue={modalData?.category}
              className="w-full border rounded-lg border-blue-500"
              onChange={(e) => {
                setParentSlug(e);
                getChildCategories(e);
              }}
            >
              {data?.categories?.map?.((item, ind) => (
                <option key={ind} value={item?.slug}>
                  {item?.name}
                </option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Subkategoriya" name="sub_cetegory">
            <Select
              defaultValue={modalData?.sub_category}
              className="w-full border rounded-lg border-blue-500"
              onChange={(e) => setSlug(e)}
            >
              {data?.subcategories?.map?.((item, ind) => (
                <option key={ind} value={item?.slug}>
                  {item?.name}
                </option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Rasm" name="image">
            <input
              type="file"
              name="image"
              className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
          <Form.Item label="Eski narxi" name="shipping_price">
            <Input
              defaultValue={modalData?.shipping_price}
              type="number"
              min={0}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              className="ml-5"
              onClick={() => {
                setAddedProductSlug(modalData?.slug);
              }}
              icon={<span className="fa-solid fa-plus" />}
            >
              Variant qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* variant add */}
      <Modal
        title="Mahsulotga yangi variant qo'shish"
        open={addedProductSlug}
        onCancel={() => setAddedProductSlug(false)}
        destroyOnClose={true}
        footer={[]}
      >
        <Form
          form={form}
          name="variant"
          onFinish={handleAddVariant}
          autoComplete="off"
        >
          <Form.Item
            label="Nomi"
            name="name"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input className="border rounded border-blue-500 p-2" />
          </Form.Item>
          <Form.Item
            label="Tafsilot"
            name="description"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input.TextArea className="border rounded border-blue-500 p-2" />
          </Form.Item>
          <Form.Item
            label="Narxi"
            name="price"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              type="number"
              min={0}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Eski narxi" name="oldPrice">
            <Input
              type="number"
              min={0}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item
            label="Rasm"
            name="image"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <input
              type="file"
              name="image"
              className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
            >
              Submit
            </Button>
            <Button
              type="default"
              htmlType="reset"
              onClick={() => setAddedProductSlug(null)}
              className="ml-5"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* variant see */}
      <Modal
        title="Mahsulot variantlari"
        open={isVariantModalOpen}
        onCancel={() => setIsVariantModalOpen(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        {modalData?.map?.((modalData, ind) => (
          <>
            <div className="w-full my-1">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
                alt="image"
                className="min-w-full w-full"
              />
            </div>
            <table className="text-left w-full">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="py-1">Nomi:</th>
                  <td>{modalData?.name}</td>
                </tr>
                <tr>
                  <th className="py-1">Tafsiloti:</th>
                  <td>{modalData?.description}</td>
                </tr>
                <tr>
                  <th className="py-1">Narxi:</th>
                  <td>{modalData?.price}</td>
                </tr>
                {modalData?.oldPrice && (
                  <tr>
                    <th className="py-1">Eski narxi:</th>
                    <td>{modalData?.oldPrice}</td>
                  </tr>
                )}
                <tr>
                  <th className="py-1">Yaratilgan sana:</th>
                  <td>{modalData?.created_at?.slice(0, 10)}</td>
                </tr>
                <tr>
                  <th className="py-1"></th>
                  <td>
                    <Button danger onClick={()=>handleDeleteVariant(modalData?.id)}>
                      O'chirish
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ))}
      </Modal>
    </div>
  );
};

export default index;

import axios from "axios";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState({
    products: [],
    subcategories: [],
  });
  const [image, setImage] = useState();
  const [slug, setSlug] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let products = await axios.get("/products/get");
      let subcategories = await axios.get("/child-category/get");
      setData((prev) => ({
        ...prev,
        products: products?.data?.products?.data,
        subcategories: subcategories?.data?.data,
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
    data.append("category", slug);
    data.append("sku", values.sku);
    data.append("amount", values.amount);
    data.append("type", values.type);
    data.append("shipping_price", values.shipping_price);
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/products/store`,
        data
      );
      if (response.status === 200) {
        getData();
        setImage(null);
        setSlug(null);
        setLoading(false);
      }
    } catch (error) {
      setImage(null);
      setSlug(null);
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("image", image);
    data.append("category", slug);
    data.append("sku", values.sku);
    data.append("amount", values.amount);
    data.append("type", values.type);
    data.append("shipping_price", values.shipping_price);
    if (!image) data.delete("image");
    if (!values.name) data.delete("name");
    if (!values.description) data.delete("description");
    if (!values.price) data.delete("price");
    if (!values.category) data.delete("category");
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
        setIsEditModalOpen(false);
        setLoading(false);
      }
    } catch (error) {
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

  return (
    <div>
      <details>
        <summary className="text-3xl font-semibold mb-3">
          Yangi mahsulot qo'shish:
        </summary>
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
              <Input min={0} className="border rounded border-blue-500" />
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
            label="Subkategoriya"
            name="cetegory"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Select
              type="file"
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
      </details>
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-5">#</th>
              <th>Nomi</th>
              <th>Rasmi</th>
              <th>Narxi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <th>{item?.name}</th>
                <td className="text-center">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                    alt="category image"
                    className="w-10 mx-auto"
                  />
                </td>
                <th>{item?.price}</th>
                <td className="w-52">
                  <div className="flex items-center flex-wrap gap-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              <td>{modalData?.created_at.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <Modal
        title="Mahsulotni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[]}
      >
        <div className="w-full">
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
          <Form.Item label="Subkategoriya" name="cetegory">
            <Select
              defaultValue={modalData?.category}
              type="file"
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default index;

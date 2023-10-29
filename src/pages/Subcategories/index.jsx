import axios from "axios";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState({
    categories: [],
    subcategories: [],
  });
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let categories = await axios.get("/parent-category/get");
      let subcategories = await axios.get("/child-category/get");
      setData((prev) => ({
        ...prev,
        categories: categories?.data?.data,
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
    data.append("image", image);
    data.append("image_2", image2);
    data.append("parent_id", values.parent_id);
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/child-category/store`,
        data
      );
      if (response.status === 201) {
        getData();
        setImage(null);
        setLoading(false);
      }
    } catch (error) {
      setImage(null);
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let data = new FormData();
    data.append("name", values.name);
    data.append("image", image);
    data.append("image_2", image2);
    data.append("parent_id", values.parent_id);
    if (!image) data.delete("image");
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/child-category/${
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
        `/admin/${localStorage.getItem("adras-token")}/child-category/${id}`
      );
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      return;
    }
  }
  console.log(data);
  return (
    <div>
      <div>
        <h3 className="text-3xl font-semibold mb-3">
          Yangi subkategoriya qo'shish:
        </h3>
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
            label="Kategoriya"
            name="parent_id"
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
            >
              {data?.categories?.map?.((item, ind) => (
                <option key={ind} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ikon rasmi"
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
          <Form.Item
            label="Banner rasmi"
            name="image_2"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <input
              type="file"
              name="image_2"
              className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
              onChange={(e) => setImage2(e.target.files[0])}
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
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-5">#</th>
              <th>Nomi</th>
              <th>Rasmi</th>
              <th>Kategoriya</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.subcategories?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <th>{item?.name}</th>
                <td className="text-center">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image_2}`}
                    alt="category image"
                    className="w-10 mx-auto"
                  />
                </td>
                <th>
                  {data?.categories?.map?.(
                    (i) => i?.id == item?.parent_id && i?.name
                  )}
                </th>
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
        title="Subkategoriya"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="w-full">
          Hozirgi Ikon rasmi:
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
            alt="image"
            className="min-w-full w-full"
          />
        </div>
        <div className="w-full">
          Hozirgi Banner rasmi:
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image_2}`}
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
              <th className="py-3">Kategoriya:</th>
              <td>
                {data?.categories?.map?.(
                  (i) => i?.id == modalData?.parent_id && i?.name
                )}
              </td>
            </tr>
            <tr>
              <th className="py-3">Yaratilgan sana:</th>
              <td>{modalData?.created_at.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <Modal
        title="Subategoriyani tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[]}
      >
        <div className="w-full">
          Hozirgi Ikon rasmi
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
            alt="image"
            className="min-w-full w-full"
          />
        </div>
        <div className="w-full">
          Hozirgi Banner rasmi
          <img
            src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image_2}`}
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
          <Form.Item label="Ikon rasmi" name="image">
            <input
              type="file"
              name="image"
              className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
          <Form.Item label="banner rasmi" name="image">
            <input
              type="file"
              name="image"
              className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
              onChange={(e) => setImage2(e.target.files[0])}
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

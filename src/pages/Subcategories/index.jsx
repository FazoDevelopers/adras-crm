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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
        setImage2(null);
        setIsAddModalOpen(false);
        setLoading(false);
      }
    } catch (error) {
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
    if (!image2) data.delete("image_2");
    if (!values.name) data.delete("name");
    if (!values.parent_id) data.delete("parent_id");
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

  return (
    <div>
      {/* add */}
      <div>
        <Button
          type="primary"
          className="bg-blue-500"
          icon={<span className="fa-solid fa-plus" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Yangi subkategoriya qo'shish
        </Button>
        <Modal
          title="Subkategoriya qo'shish"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
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
        </Modal>
      </div>

      {/* table */}
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
                <td>{item?.name}</td>
                <td className="text-center">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image_2}`}
                    alt="category image"
                    className="w-10 mx-auto"
                  />
                </td>
                <td>
                  {data?.categories?.map?.(
                    (i) => i?.id == item?.parent_id && i?.name
                  )}
                </td>
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

      {/* see */}
      <Modal
        title="Subkategoriya"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="w-full">
          Hozirgi Ikon ko'rinishi:
          <div className="flex items-center gap-3 border border-gray-600 rounded-full p-1 pr-3 my-2 max-w-fit mx-auto">
            <div className="max-w-[70px] ">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
                alt="category image"
                className="w-full rounded-full aspect-square object-cover ring-2 ring-secondary ring-offset-1 transition hover:ring-4 hover:ring-blue-600"
              />
            </div>
            <p>{modalData?.name}</p>
          </div>
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
          Hozirgi Ikon ko'rinishi:
          <div className="flex items-center gap-3 border border-gray-600 rounded-full p-1 pr-3 my-2 max-w-fit mx-auto">
            <div className="max-w-[70px] ">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
                alt="category image"
                className="w-full rounded-full aspect-square object-cover ring-2 ring-secondary ring-offset-1 transition hover:ring-4 hover:ring-blue-600"
              />
            </div>
            <p>{modalData?.name}</p>
          </div>
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
              className="file:bg-transparent file:border-none w-full border rounded border-blue-500 p-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
          <Form.Item label="banner rasmi" name="image_2">
            <input
              type="file"
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

import axios from "axios";
import { Button, Carousel, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let response = await axios.get("/main-page-news/get");
      setData(response?.data?.data);
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
    data.append("text", values.text);
    data.append("image", image);
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/main-page-news/store`,
        data
      );
      if (response.status === 201) {
        getData();
        setImage(null);
        setLoading(false);
        messageApi.success("Banner qo'shildi!");
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
      setImage(null);
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let data = new FormData();
    data.append("text", values.text);
    data.append("image", image);
    if (!image) data.delete("image");
    if (!values.text) data.delete("text");
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/main-page-news/${
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
      messageApi.error("Nimadadir xatolik ketdi!");
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      let response = await axios.delete(
        `/admin/${localStorage.getItem(
          "adras-token"
        )}/main-page-news/${id}/delete`
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
      {contextHolder}
      <div>
        <h3 className="text-3xl font-semibold mb-3">Yangi banner qo'shish:</h3>
        <Form name="basic" onFinish={handleCreate} autoComplete="off">
          <Form.Item
            label="Nomi"
            name="text"
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
      </div>

      {/* table */}
      {/* <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-5">#</th>
              <th>Nomi</th>
              <th>Rasmi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <th>{item?.text}</th>
                <td className="text-center">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                    alt="category image"
                    className="w-10 mx-auto"
                  />
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
      </div> */}

      <Modal
        title="Kategoriya"
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
              <td>{modalData?.text}</td>
            </tr>
            <tr>
              <th className="py-3">Yaratilgan sana:</th>
              <td>{modalData?.created_at.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <Modal
        title="Bannerni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
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
          <Form.Item label="Nomi" name="text">
            <Input
              defaultValue={modalData?.text}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Rasm" name="image">
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

      <Carousel draggable adaptiveHeight infinite accessibility autoplay>
        {data?.map?.((item, ind) => {
          return (
            <div key={ind} className="h-96 w-full relative">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                alt="carousel image"
                className="w-full h-[99%] rounded-lg aspect-video object-cover"
              />
              <div className="absolute inset-0 grid place-items-center">
                <button
                  type="outline"
                  className="rounded-none border-2 border-black text-2xl px-3 py-1 font-semibold bg-white bg-opacity-50 backdrop-blur-sm"
                >
                  {item?.text}
                  {/* <span className="fa-solid fa-arrow-right" /> */}
                </button>
              </div>
              <div className="absolute top-0 p-1 rounded-lg bg-white flex items-center flex-wrap gap-3">
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
          );
        })}
      </Carousel>
    </div>
  );
};

export default index;

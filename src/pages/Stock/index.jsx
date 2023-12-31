import axios from "axios";
import { Button, DatePicker, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let response = await axios.get("/news/get");
      setData(response?.data?.news?.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    const image = new Image();
    image.src = URL.createObjectURL(uploadedImage);

    // Wait for the image to load before accessing its dimensions
    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      setDimensions({
        w: width,
        h: height,
      });
    };
  };

  async function handleCreate(values) {
    setLoading(true);
    let data = new FormData();
    data.append("image", image);
    data.append("text", values.text);
    data.append("title", values.title);
    data.append("start_time", values.start_time);
    data.append("time", values.time);
    try {
      let response = await axios.post(
        `/admin/${sessionStorage.getItem("adras-token")}/news/store`,
        data
      );
      if (response.status === 201) {
        getData();
        setImage(null);
        setLoading(false);
        setIsAddModalOpen(false);
        messageApi.success("Aksiya banneri qo'shildi!");
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
    data.append("title", values.title);
    data.append("text", values.text);
    data.append("start_time", values.start_time);
    data.append("time", values.time);
    data.append("image", image);
    if (!image) data.delete("image");
    if (!values.text) data.delete("text");
    if (!values.title) data.delete("title");
    if (!values.start_time) data.delete("start_time");
    if (!values.time) data.delete("time");
    try {
      let response = await axios.post(
        `/admin/${sessionStorage.getItem("adras-token")}/news/${
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
        `/admin/${sessionStorage.getItem("adras-token")}/news/${id}`
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
        <Button
          type="primary"
          className="bg-blue-500 ml-auto"
          icon={<span className="fa-solid fa-plus" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Yangi aksiya banneri qo'shish
        </Button>
        <Modal
          title="Aksiya banner qo'shish"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={[]}
        >
          <Form name="basic" onFinish={handleCreate} autoComplete="off">
            <Form.Item
              label="Nomi"
              name="title"
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
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  handleImageUpload(e);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div>
                <p className="opacity-80 text-[12px]">
                  Banner rasmining bo'yi va eni o'rtasidagi minumum farq{" "}
                  <span className="font-bold">500px</span>
                </p>
                <p
                  className={
                    dimensions.w - dimensions.h > 500
                      ? "text-green-500"
                      : "text-red-800"
                  }
                >
                  Tanlangan rasm eni {dimensions.w}px, bo'yi {dimensions.h}px
                </p>
              </div>
            </Form.Item>
            <Form.Item
              label="Tafsilot"
              name="text"
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
              label="Boshlanish sanasi"
              name="start_time"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <DatePicker className="w-full border rounded border-blue-500 p-2" />
            </Form.Item>
            <Form.Item
              label="Tugash sanasi"
              name="time"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <DatePicker className="w-full border rounded border-blue-500 p-2" />
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
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-5">#</th>
              <th>Nomi</th>
              <th>Rasmi</th>
              <th>Boshlanish sanasi</th>
              <th>Tugash sanasi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <th>{item?.title}</th>
                <td className="text-center">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                    alt="category image"
                    className="w-10 mx-auto"
                  />
                </td>
                <th>{item?.start_time.slice(5, 16)}</th>
                <th>{item?.time.slice(5, 16)}</th>
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
        title="Aksiya banner"
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
              <td>{modalData?.title}</td>
            </tr>
            <tr>
              <th className="py-3">Tafsiloti:</th>
              <td>{modalData?.text}</td>
            </tr>
            <tr>
              <th className="py-3">Tugash sanasi:</th>
              <td>{modalData?.time.slice(5, 16)}</td>
            </tr>
            <tr>
              <th className="py-3">Yaratilgan sana:</th>
              <td>{modalData?.created_at.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <Modal
        title="Aksiya bannerni tahrirlash"
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
          <Form.Item label="Nomi" name="title">
            <Input
              defaultValue={modalData?.title}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Tafsiloti" name="text">
            <Input.TextArea
              defaultValue={modalData?.text}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Boshlanish sanasi" name="start_time">
            <DatePicker className="w-full border rounded border-blue-500 p-2" />
          </Form.Item>
          <Form.Item label="Tugash sanasi" name="time">
            <DatePicker className="w-full border rounded border-blue-500 p-2" />
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
    </div>
  );
};

export default index;

import axios from "axios";
import { Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let response = await axios.get("/parent-category/get");
      setData(response?.data?.data);
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
    data.append("name", values.name);
    data.append("image", image);
    data.append("image_2", image2);
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/parent-category/store`,
        data
      );
      if (response.status === 201) {
        getData();
        setImage(null);
        setImage2(null);
        setIsAddModalOpen(false);
        setLoading(false);
        messageApi.success("Kategoriya yaratildi!");
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let data = new FormData();
    data.append("name", values.name);
    data.append("image", image);
    data.append("image_2", image2);
    if (!values.name) data.delete("name");
    if (!image) data.delete("image");
    if (!image2) data.delete("image_2");
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/parent-category/${
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
        `/admin/${localStorage.getItem("adras-token")}/parent-category/${id}`
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
      {/* create */}
      <div>
        <Button
          type="primary"
          className="bg-blue-500"
          icon={<span className="fa-solid fa-plus" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Yangi kategoriya qo'shish
        </Button>
        <Modal
          title="Kategoriya qo'shish"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={[]}
        >
          <Form name="basic" onFinish={handleCreate} autoComplete="off">
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
                onChange={(e) => {
                  setImage2(e.target.files[0]);
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
              <th>Ikon rasmi</th>
              <th>Banner rasmi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
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
                <td className="text-center">
                  <img
                    src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image_2}`}
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
      </div>

      {/* see */}
      <Modal
        title="Kategoriya"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="w-full my-2">
          Hozirgi Ikon ko'rinishi:
          <div className="max-w-fit flex flex-col items-center gap-2 mt-2 mx-auto">
            <div className="w-[70px]">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
                alt="category image"
                className="rounded-full aspect-1 object-cover ring-2 ring-secondary ring-offset-1 transition hover:ring-4 hover:ring-blue-600"
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
              <th className="py-3">Yaratilgan sana:</th>
              <td>{modalData?.created_at.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      {/* edit */}
      <Modal
        title="Kategoriyani tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[]}
      >
        <div className="w-full my-2">
          Hozirgi Ikon ko'rinishi:
          <div className="max-w-fit flex flex-col items-center gap-2 mt-2 mx-auto">
            <div className="w-[70px]">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
                alt="category image"
                className="rounded-full aspect-1 object-cover ring-2 ring-secondary ring-offset-1 transition hover:ring-4 hover:ring-blue-600"
              />
            </div>
            <p>{modalData?.name}</p>
          </div>
        </div>
        <div className="w-full my-2">
          Hozirgi Banner rasmi:
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
          <Form.Item label="Banner rasmi" name="image_2">
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

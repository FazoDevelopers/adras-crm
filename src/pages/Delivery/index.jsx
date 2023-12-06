import axios from "axios";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let response = await axios.get("/get-shipping-price");
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
    try {
      let response = await axios.post(
        `/admin/${sessionStorage.getItem("adras-token")}/shipping-price/store`,
        values
      );
      if (response.status === 200) {
        getData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    try {
      let response = await axios.post(
        `/admin/${sessionStorage.getItem("adras-token")}/shipping-price/${
          modalData?.id
        }/update`,
        values
      );
      if (response.status === 200) {
        getData();
        setModalData({});
        setLoading(false);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      let response = await axios.delete(
        `/admin/${sessionStorage.getItem("adras-token")}/shipping-price/${id}`
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
      <h3 className="text-3xl font-semibold mb-3">Yetkazib berish narxlari:</h3>
      <div className="border border-gray-300 rounded-lg p-2 bg-white shadow-lg">
        <Form name="basic" onFinish={handleCreate} autoComplete="off">
          <Form.Item
            label="Namangan shahri"
            name="price"
            rules={[
              {
                required: true,
                message: "",
                min: 0,
              },
            ]}
          >
            <Input
              min={0}
              type="number"
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item
            label="Joylashuvi"
            name="type"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Select>
              <option value="Namangan shahri">Namangan shahri</option>
              <option value="Namangan viloyati">Namangan viloyati</option>
              <option value="O'zbekiston bo'ylab">O'zbekiston bo'ylab</option>
            </Select>
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
        <div className="flex flex-col gap-3">
          {data?.map?.((i, ind) => (
            <div key={ind} className="border-b py-3 flex items-center gap-5 justify-between">
              <div>
                <div className="flex items-center gap-5">
                  <h4 className="text-lg font-medium">{i?.type}:</h4>
                  <p className="font-semibold text-blue-700">UZS {i?.price}</p>
                </div>
                <div className="flex items-center gap-5">
                  <h4 className="text-lg font-medium">Tayinlangan sana:</h4>
                  <p>{i?.created_at?.slice?.(0, 10)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setModalData(i);
                    setIsEditModalOpen(true);
                  }}
                  icon={<span className="fa-solid fa-edit" />}
                />
                <Button
                  onClick={() => handleDelete(i?.id)}
                  danger
                  icon={<span className="fa-solid fa-trash" />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* edit */}
      <Modal
        open={isEditModalOpen}
        destroyOnClose
        onCancel={() => {
          setIsEditModalOpen(false);
          setModalData({});
        }}
        title="Tahrirlash"
        footer={[]}
      >
        <Form onFinish={handleEdit} name="edit">
          <Form.Item label="Narxi" name="price">
            <Input
              min={0}
              defaultValue={modalData?.price}
              type="number"
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              className="bg-blue-500"
              htmlType="submit"
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

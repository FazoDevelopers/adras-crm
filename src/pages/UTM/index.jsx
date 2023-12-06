import axios from "axios";
import { Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let response = await axios.get(
        `admin/${sessionStorage.getItem("adras-token")}/utm-source/get`
      );
      setData(response?.data?.data?.data);
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
        `/admin/${sessionStorage.getItem("adras-token")}/utm-source/store`,
        values
      );
      if (response.status === 200) {
        getData();
        setIsAddModalOpen(false);
        setLoading(false);
        messageApi.success("UTM yaratildi!");
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    try {
      let response = await axios.post(
        `/admin/${sessionStorage.getItem("adras-token")}/utm-source/${
          modalData?.id
        }/update`,
        values
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
        `/admin/${sessionStorage.getItem("adras-token")}/utm-source/${id}`
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
          Yangi UTM qo'shish
        </Button>
        <Modal
          title="UTM qo'shish"
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
              label="Link"
              name="link"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                prefix="adras-market-api/?utm_source="
                className="border rounded border-blue-500 p-2"
              />
            </Form.Item>
            <Form.Item
              label="Soni"
              name="count"
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
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className="py-5 border border-gray-300">#</th>
              <th className="border border-gray-300">Nomi</th>
              <th className="border border-gray-300">Link</th>
              <th className="border border-gray-300">Soni</th>
              <th className="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3 border border-gray-300">{ind + 1}</th>
                <td className="border border-gray-300">{item?.name}</td>
                <td className="border border-gray-300">{item?.link}</td>
                <td className="border border-gray-300">{item?.count}</td>
                <td className="w-52 border border-gray-300">
                  <div className="flex items-center justify-center flex-wrap gap-3">
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

      {/* edit */}
      <Modal
        title="UTM ni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[]}
      >
        <Form name="edit" onFinish={handleEdit} autoComplete="off">
          <Form.Item label="Nomi" name="name">
            <Input
              defaultValue={modalData?.name}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Link" name="link">
            <Input
              defaultValue={modalData?.link}
              prefix="adras-market-api/?utm_source="
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Soni" name="count">
            <Input
              defaultValue={modalData?.count}
              type="number"
              min={0}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>{" "}
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

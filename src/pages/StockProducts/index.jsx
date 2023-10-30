import axios from "axios";
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let discount = await axios.get("/discount/get");
      setData(discount?.data?.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function searchProduct(value) {
    try {
      let response = await axios.get(
        `https://api.abdullajonov.uz/adras-market-api/api/search?query=${value?.q}`
      );
      setProducts(response?.data?.data?.data);
    } catch (error) {
      return;
    }
  }

  async function handleCreate(values) {
    setLoading(true);
    let data = {
      amount: values.amount,
      product_slug: values.product_slug,
      start_time: values.start_time,
      end_time: values.end_time,
    };
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/discount/store`,
        data
      );
      if (response.status === 201) {
        getData();
        setIsAddModalOpen(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let data = {
      amount: values.amount,
      product_slug: values.product_slug,
      start_time: values.start_time,
      end_time: values.end_time,
    };
    if (!values.start_time) delete data.start_time;
    if (!values.end_time) delete data.end_time;
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/discount/${
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
        `/admin/${localStorage.getItem("adras-token")}/discount/${id}`
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
          Yangi chegirma qo'shish
        </Button>
        <Modal
          title="Chegirma qo'shish"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={[]}
        >
          <Form
            name="search"
            onFinish={searchProduct}
            className="flex items-center w-full"
          >
            <Form.Item
              label="Mahsulotlarni qidirish"
              name="q"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="border rounded border-blue-500 " />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Izlash
              </Button>
            </Form.Item>
          </Form>
          <Form name="basic" onFinish={handleCreate} autoComplete="off">
            <Form.Item
              label="Narxi"
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
                className="border rounded border-blue-500 p-2"
              />
            </Form.Item>
            <Form.Item
              label="Mahsulot"
              name={"product_slug"}
              rules={[
                {
                  required: true,
                  message: " ",
                },
              ]}
            >
              {products?.length > 0 ? (
                <Radio.Group>
                  {products?.map?.((item) => (
                    <Radio value={item?.slug}>{item?.name}</Radio>
                  ))}
                </Radio.Group>
              ) : (
                "Mahsulot yo'q"
              )}
            </Form.Item>
            <Form.Item
              label="Boshlanish vaqti"
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
              label="Tugash vaqti"
              name="end_time"
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
              <th>Mahsulot</th>
              <th>Chegirma narxi</th>
              <th>Boshlanish</th>
              <th>Tugash</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <td>{item?.product_slug}</td>
                <td>{item?.amount}</td>
                <td>{item?.start_time.slice(0, 10)}</td>
                <td>{item?.end_time.slice(0, 10)}</td>
                <td className="w-52">
                  <div className="flex items-center flex-wrap gap-3">
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
        title="Chegirmani tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[]}
      >
        <Form name="edit" onFinish={handleEdit} autoComplete="off">
          <Form.Item label="Narxi" name="amount">
            <Input
              defaultValue={modalData?.amount}
              type="number"
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Boshlanish vaqti" name="start_time">
            <DatePicker
              type="number"
              className="w-full border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Tugash vaqti" name="end_time">
            <DatePicker
              type="number"
              className="w-full border rounded border-blue-500 p-2"
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

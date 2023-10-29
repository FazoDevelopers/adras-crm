import axios from "axios";
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    let start = `${new Date(values.start_time.$d).getDate()}.${
      new Date(values.start_time.$d).getMonth() + 1
    }.${new Date(values.start_time.$d).getFullYear()}`;
    let end = `${new Date(values.end_time.$d).getDate()}.${
      new Date(values.end_time.$d).getMonth() + 1
    }.${new Date(values.end_time.$d).getFullYear()}`;
    let data = {
      amount: values.amount,
      product_slug: values.product_slug,
      start_time: start,
      end_time: end,
    };
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/discount/store`,
        data
      );
      if (response.status === 201) {
        getData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let start = `${new Date(values?.start_time?.$d)?.getDate()}.${
      new Date(values?.start_time?.$d)?.getMonth() + 1
    }.${new Date(values?.start_time?.$d)?.getFullYear()}`;
    let end = `${new Date(values?.end_time?.$d)?.getDate()}.${
      new Date(values?.end_time?.$d)?.getMonth() + 1
    }.${new Date(values?.end_time?.$d)?.getFullYear()}`;
    let data = {
      amount: values.amount,
      product_slug: values.product_slug,
      start_time: start,
      end_time: end,
    };
    
if(!values.start) delete data.start_time
if(!values.end) delete data.end_time
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
      <div>
        <h3 className="text-3xl font-semibold mb-3">
          Yangi chegirma qo'shish:
        </h3>
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
            <Radio.Group>
              {products?.map?.((item) => (
                <Radio value={item?.slug}>{item?.name}</Radio>
              ))}
            </Radio.Group>
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
                <th>{item?.product_slug}</th>
                <th>{item?.amount}</th>
                <th>{item?.start_time}</th>
                <th>{item?.end_time}</th>
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

import axios from "axios";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
} from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function getData() {
    try {
      let order = await axios.get(
        `/admin/${localStorage.getItem("adras-token")}/order/get`
      );
      setData(order?.data?.data);
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
      name: values.name,
      phone: values.phone,
      location: values.location,
      product_slug: values.product_slug,
      price: values.price,
      amount: values.amount,
    };
    try {
      let response = await axios.post(`/order/store`, data);
      if (response.status === 200 || response.status === 201) {
        getData();
        messageApi.success("Buyurtma qo'shildi!");
        setLoading(false);
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
      setLoading(false);
    }
  }

  async function handleEdit(values) {
    setLoading(true);
    let data = {
      name: values.name,
      phone: values.phone,
      location: values.location,
      product_slug: values.product_slug,
      price: values.price,
      amount: values.amount,
    };
    if (!values.name) delete data.name;
    if (!values.phone) delete data.phone;
    if (!values.location) delete data.location;
    if (!values.price) delete data.price;
    if (!values.amount) delete data.amount;
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/order/${
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
        `/admin/${localStorage.getItem("adras-token")}/order/${id}/delete`
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
          Yangi Buyurtma qo'shish
        </Button>
        <Modal
          title="Buyurtma qo'shish"
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
              label="Mijoz ismi"
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
                  <Radio value={item?.slug}>
                    <div>
                      <h4 className="text-lg font-semibold">{item?.name}</h4>
                      <p>UZS {item?.price}</p>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Miqdori"
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
                min={1}
                className="w-full border rounded border-blue-500 p-2"
              />
            </Form.Item>
            <Form.Item
              label="Manzil"
              name="location"
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
              label="Telefon"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                prefix="+998"
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
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-5">#</th>
              <th>Mahsulot</th>
              <th>Miqdori</th>
              <th>Umumiy narx</th>
              <th>Yetkazib berish</th>
              <th>Mijoz</th>
              <th>Tel. raqam</th>
              <th>Joylashuv</th>
              <th>Sana</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <th>{item?.product_name}</th>
                <td>{item?.amount}</td>
                <td>UZS {item?.price}</td>
                <td>UZS 10000</td>
                <td>{item?.name}</td>
                <td>{item?.phone}</td>
                <td>{item?.location}</td>
                <td>{item?.created_at?.slice(0, 10)}</td>
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
        destroyOnClose
        onCancel={() => setIsEditModalOpen(false)}
        footer={[]}
      >
        <Form name="edit" onFinish={handleEdit} autoComplete="off">
          <Form.Item label="Mijoz ismi" name="name">
            <Input
              defaultValue={modalData?.name}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Tel. raqam" name="phone">
            <Input
              defaultValue={modalData?.phone}
              prefix="+998"
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Manzil" name="location">
            <Input.TextArea
              defaultValue={modalData?.location}
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item label="Mahsulot miqdori" name="amount">
            <Input
              type="number"
              defaultValue={modalData?.amount}
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

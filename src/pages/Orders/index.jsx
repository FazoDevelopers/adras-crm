import axios from "axios";
import { Button, Form, Input, message, Modal, Checkbox, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  clearOrder,
  decreaseOrderQuantity,
  increaseOrderQuantity,
  removeOrder,
} from "../../redux";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { order } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  // const [selectedProducts, setSelectedProducts] = useState([]);
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

  async function downloadInvoice(values) {
    let data = {
      name: values.name,
      location: values.location,
      phone: values.phone,
      delivery: "10000",
      order: values.order,
    };

    try {
      let response = await axios.post(
        `/${localStorage.getItem("adras-token")}/get-pdf`,
        data
      );
      if (response.status === 200) {
        messageApi.success("Buyurtma cheki yuklandi!");
        setTimeout(() => {
          // window.open(
          //   "https://api.abdullajonov.uz/adras-market-api/public/storage/orders.pdf"
          // );
          const objectUrl =
            "https://api.abdullajonov.uz/adras-market-api/public/storage/orders.pdf";
          const anchor = document.createElement("a");
          anchor.href = objectUrl;
          anchor.target = "blank";
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }, 100);
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
    }
  }

  async function handleCreate(values) {
    setLoading(true);
    let orders = [];
    order.forEach((buying) => {
      orders.push({
        product_name: buying.name,
        product_slug: buying.slug,
        amount: buying.count,
        price: buying.price * buying.count,
      });
    });
    let data = {
      name: values.name,
      phone: values.phone,
      location: values.location,
      orders: JSON.stringify(JSON.stringify(orders)),
    };
    try {
      let response = await axios.post(`/order/store`, data);
      if (response.status === 200 || response.status === 201) {
        getData();
        messageApi.success("Buyurtma qo'shildi!");
        setLoading(false);
        setIsAddModalOpen(false);
        dispatch(clearOrder());
        setProducts([]);
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
          destroyOnClose
          footer={[]}
          className="w-11/12"
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
            <Form.Item
              label="Mahsulotlar"
              name={"product"}
              rules={[
                {
                  required: true,
                  message: " ",
                },
              ]}
            >
              <Checkbox.Group>
                {products?.map?.((item) => (
                  <Checkbox
                    value={item?.slug + "~" + item?.name + "~" + item?.price}
                    onChange={() => {
                      dispatch(addOrder({ ...item, count: 1 }));
                    }}
                  >
                    <div>
                      <h4 className="text-lg font-semibold">{item?.name}</h4>
                      <p>UZS {item?.price}</p>
                    </div>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item>
              <table className="border border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border border-collapse p-1"></th>
                    <th className="border border-collapse p-1 w-1/2">
                      Mahsulot
                    </th>
                    <th className="border border-collapse p-1">Miqdori</th>
                    <th className="border border-collapse p-1">Narxi</th>
                    <th className="border border-collapse p-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {order.length > 0 &&
                    order?.map?.((item, ind) => {
                      return (
                        <tr key={ind}>
                          <th className="border border-collapse p-1">
                            {ind + 1}
                          </th>
                          <td className="border border-collapse p-1 line-clamp-3">
                            {item?.name}
                          </td>
                          <td className="border border-collapse p-1">
                            <Button.Group>
                              <Button
                                size="small"
                                onClick={() =>
                                  dispatch(decreaseOrderQuantity(item.id))
                                }
                              >
                                -
                              </Button>
                              <Input
                                size="small"
                                min={1}
                                value={item?.count}
                                className="rounded-none w-10 text-center"
                              />
                              <Button
                                size="small"
                                onClick={() =>
                                  dispatch(increaseOrderQuantity(item.id))
                                }
                              >
                                +
                              </Button>
                            </Button.Group>
                          </td>
                          <td className="border border-collapse p-2">
                            UZS {item?.price * item?.count}
                          </td>
                          <td className="border border-collapse p-1">
                            <Button
                              danger
                              icon={<span className="fa-solid fa-trash" />}
                              onClick={() => dispatch(removeOrder(item.id))}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
      <div className="mt-3">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-5">#</th>
              <th className="border border-collapse p-1">Buyurtma</th>
              <th className="border border-collapse p-1">Mijoz</th>
              <th className="border border-collapse p-1">Tel. raqam</th>
              <th className="border border-collapse p-1">Joylashuv</th>
              <th className="border border-collapse p-1">Sana</th>
              <th className="border border-collapse p-1"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, ind) => (
              <tr key={ind} className="text-center border-t">
                <th className="py-3">{ind + 1}</th>
                <td className="border border-collapse p-1">
                  <Button
                    type="default"
                    onClick={() => {
                      setModalData(JSON.parse(item?.orders));
                      setIsModalOpen(true);
                    }}
                  >
                    Buyurtmani ko'rish
                  </Button>
                </td>
                <td className="border border-collapse p-1">{item?.name}</td>
                <td className="border border-collapse p-1">
                  +998 {item?.phone}
                </td>
                <td className="border border-collapse p-1">{item?.location}</td>
                <td className="border border-collapse p-1">
                  {item?.created_at?.slice(0, 10)}
                </td>
                <td className="w-52 border border-collapse text-center px-3">
                  <div className="flex items-center flex-wrap gap-3">
                    <Tooltip title="Chekni yuklab olish" trigger={"hover"}>
                      <Button
                        onClick={() =>
                          downloadInvoice({
                            name: item?.name,
                            phone: item?.phone,
                            location: item?.location,
                            order: JSON.parse(item?.orders),
                          })
                        }
                        icon={
                          <span className="fa-solid fa-file-invoice text-green-500" />
                        }
                      />
                    </Tooltip>
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
        title="Buyurtmalar"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setModalData({});
        }}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <table className="text-left w-full">
          <thead>
            <tr>
              <th className="border p-1">#</th>
              <th className="border p-1">Mahsulot nomi</th>
              <th className="border p-1 text-center">Miqdori</th>
              <th className="border p-1 text-center">Jami narxi</th>
            </tr>
          </thead>
          <tbody>
            {modalData?.map?.((item, ind) => (
              <tr key={ind}>
                <th className="border p-2">{ind + 1}</th>
                <td className="border p-1 max-w-[200px]">
                  {item?.product_name}
                </td>
                <td className="border text-center">{item?.amount}</td>
                <td className="border text-center">
                  UZS {Number(item?.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      {/* edit */}
      <Modal
        title="Buyurtmani tahrirlash"
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

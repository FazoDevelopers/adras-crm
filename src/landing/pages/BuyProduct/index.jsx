import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  decreaseQuantity,
  increaseQuantity,
  remove,
} from "../../../redux";
import { useEffect, useState } from "react";
import axios from "axios";

const index = () => {
  const [messageApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buying } = useSelector((state) => state.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (
      !form.getFieldsValue().name ||
      !form.getFieldsValue().phone ||
      !form.getFieldsValue().address
    ) {
      return messageApi.error({
        message: "Formani to'liq to'ldiring!",
      });
    } else if (buying.length === 0) {
      messageApi.error({
        message: "Tanlangan mahsulotlar yo'q!",
      });
    } else {
      setLoading(true);
    }
    let orders = [];
    buying.forEach((buying) => {
      orders.push({
        product_name: buying.name,
        product_slug: buying.slug,
        amount: buying.count,
        price: buying.price * buying.count,
      });
    });

    try {
      let { data } = await axios.post("/order/store", {
        name: form.getFieldsValue().name,
        phone: form.getFieldsValue().phone,
        location: form.getFieldsValue().address,
        orders: JSON.stringify(JSON.stringify(orders)),
      });
      if (data?.code === 201) {
        dispatch(clear());
        messageApi.success({
          message: "Qabul qilindi!",
          description:
            "Buyurtmangiz qabul qilindi. Tez orada siz bilan aloqaga chiqiladi.",
        });
        setLoading(false);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (error) {
        messageApi.error({ message: "Nimadadir xatolik ketdi!" });
      }
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  function calculateTotalPrice() {
    let productsPrice = Number(
      buying.reduce((a, b) => a + b.price * b.count, 0)
    );
    let qqsPrice =
      (4 / 100) * Number(buying.reduce((a, b) => a + b.price * b.count, 0));
    let shipmentPrice = 10000;

    setTotalPrice(Number(productsPrice + qqsPrice + shipmentPrice).toFixed(2));
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [buying]);

  return (
    <div className="py-10 w-11/12 md:w-3/4 mx-auto">
      {contextHolder}
      <h2 className="text-2xl sm:text-4xl md:text-5xl text-center font-medium mb-5">
        Buyurtma berish
      </h2>
      <div className="max-w-full grid md:grid-cols-2 place-items-center gap-5 py-3 overflow-x-auto scrollbar-track-transparent scrollbar-thumb-primary scrollbar-none">
        {buying.map((item, ind) => {
          return (
            <div
              key={ind}
              className="flex items-start gap-2 max-w-md font-medium border rounded-lg p-2 w-fit transition hover:shadow-lg"
            >
              <div className="flex flex-col gap-1">
                <img
                  src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${item?.image}`}
                  alt={item.name}
                  className="w-[110px] max-w-[110px] rounded-lg"
                />
                <h3 className="line-clamp-1 font-semibold">{item.name}</h3>
              </div>
              <div className="flex flex-col gap-2">
                <p className="line-clamp-2 text-sm">{item.desc}</p>
                <p className="font-medium text-sm">SKU: {item.sku}</p>
                <div className="flex items-center gap-3 text-sm">
                  <p className="font-medium">Price:</p>
                  <span>UZS {item.price * item.count}</span>
                </div>
                <div className="flex items-center gap-5">
                  <Button.Group>
                    <Button onClick={() => dispatch(decreaseQuantity(item.id))}>
                      -
                    </Button>
                    <Input
                      min={1}
                      value={item.count}
                      className="rounded-none w-10 text-center"
                    />
                    <Button onClick={() => dispatch(increaseQuantity(item.id))}>
                      +
                    </Button>
                  </Button.Group>
                  <Button
                    danger
                    icon={<span className="fa-solid fa-trash" />}
                    onClick={() => dispatch(remove(item.id))}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full my-5">
        <Button
          type="primary"
          className="w-full bg-blue-500"
          icon={<span className="fa-solid fa-cart-plus" />}
          onClick={() => navigate("/")}
        >
          Yangi mahsulot qo'shish
        </Button>
      </div>

      <div className="border rounded-lg p-2">
        <h3 className="text-lg text-center font-semibold pb-3">
          Ma'lumotlaringizni kiriting.
        </h3>
        <Form
          form={form}
          name="order"
          // onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="To'liq ismingiz"
            name="name"
            rules={[
              {
                required: true,
                message: "Iltimos ismingizni kiriting!",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Form.Item
            label="Telefon raqamingiz"
            name="phone"
            rules={[
              {
                required: true,
                message: "Iltimos telefon raqamingizni kiriting!",
              },
            ]}
          >
            <Input required type="number" prefix="+998" />
          </Form.Item>

          <Form.Item
            label="Manzilingiz"
            name="address"
            rules={[
              {
                required: true,
                message: "Iltimos manzilingizni kiriting!",
              },
            ]}
          >
            <Input.TextArea required rows={3} />
          </Form.Item>
        </Form>
      </div>

      <div className="border rounded-lg p-2 mt-5">
        <h3 className="text-lg text-center font-semibold pb-3">
          Buyurtma ma'lumoti.
        </h3>
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="py-3 text-left">Mahsulot umumiy narxi:</th>
              <td className="text-right">
                UZS{" "}
                {Number(
                  buying.reduce((a, b) => a + b.price * b.count, 0)
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th className="py-3 text-left">Yetkazib berish narxi:</th>
              <td className="text-right">UZS 10000.00</td>
            </tr>
            <tr>
              <th className="py-3 text-left">QQS narxi (4%):</th>
              <td className="text-right">
                UZS{" "}
                {(
                  (4 / 100) *
                  Number(buying.reduce((a, b) => a + b.price * b.count, 0))
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th className="py-3 text-left">Boshqalar:</th>
              <td className="text-right">UZS 0.00</td>
            </tr>
            <tr className="border-t border-black">
              <th className="py-3 text-left">Jami:</th>
              <td className="text-right">UZS {totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <Button
          type="primary"
          className="bg-blue-500 w-full my-5"
          icon={<span className="fa-solid fa-shopping-cart" />}
          onClick={handleSubmit}
          loading={loading}
        >
          Buyurtma berish
        </Button>
      </div>
    </div>
  );
};

export default index;

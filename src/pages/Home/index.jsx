import axios from "axios";
import { Empty, Tabs, Timeline } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState({
    utm: [],
    orders: [],
    top_clients: [],
  });
  const orderItems = [
    {
      key: "week",
      label: `Bu hafta (${data?.orders?.last_week?.length ?? 0})`,
      children: (
        <>
          {data?.orders?.last_week?.length > 0 ? (
            <table className="w-full text-center">
              <thead>
                <tr className="border">
                  <td className="border p-2">#</td>
                  <th className="border">Mijoz</th>
                  <th className="border">Tel. raqam</th>
                  <th className="border">Manzil</th>
                  <th className="border">Mahsulotlar soni</th>
                  <th className="border">Buyurtma sanasi</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders?.last_week?.map?.((order, ind) => (
                  <tr className="border">
                    <th className="border p-2">{ind + 1}</th>
                    <td className="border">{order?.name}</td>
                    <td className="border">+998 {order?.phone}</td>
                    <td className="border">{order?.location}</td>
                    <td className="border">
                      {JSON.parse(order?.orders)?.length}
                    </td>
                    <td className="border">
                      {order?.created_at?.slice?.(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty description="Ma'lumotlar yo'q." />
          )}
        </>
      ),
    },
    {
      key: "month",
      label: `Bu oy (${data?.orders?.last_month?.length ?? 0})`,
      children: (
        <>
          {data?.orders?.last_month?.length > 0 ? (
            <table className="w-full text-center">
              <thead>
                <tr className="border">
                  <td className="border p-2">#</td>
                  <th className="border">Mijoz</th>
                  <th className="border">Tel. raqam</th>
                  <th className="border">Manzil</th>
                  <th className="border">Mahsulotlar soni</th>
                  <th className="border">Buyurtma sanasi</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders?.last_month?.map?.((order, ind) => (
                  <tr className="border">
                    <th className="border p-2">{ind + 1}</th>
                    <td className="border">{order?.name}</td>
                    <td className="border">+998 {order?.phone}</td>
                    <td className="border">{order?.location}</td>
                    <td className="border">
                      {JSON.parse(order?.orders)?.length}
                    </td>
                    <td className="border">
                      {order?.created_at?.slice?.(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty description="Ma'lumotlar yo'q." />
          )}
        </>
      ),
    },
    {
      key: "all",
      label: `Barchasi (${data?.orders?.all?.length ?? 0})`,
      children: (
        <>
          {data?.orders?.all?.length > 0 ? (
            <table className="w-full text-center">
              <thead>
                <tr className="border">
                  <td className="border p-2">#</td>
                  <th className="border">Mijoz</th>
                  <th className="border">Tel. raqam</th>
                  <th className="border">Manzil</th>
                  <th className="border">Mahsulotlar soni</th>
                  <th className="border">Buyurtma sanasi</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders?.all?.map?.((order, ind) => (
                  <tr className="border">
                    <th className="border p-2">{ind + 1}</th>
                    <td className="border">{order?.name}</td>
                    <td className="border">+998 {order?.phone}</td>
                    <td className="border">{order?.location}</td>
                    <td className="border">
                      {JSON.parse(order?.orders)?.length}
                    </td>
                    <td className="border">
                      {order?.created_at?.slice?.(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty description="Ma'lumotlar yo'q." />
          )}
        </>
      ),
    },
  ];

  async function getData() {
    try {
      let response = await axios.get(
        `admin/${sessionStorage.getItem("adras-token")}/analytics`
      );
      setData({
        utm: response?.data?.utm,
        orders: response?.data?.orders,
        top_clients: response?.data?.top_clients,
      });
    } catch (error) {
      return;
    }
  }
  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="p-5">
        <h2 className="text-2xl font-medium mb-2">Buyurtmalar statistikasi:</h2>
        <Tabs
          animated
          size="large"
          defaultActiveKey="week"
          items={orderItems}
        />
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-2">Top xaridorlar:</h2>
        {data?.top_clients?.length > 0 ? (
          <table className="w-full text-center">
            <thead>
              <tr className="border">
                <td className="border p-2">#</td>
                <th className="border">Mijoz</th>
                <th className="border">Xaridlar soni</th>
              </tr>
            </thead>
            <tbody>
              {data?.top_clients?.map?.((order, ind) => (
                <tr className="border">
                  <th className="border p-2">{ind + 1}</th>
                  <td className="border">{order?.name}</td>
                  <td className="border">{order?.name_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty description="Ma'lumotlar yo'q." />
        )}
      </div>
    </div>
  );
};

export default index;

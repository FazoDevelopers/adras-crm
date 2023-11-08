import axios from "axios";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

const index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
        `/admin/${localStorage.getItem("adras-token")}/shipping-price/store`,
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

  // async function handleEdit(values) {
  //   setLoading(true);
  //   try {
  //     let response = await axios.post(
  //       `/admin/${localStorage.getItem("adras-token")}/main-page-news/${
  //         modalData?.id
  //       }/update`,
  //       data
  //     );
  //     if (response.status === 200) {
  //       getData();
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // }

  // async function handleDelete(id) {
  //   try {
  //     let response = await axios.delete(
  //       `/admin/${localStorage.getItem(
  //         "adras-token"
  //       )}/main-page-news/${id}/delete`
  //     );
  //     if (response.status === 200) {
  //       getData();
  //     }
  //   } catch (error) {
  //     return;
  //   }
  // }

  return (
    <div>
      <h3 className="text-3xl font-semibold mb-3">Yetkazib berish narxlari:</h3>
      <div className="border border-gray-300 rounded-lg p-2 bg-white shadow-lg">
        <Form name="basic" onFinish={handleCreate} autoComplete="off">
          <Form.Item
            label="Namangan shahri"
            name="price_city"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              defaultValue={data?.[data?.length - 1]?.price_city}
              type="number"
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item
            label="Namangan viloyati"
            name="price_region"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              defaultValue={data?.[data?.length - 1]?.price_region}
              type="number"
              className="border rounded border-blue-500 p-2"
            />
          </Form.Item>
          <Form.Item
            label="O'zbekiston bo'ylab"
            name="price_uzb"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              defaultValue={data?.[data?.length - 1]?.price_uzb}
              type="number"
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
        <div className="flex flex-col gap-3">
          <div className="border-b py-3">
            <div className="flex items-center gap-5">
              <h4 className="text-lg font-medium">Namangan shahri:</h4>
              <p className="font-semibold text-blue-700">
                UZS {data?.[data?.length - 1]?.price_city}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <h4 className="text-lg font-medium">Tayinlangan sana:</h4>
              <p>{data?.[data?.length - 1]?.created_at?.slice?.(0, 10)}</p>
            </div>
          </div>
          <div className="border-b py-3">
            <div className="flex items-center gap-5">
              <h4 className="text-lg font-medium">Namangan viloyati:</h4>
              <p className="font-semibold text-blue-700">
                UZS {data?.[data?.length - 1]?.price_region}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <h4 className="text-lg font-medium">Tayinlangan sana:</h4>
              <p>{data?.[data?.length - 1]?.created_at?.slice?.(0, 10)}</p>
            </div>
          </div>
          <div className="py-3">
            <div className="flex items-center gap-5">
              <h4 className="text-lg font-medium">O'zbekiston bo'ylab:</h4>
              <p className="font-semibold text-blue-700">
                UZS {data?.[data?.length - 1]?.price_uzb}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <h4 className="text-lg font-medium">Tayinlangan sana:</h4>
              <p>{data?.[data?.length - 1]?.created_at?.slice?.(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

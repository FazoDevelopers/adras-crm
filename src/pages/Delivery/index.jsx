import axios from "axios";
import { Button, Form, Input, Modal } from "antd";
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
  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  async function handleCreate(values) {
    setLoading(true);
    try {
      let response = await axios.post(
        `/admin/${localStorage.getItem("adras-token")}/shipping-price/store`,
        { price: values.price }
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
      <div>
        <h3 className="text-3xl font-semibold mb-3">Yetkazib berish narxi:</h3>
        <Form name="basic" onFinish={handleCreate} autoComplete="off">
          <Form.Item
            label="Narx"
            name="price"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              defaultValue={data?.[data?.length - 1]?.price}
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
        <div className="flex items-center gap-5">
          <h4 className="text-lg font-medium">
            Hozirgi yetkazib berish narxi:
          </h4>
          <p className="font-semibold text-blue-700">UZS {data?.[data?.length - 1]?.price}</p>
        </div>
        <div className="flex items-center gap-5">
          <h4 className="text-lg font-medium">
            Tayinlangan sana:
          </h4>
          <p>{data?.[data?.length - 1]?.created_at?.slice?.(0,10)}</p>
        </div>
      </div>
    </div>
  );
};

export default index;

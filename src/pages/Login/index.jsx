import axios from "axios";
import { Button, Checkbox, Form, Input, message } from "antd";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    try {
      let response = await axios.post("admin/login", values);
      if (response.status === 200) {
        sessionStorage.setItem(
          "adras-token",
          response?.data?.data?.remember_token
        );
        window.location.replace("/admin");
      }
    } catch (error) {
      messageApi.error("Nimadadir xatolik ketdi!");
      return;
    }
  };

  return (
    <div className="absolute inset-0 grid place-items-center">
      {contextHolder}
      <div className="w-11/12 md:w-1/3">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Username"
            name="login"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parol"
            name="password"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Eslab qolish</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 w-full"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;

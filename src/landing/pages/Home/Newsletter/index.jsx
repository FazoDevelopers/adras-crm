import { Button, Form, Input } from "antd";

const index = () => {
  return (
    <div className="flex items-center flex-col lg:flex-row">
      <div className="max-w-xs">
        <img src="parfume.jpg" alt="image" className="w-full rounded-lg" />
      </div>
      <div className="bg-slate-100 p-5 rounded-lg w-full h-full">
        <h3 className="text-xl md:text-3xl font-medium lg:w-1/2">
          Yangiliklardan xabar topish yoki hamkorlik qilish uchun email
          manzilingizni yuboring.
        </h3>
        <Form name="newsletter" className="my-5 lg:w-1/2 ">
          <Form.Item
            label="Email Manzilingiz"
            name="email"
            rules={[
              {
                required: true,
                message: "",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email manzil" className="border border-black" />
          </Form.Item>
          <Form.Item className="w-full">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500"
            >
              {" "}
              Yuborish{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default index;

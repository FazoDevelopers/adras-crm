import { Button } from "antd";
const index = () => {
  return (
    <div className="group">
      <div className="aspect-h-1 aspect-w-1 min-w-full w-72 overflow-hidden rounded-lg bg-gray-200">
        <p className="opacity-0">1</p>
      </div>
      <p className="mt-4 line-clamp-1 text-sm w-full bg-gray-200 rounded-lg"><span className="opacity-0">2</span></p>
      <h3 className="mt-1 text-lg sm:text-xl font-medium bg-gray-500 w-full rounded-lg"><span className="opacity-0">3</span></h3>
      <Button type="primary" className="bg-blue-500 w-full mt-2"></Button>
    </div>
  );
};

export default index;

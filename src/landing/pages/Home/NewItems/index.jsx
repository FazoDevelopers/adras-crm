import { Button } from "antd";
import { useRef } from "react";
import { Card } from "../../../components";

const index = ({data}) => {
  const productsRef = useRef();


  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-4xl md:text-5xl text-center font-medium mb-5">
          Yangi mahsulotlar
        </h2>
        <div className="flex items-center gap-3">
          <Button.Group>
            <Button
              onClick={() =>
                productsRef.current.scrollBy({
                  left: -400,
                  behavior: "smooth",
                })
              }
              icon={<span className="fa-solid fa-arrow-left" />}
            />
            <Button
              onClick={() =>
                productsRef.current.scrollBy({
                  left: 400,
                  behavior: "smooth",
                })
              }
              icon={<span className="fa-solid fa-arrow-right" />}
            />
          </Button.Group>
        </div>
      </div>
      <div
        ref={productsRef}
        className="flex gap-x-6 gap-y-3 overflow-x-auto scrollbar-none py-4"
      >
        {data?.map?.((product, ind) => (
          <Card
            key={ind}
            data={{ ...product, badge: { text: "New", color: "red" } }}
          />
        ))}
      </div>
    </div>
  );
};

export default index;

import { Button } from "antd";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Card, CardPlaceholder } from "../../../components";

const index = () => {
  const productsRef = useRef();
  const { most_sold } = useSelector((state) => state.data);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-4xl md:text-5xl text-center font-medium mb-5">
          Eng ko'p sotilgan
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
        {most_sold?.length > 0
          ? most_sold?.map?.((product, ind) => (
              <Card
                key={ind}
                data={{ ...product, badge: { text: "Top", color: "gold" } }}
              />
            ))
          : new Array(5)
              .fill(null)
              .map((_, ind) => <CardPlaceholder key={ind} />)}
      </div>
    </div>
  );
};

export default index;

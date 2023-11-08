import { Button } from "antd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardPlaceholder } from "../../../components";

const index = ({ data }) => {
  const productsRef = useRef();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to={`/category/${data?.slug}`}
          className="text-2xl sm:text-4xl md:text-5xl text-center font-medium mb-5"
        >
          {data?.name}
        </Link>
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
        className={
          data?.products?.length >= 4
            ? "flex gap-x-6 gap-y-3 overflow-x-auto scrollbar-none py-4"
            : "flex lg:grid grid-cols-4 gap-x-6 gap-y-3 overflow-x-auto scrollbar-none"
        }
      >
        {data?.products?.length > 0
          ? data?.products
              ?.slice?.(0, 10)
              ?.map?.((product, ind) => <Card key={ind} data={product} />)
          : new Array(4)
              .fill(null)
              .map((_, ind) => <CardPlaceholder key={ind} />)}
      </div>
    </div>
  );
};

export default index;

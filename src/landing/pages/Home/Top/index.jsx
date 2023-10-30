import { Button } from "antd";
import { useRef } from "react";
import { Card } from "../../../components";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    price: 48,
    discount: 55,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    desc: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    price: 35,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    desc: "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    price: 89,
    discount: 125,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    desc: "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    price: 35,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    desc: "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

const index = () => {
  const productsRef = useRef();

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
        {products.map((product, ind) => (
          <Card
            key={ind}
            data={{ ...product, badge: { text: "Top", color: "gold" } }}
          />
        ))}
        {products.map((product, ind) => (
          <Card
            key={ind}
            data={{ ...product, badge: { text: "Top", color: "gold" } }}
          />
        ))}
      </div>
    </div>
  );
};

export default index;

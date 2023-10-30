import { useParams } from "react-router-dom";
import { Card, Footer, Nav, SubCategoryButton } from "../../components";

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
  const { id: category } = useParams();

  return (
    <>
      <Nav />
      <div className="w-full h-[60vh]">
        <img
          src="/carousel-1.jpg"
          alt="category image"
          className="w-full max-h-full object-cover object-center"
        />
      </div>
      <div className="flex items-center justify-center gap-10 flex-wrap my-20">
        <SubCategoryButton
          to={"subcategory-1"}
          image={"/parfume.jpg"}
          title={"Parfume"}
        />
      </div>
      <div className="md:w-4/5 mx-auto">
        <h2 className="text-3xl font-semibold text-center my-5 md:text-5xl">
          Mahsulotlar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0">
          {products.map((product, ind) => {
            return <Card data={product} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;

import { Badge, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../../redux";

const index = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleBuyItem() {
    dispatch(add({ ...data, count: 1 }));
    navigate(`/buy/${data?.name}`);
  }

  return (
    <Badge.Ribbon
      size="large"
      text={data?.badge?.text}
      color={data?.badge?.color}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 max-w-full overflow-hidden rounded-lg bg-gray-200 w-72">
        <img
          src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${data?.image}`}
          alt={data?.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <p className="mt-4 line-clamp-1 text-sm">{data?.desc}</p>
      <h3 className="mt-1 text-lg sm:text-xl font-medium text-gray-700">
        {data?.name}
      </h3>
      {data?.discount ? (
        <div className="mt-1 flex items-center justify-start gap-5 text-lg sm:text-xl">
          <p className="line-through opacity-75">UZS {data?.discount}</p>
          <p translate="no" className="font-semibold">UZS {data?.price}</p>
        </div>
      ) : (
        <p className="mt-1 text-xl text-gray-900">
          <span className="font-semibold">UZS {data?.price}</span> dan
        </p>
      )}
      <Button
        type="primary"
        className="bg-blue-500 w-full mt-2"
        icon={<span className="fa-solid fa-cart-shopping" />}
        onClick={() => handleBuyItem()}
      >
        Sotib olish
      </Button>
    </Badge.Ribbon>
  );
};

export default index;

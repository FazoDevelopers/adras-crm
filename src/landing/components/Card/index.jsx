import { Badge, Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../../redux";

const index = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState([]);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  async function handleBuyItem() {
    dispatch(add({ ...data, count: 1 }));
    navigate(`/buy/${data?.name}`);
  }

  return (
    <Badge.Ribbon
      size="large"
      text={<>{data?.badge?.text}</>}
      color={data?.badge?.color}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 min-w-full w-72 overflow-hidden rounded-lg bg-gray-200">
        <img
          src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${data?.image}`}
          alt={data?.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <p className="mt-4 line-clamp-1 text-sm">{data?.description}</p>
      <h3 className="mt-1 text-lg sm:text-xl line-clamp-2 h-[56px] font-medium text-gray-700">
        {data?.name}
      </h3>
      {data?.discount ? (
        <div className="mt-1 flex items-center justify-start gap-5 text-lg sm:text-xl">
          <p className="line-through opacity-75">UZS {data?.discount}</p>
          <p translate="no" className="font-semibold">
            UZS {data?.price}
          </p>
        </div>
      ) : (
        <p className="mt-1 text-xl text-gray-900">
          <span className="font-semibold">UZS {data?.price}</span> dan
        </p>
      )}
      <div className="flex gap-2">
        {data?.types?.length > 0 && (
          <Button
            type="default"
            className="w-full mt-2"
            icon={<span className="fa-solid fa-bars" />}
            onClick={() => {
              setModalData(data?.types);
              setIsVariantModalOpen(true);
            }}
          >
            Variantlar
          </Button>
        )}
        <Button
          type="primary"
          className="bg-blue-500 w-full mt-2"
          icon={<span className="fa-solid fa-cart-shopping" />}
          onClick={() => handleBuyItem()}
        >
          Sotib olish
        </Button>
      </div>

      {/* variant see */}
      <Modal
        title="Mahsulot variantlari"
        open={isVariantModalOpen}
        onCancel={() => setIsVariantModalOpen(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        {modalData?.map?.((modalData, ind) => (
          <>
            <div className="w-full my-1">
              <img
                src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${modalData?.image}`}
                alt="image"
                className="min-w-full w-full"
              />
            </div>
            <table className="text-left w-full">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="py-1">Nomi:</th>
                  <td>{modalData?.name}</td>
                </tr>
                <tr>
                  <th className="py-1">Tafsiloti:</th>
                  <td>{modalData?.description}</td>
                </tr>
                <tr>
                  <th className="py-1">Narxi:</th>
                  <td>{modalData?.price}</td>
                </tr>
                {modalData?.oldPrice && (
                  <tr>
                    <th className="py-1">Eski narxi:</th>
                    <td>{modalData?.oldPrice}</td>
                  </tr>
                )}
                <tr>
                  <th className="py-1">Yaratilgan sana:</th>
                  <td>{modalData?.created_at?.slice(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </>
        ))}
      </Modal>
    </Badge.Ribbon>
  );
};

export default index;

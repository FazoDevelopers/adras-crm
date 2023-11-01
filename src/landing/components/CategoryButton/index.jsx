import { Link } from "react-router-dom";

const index = ({ id, img, title }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="max-w-fit flex flex-col items-center gap-2"
    >
      <div className="w-[70px]">
        <img
          src={`https://api.abdullajonov.uz/adras-market-api/public/storage/images/${img}`}
          alt="category image"
          className="rounded-full aspect-1 object-cover ring-2 ring-secondary ring-offset-1 transition hover:ring-4 hover:ring-blue-600"
        />
      </div>
      <p className="whitespace-nowrap">{title}</p>
    </Link>
  );
};

export default index;

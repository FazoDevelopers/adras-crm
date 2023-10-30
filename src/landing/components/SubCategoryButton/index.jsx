import { Link } from "react-router-dom";

const index = ({to, image, title}) => {
  return (
    <Link
      to={`/subcategory/${to}`}
      className="flex items-center gap-3 border border-gray-600 rounded-full p-1 pr-3"
    >
      <div className="max-w-[70px] ">
        <img
          src={image}
          alt="category image"
          className="w-full rounded-full aspect-square object-cover ring-2 ring-secondary ring-offset-1 transition hover:ring-4 hover:ring-blue-600"
        />
      </div>
      <p>{title}</p>
    </Link>
  );
};

export default index;

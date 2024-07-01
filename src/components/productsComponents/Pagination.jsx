import { useNavigate } from "react-router-dom";

const Pagination = ({ page, pages, keyword }) => {
  const navigate = useNavigate();

  const handlePageClick = (newPage) => {
    const route = keyword
      ? `/products/search/${keyword}/page/${newPage}`
      : `/products/page/${newPage}`;
    navigate(route);
  };

  return (
    pages > 1 && (
      <div className="flex justify-center items-center gap-4 font-montserrat">
        <span
          onClick={() => handlePageClick(Math.max(1, page - 1))}
          className={`${
            page !== 1
              ? "hover:underline active:text-opacity-60 duration-200 text-darkPrimary font-medium cursor-pointer"
              : "opacity-30 pointer-events-none"
          } `}
        >
          prev
        </span>
        {Array.from({ length: pages }, (_, x) => x + 1).map((x) => (
          <div
            key={x + 1}
            onClick={() => handlePageClick(x)}
            className="flex justify-center"
          >
            <span
              className={`hover:underline active:text-opacity-60 duration-200 text-darkPrimary font-medium cursor-pointer ${
                x === page && "underline"
              }`}
            >
              {x}
            </span>
          </div>
        ))}
        <span
          onClick={() => handlePageClick(Math.min(pages, page + 1))}
          className={`${
            page !== pages
              ? "hover:underline active:text-opacity-60 duration-200 text-darkPrimary font-medium cursor-pointer"
              : "opacity-30 pointer-events-none"
          }`}
        >
          next
        </span>
      </div>
    )
  );
};

export default Pagination;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListsActions } from "../../redux/actions/ProductActions";
import Loading from "../Loading";
import Error from "../Error";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import Pagination from "./Pagination";

export default function Contents() {
  const { keyword } = useParams();
  const { pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productLists = useSelector((state) => state.productLists);
  const { loading, error, products, page, pages } = productLists;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(productListsActions(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <div className="sticky top-20 ml-10 mt-20 md:ml-20 md:mt-40">
        <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 backdrop-blur-sm rounded-full flex items-center justify-center">
          <AiOutlineDoubleLeft
            className="absolute text-darkPrimary hover:text-opacity-45 duration-200 cursor-pointer text-3xl md:text-4xl lg:text-5xl"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <div className="px-5 pb-20 md:px-20 md:pb-40">
        <p className="text-center md:text-left mt-3 md:mt-6 text-[40px] md:text-[6vw] lg:text-[7vw] uppercase font-bold">
          Tất cả sản phẩm
        </p>

        {loading ? (
          <div className="h-screen">
            <div className="pt-10 pl-2">
              <Loading loading={loading} />
            </div>
          </div>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {products.map((product, i) => (
              <div key={i}>
                <img
                  onClick={() => navigate(`/products/${product._id}/detail`)}
                  src={product.images[0]}
                  className="w-full cursor-pointer"
                  alt=""
                />
                <p
                  onClick={() => navigate(`/products/${product._id}/detail`)}
                  className="cursor-pointer hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-red-300 via-red-300 to-yellow-300 duration-300 text-sm lg:text-base font-semibold text-darkPrimary line-clamp-2 mt-1"
                >
                  {product.name}
                </p>
                <p className="text-sm text-darkPrimary">{product.price} VND</p>
              </div>
            ))}
          </div>
        )}

        <Pagination page={page} pages={pages} keyword={keyword} />
      </div>
    </>
  );
}

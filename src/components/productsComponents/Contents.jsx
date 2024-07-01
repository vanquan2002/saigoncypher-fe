import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListsActions } from "../../redux/actions/ProductActions";
import Loading from "../Loading";
import Error from "../Error";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import Pagination from "./Pagination";
import { formatCurrency } from "../../utils/formatCurrency";
import { Divider } from "antd";

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
      <div className="sticky z-10 top-14 md:top-20 ml-5 mt-20 md:ml-20 md:mt-32 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 backdrop-blur-sm rounded-full flex items-center justify-center">
        <AiOutlineDoubleLeft
          className="absolute text-darkPrimary active:text-opacity-60 duration-200 cursor-pointer text-3xl md:text-4xl lg:text-5xl"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="px-5 md:px-20 pb-20 md:pb-40">
        <h1 className="text-center md:text-left mt-6 md:mt-12 text-[8vw] md:text-[5vw] uppercase font-bold">
          Tất cả sản phẩm
        </h1>

        {loading ? (
          <div className="h-screen">
            <div className="pt-10 pl-2">
              <Loading loading={loading} />
            </div>
          </div>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-20 lg:mt-28">
            {products.map((product, i) => (
              <div key={i}>
                <img
                  onClick={() => navigate(`/products/${product._id}/detail`)}
                  src={product.images[0]}
                  className="w-full cursor-pointer"
                  alt=""
                />
                <h5
                  onClick={() => navigate(`/products/${product._id}/detail`)}
                  className="flex cursor-pointer text-sm lg:text-base font-semibold text-darkPrimary line-clamp-2 mt-1 duration-200 hover:underline active:text-opacity-60"
                >
                  {product.name}
                </h5>
                <span className="text-sm text-darkPrimary">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 md:mt-14">
          <Divider>
            <Pagination page={page} pages={pages} keyword={keyword} />
          </Divider>
        </div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loading";
import Error from "../Error";
import { productDetailsActions } from "./../../redux/actions/ProductActions";
import ImageList from "./ImageList";

export default function Contents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(productDetailsActions(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="sticky top-14 md:top-20 ml-5 mt-20 md:ml-20 md:mt-32">
        <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 backdrop-blur-sm rounded-full flex items-center justify-center">
          <AiOutlineDoubleLeft
            className="absolute text-darkPrimary hover:text-opacity-45 duration-200 cursor-pointer text-3xl md:text-4xl lg:text-5xl"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="px-5 pb-20 md:px-20 md:pb-40">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
            <div className="col-span-1 w-full h-screen bg-red-300">
              <p>images</p>
              {/* <ImageList images={product.images} /> */}
            </div>
            <div className="col-span-1"></div>
          </div>
        )}
      </div>
    </>
  );
}

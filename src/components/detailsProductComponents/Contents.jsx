import { useEffect } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loading";
import Error from "../Error";
import {
  productDetailsActions,
  relatedProductsActions,
} from "./../../redux/actions/ProductActions";
import ImageList from "./ImageList";
import Details from "./Details";
import RelatedProducts from "./RelatedProducts";

export default function Contents({
  isShowModalAddCart,
  setIsShowModalAddCart,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productsRelated = useSelector((state) => state.productsRelated);
  const {
    loading: loadingProductsRelated,
    error: errorProductsRelated,
    products,
  } = productsRelated;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(productDetailsActions(id));
    dispatch(relatedProductsActions(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="sticky z-10 top-14 md:top-20 ml-5 mt-20 md:ml-20 md:mt-32 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 backdrop-blur-sm rounded-full flex items-center justify-center">
        <AiOutlineDoubleLeft
          className="absolute text-darkPrimary active:text-opacity-60 duration-200 cursor-pointer text-3xl md:text-4xl lg:text-5xl"
          onClick={() => navigate("/products")}
        />
      </div>
      <div className="px-5 md:px-20 pb-20 md:pb-40">
        <div>
          <h1 className="text-center md:text-left mt-6 md:mt-12 text-[8vw] md:text-[5vw] uppercase font-bold">
            Chi tiết sản phẩm
          </h1>
          {loading ? (
            <div className="h-screen">
              <div className="pt-10 pl-2">
                <Loading loading={loading} />
              </div>
            </div>
          ) : error ? (
            <div className="mt-4">
              <Error>{error}</Error>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-[10vw] mt-10 md:mt-20 lg:mt-28 lg:mx-[8vw]">
              <div className="col-span-1">
                <ImageList images={product.images} />
              </div>
              <div className="col-span-1">
                <Details
                  id={id}
                  product={product}
                  isShowModalAddCart={isShowModalAddCart}
                  setIsShowModalAddCart={setIsShowModalAddCart}
                />
              </div>
            </div>
          )}
        </div>

        <RelatedProducts
          loadingProductsRelated={loadingProductsRelated}
          errorProductsRelated={errorProductsRelated}
          products={products}
        />
      </div>
    </>
  );
}

import { useSelector } from "react-redux";
import Loading from "../Loading";
import Error from "../Error";
import { useNavigate } from "react-router";

export default function ProductLatests() {
  const navigate = useNavigate();
  const productLatests = useSelector((state) => state.productLatests);
  const { products, loading, error } = productLatests;

  return (
    <>
      <div className="mt-20 md:mt-40">
        <p className="text-darkPrimary text-3xl md:text-5xl lg:text-7xl font-semibold uppercase">
          Sản phẩm mới nhất
        </p>
      </div>
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
        <>
          <div className="flex flex-col gap-12 md:gap-20 mt-10 md:mt-20">
            {products.map((product, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10"
              >
                {i % 2 === 0 ? (
                  <>
                    <div
                      onClick={() =>
                        navigate(`/products/${product._id}/detail`)
                      }
                      className="col-span-4 cursor-pointer"
                    >
                      <img src={product.imageSlideshow} alt="" />
                    </div>
                    <div className="col-span-1 flex flex-col gap-1 h-full justify-end">
                      <p
                        onClick={() =>
                          navigate(`/products/${product._id}/detail`)
                        }
                        className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-red-300 via-red-300 to-yellow-300 duration-300 cursor-pointer text-xs md:text-sm lg:text-base font-medium md:font-semibold text-darkPrimary line-clamp-2"
                      >
                        {product.name}
                      </p>
                      <p className="text-[10px] md:text-[13px] text-darkPrimary">
                        {product.price} VND
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-1 flex flex-col gap-1 h-full justify-end">
                      <p
                        onClick={() =>
                          navigate(`/products/${product._id}/detail`)
                        }
                        className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-red-300 via-red-300 to-yellow-300 duration-300 cursor-pointer text-xs md:text-sm lg:text-base font-medium md:font-semibold text-darkPrimary line-clamp-2"
                      >
                        {product.name}
                      </p>
                      <p className="text-[10px] md:text-[13px] text-darkPrimary">
                        {product.price} VND
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/products/${product._id}/detail`)
                      }
                      className="col-span-4 cursor-pointer"
                    >
                      <img src={product.imageSlideshow} alt="" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full mt-10 md:mt-20">
            <p
              onClick={() => navigate("/products")}
              className="text-xs md:text-base font-medium cursor-pointer text-darkPrimary uppercase hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-red-300 via-red-300 to-yellow-300 duration-300"
            >
              [ Xem tất cả sản phẩm ]
            </p>
          </div>
        </>
      )}
    </>
  );
}

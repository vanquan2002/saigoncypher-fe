import { useSelector } from "react-redux";
import Loading from "../Loading";
import Error from "../Error";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductLatests() {
  const navigate = useNavigate();
  const productLatests = useSelector((state) => state.productLatests);
  const { products, loading, error } = productLatests;

  return (
    <>
      <div className="mt-20 md:mt-40">
        <h1 className="text-darkPrimary text-[7vw] md:text-5xl font-semibold uppercase">
          Sản phẩm mới nhất
        </h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-20">
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
                  className="flex cursor-pointer text-sm lg:text-base font-semibold text-darkPrimary line-clamp-2 mt-1 hover:underline active:text-opacity-60"
                >
                  {product.name}
                </h5>
                <span className="text-sm text-darkPrimary">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full mt-8 md:mt-12">
            <p
              onClick={() => navigate("/products")}
              className="text-xs md:text-base font-medium cursor-pointer text-darkPrimary text-opacity-70 hover:underline active:text-opacity-60"
            >
              [ Xem tất cả sản phẩm ]
            </p>
          </div>
        </>
      )}
    </>
  );
}

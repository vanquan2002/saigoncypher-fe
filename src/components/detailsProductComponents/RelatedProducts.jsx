import { useNavigate } from "react-router";
import { formatCurrency } from "../../utils/formatCurrency";
import Error from "../Error";
import Loading from "../Loading";

export default function RelatedProducts({
  loadingProductsRelated,
  errorProductsRelated,
  products,
}) {
  const navigate = useNavigate();

  return (
    <div className="mt-32 md:mt-60">
      <h4 className="text-lg md:text-xl uppercase">Các sản phẩm liên quan</h4>
      {loadingProductsRelated ? (
        <div className="h-screen">
          <div className="pt-10 pl-2">
            <Loading loading={loadingProductsRelated} />
          </div>
        </div>
      ) : errorProductsRelated ? (
        <Error>{errorProductsRelated}</Error>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 md:mt-7">
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
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import InfoAddCartMdComponent from "./InfoAddCartMdComponent";
import { useSelector } from "react-redux";
import InfoAddCartSmComponent from "./InfoAddCartSmComponent";

export default function Details({
  id,
  product,
  isShowModalAddCart,
  setIsShowModalAddCart,
}) {
  const [isShowBtnMore, setIsShowBtnMore] = useState(false);
  const [lineCountElement, setLineCountElement] = useState(0);
  const descriptionRef = useRef(null);
  const cart = useSelector((state) => state.cart);
  const { loading } = cart;

  const formatDataWithBr = (content) => {
    return (
      <div>
        <div
          ref={descriptionRef}
          className={`${
            lineCountElement > 3 && !isShowBtnMore && "line-clamp-3"
          }`}
        >
          <p className="text-darkPrimary text-[15px]">{content}</p>
        </div>
        {lineCountElement > 3 && (
          <button
            onClick={() => setIsShowBtnMore(!isShowBtnMore)}
            className="active:text-opacity-60 duration-200 underline text-darkPrimary text-[15px] cursor-pointer"
          >
            {isShowBtnMore ? "Rút gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };
  const handleResize = () => {
    if (descriptionRef.current) {
      const elementRect = descriptionRef.current.scrollHeight;
      const lineHeight = parseFloat(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const calculatedLineCount = Math.ceil(elementRect / lineHeight);
      setLineCountElement(calculatedLineCount);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <>
      <div className="w-full">
        <div>
          <h5>{product.name}</h5>
        </div>
        <p className="text-lg mt-2">{formatCurrency(product.price)}</p>
        <div className="mt-6 lg:mt-12 grid grid-cols-4">
          <p className="text-darkPrimary uppercase col-span-1 text-sm">Màu:</p>
          <p className="text-darkPrimary col-span-3">{product.color}</p>
        </div>
        <div className="mt-3 grid grid-cols-4">
          <p className="text-darkPrimary uppercase col-span-1 text-sm">
            Mô tả:
          </p>
          <div className="col-span-3">
            {formatDataWithBr(product.description)}
          </div>
        </div>
      </div>

      <InfoAddCartMdComponent id={id} product={product} loading={loading} />

      <InfoAddCartSmComponent
        id={id}
        product={product}
        loading={loading}
        isShowModalAddCart={isShowModalAddCart}
        setIsShowModalAddCart={setIsShowModalAddCart}
      />
    </>
  );
}

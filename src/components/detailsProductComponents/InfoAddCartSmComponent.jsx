import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Modal } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { addToCartActions } from "../../redux/actions/CartActions";

const ModalAddCartSmStyled = styled(Modal)`
  margin: 0 !important;
  padding: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: end;
  .ant-modal-content {
    width: 100vw;
    padding: 0 20px;
    border-radius: 0;
  }
  .ant-modal-footer {
    margin-top: 0;
  }
  transform: ${(props) =>
    props.isShowModalAddCart
      ? "translateY(0) !important"
      : "translateY(100%) !important"};
`;

export default function InfoAddCartSmComponent({
  id,
  product,
  loading,
  isShowModalAddCart,
  setIsShowModalAddCart,
}) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isMessageSize, setIsMessageSize] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandle = (e) => {
    e.preventDefault();
    if (size && qty) {
      dispatch(addToCartActions(id, qty, size));
    } else if (!size) {
      setIsMessageSize(true);
    } else if (qty === 0) {
      dispatch(addToCartActions(id, 1, size));
      setQty(1);
    }
  };
  const increment = () => {
    setQty(qty + 1);
  };
  const decrement = () => {
    setQty(qty - 1);
  };
  const setInputQtyHandle = (num) => {
    if (num !== "" && !isNaN(num) && num > 0) {
      if (num <= 50) {
        setQty(parseInt(num));
      } else {
        setQty(50);
      }
    } else {
      setQty(0);
    }
  };

  useEffect(() => {
    if (size) {
      setIsMessageSize(false);
    }
  }, [size]);

  return (
    <ModalAddCartSmStyled
      isShowModalAddCart={isShowModalAddCart}
      open={isShowModalAddCart}
      onCancel={() => setIsShowModalAddCart(false)}
      footer={[]}
    >
      <div className="bottom-0 left-0 w-full md:hidden">
        <div className="py-4">
          <p className="uppercase text-sm">Chọn size</p>
        </div>
        <div className="md:px-8 lg:px-12">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-2">
              {product.sizes?.map((item, indexPr) => (
                <div
                  onClick={() => setSize(item.size)}
                  key={indexPr}
                  className={`cursor-pointer flex justify-center items-center ${
                    item.size === size ? "bg-darkPrimary" : "bg-whitePrimary"
                  } border-[1px] border-black w-full h-12 duration-200 ${
                    indexPr % 2 !== 0 && "border-l-0"
                  } ${indexPr >= 2 && "border-t-0"} `}
                >
                  <button
                    className={`uppercase ${
                      item.size === size ? "text-whitePrimary" : "text-black"
                    }`}
                  >
                    {item.size}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="cursor-pointer underline text-[13px] text-black opacity-75">
                Hướng dẫn chọn size
              </p>
              {isMessageSize && (
                <p className="uppercase text-xs text-red-500">
                  Bạn chưa chọn size!
                </p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-between w-full mt-6">
            <p className="text-sm">Chọn hoặc nhập số lượng</p>
            <div className="flex">
              <button
                className={`${
                  qty <= 1 && "opacity-30 pointer-events-none"
                } duration-200 active:bg-darkPrimary active:bg-opacity-15 flex cursor-pointer w-12 h-9 md:w-10 md:h-9 lg:w-12 lg:h-9 justify-center items-center border-t border-l border-b border-black`}
                onClick={decrement}
              >
                <AiOutlineMinus color="#1c1c1c" size="1rem" />
              </button>
              <div className="">
                <input
                  className="w-12 h-9 md:w-10 md:h-9 lg:w-12 lg:h-9 bg-whitePrimary text-black text-lg text-center outline-none border-black border"
                  type="text"
                  onChange={(e) => setInputQtyHandle(e.target.value)}
                  value={qty}
                />
              </div>
              <button
                className={`${
                  qty >= 50 && "opacity-30 pointer-events-none"
                } duration-200 active:bg-darkPrimary active:bg-opacity-15 flex cursor-pointer w-12 h-9 md:w-10 md:h-9 lg:w-12 lg:h-9 justify-center items-center border-t border-r border-b border-black`}
                onClick={increment}
              >
                <AiOutlinePlus color="#1c1c1c" size="1rem" />
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={addToCartHandle}
          className={`w-full h-12 mt-5 ${
            size
              ? "bg-darkPrimary text-whitePrimary active:text-opacity-60"
              : "bg-whitePrimary text-black active:text-opacity-60"
          } duration-200 font-normal cursor-pointer text-base flex justify-center items-center `}
        >
          <p className="uppercase">{loading ? "Đang thêm..." : "Thêm"}</p>
        </div>
      </div>
    </ModalAddCartSmStyled>
  );
}

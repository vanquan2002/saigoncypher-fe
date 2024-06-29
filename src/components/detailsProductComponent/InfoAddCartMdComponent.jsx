import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { Modal } from "antd";
import styled from "styled-components";
import { addToCartActions } from "../../redux/actions/CartActions";

const ModalWarningCartStyled = styled(Modal)`
  width: 400px !important;
  border: none;
  .ant-modal-content {
    padding: 0;
    width: 100%;
    border-radius: 0;
  }
  .ant-modal-header {
    padding: 0 20px;
    padding-top: 18px;
  }
  .ant-modal-body {
    padding: 0 20px;
    padding-top: 2px;
  }
  .ant-modal-footer {
    margin-top: 20px;
  }
  .ant-modal-title {
    font-weight: 500;
  }
`;

export default function InfoAddCartMdComponent({ id, product, loading }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isMessageSize, setIsMessageSize] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="hidden md:block mt-14 w-full">
        <div className="">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 gap-2">
              {product.sizes?.map((item, i) => (
                <div
                  onClick={() => setSize(item.size)}
                  key={i}
                  className={`cursor-pointer flex justify-center items-center ${
                    item.size === size ? "bg-darkPrimary" : "bg-whitePrimary"
                  } border-[1px] border-black w-full h-9 duration-200`}
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
            <p className="cursor-pointer underline text-[13px] mt-2 text-black opacity-75">
              Hướng dẫn chọn size
            </p>
          </div>
          <div className="flex gap-2 items-end justify-between mt-10">
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
          className={`w-full h-14 mt-5 ${
            size
              ? "bg-darkPrimary text-whitePrimary active:text-opacity-60"
              : "bg-whitePrimary text-black active:text-opacity-60"
          } duration-200 font-normal cursor-pointer text-base flex justify-center items-center border border-black`}
        >
          <p className="uppercase">
            {loading ? "Đang thêm..." : "Thêm vào giỏ"}
          </p>
        </div>
      </div>

      <ModalWarningCartStyled
        closable={false}
        className="font-montserrat"
        centered
        open={isMessageSize}
        title="CẢNH BÁO!"
        onCancel={() => setIsMessageSize(false)}
        footer={[
          <div
            key="btn-cancel"
            className="flex justify-center w-full cursor-pointer border-t border-black duration-200 text-black active:text-opacity-60"
            onClick={() => setIsMessageSize(false)}
          >
            <button className="py-3 uppercase">Đóng</button>
          </div>,
        ]}
      >
        <p className="uppercase">Quý khách chưa chọn size</p>
      </ModalWarningCartStyled>
    </>
  );
}

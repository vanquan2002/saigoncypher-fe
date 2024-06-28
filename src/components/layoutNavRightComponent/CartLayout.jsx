import { useDispatch, useSelector } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutNavRightActions";
import { MdClose } from "react-icons/md";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect, useRef, useState } from "react";
import CartLayoutItems from "./CartLayoutItems";

export default function CartLayout({ result }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartHeight, setCartHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [displayWidth, setDisplayWidth] = useState(0);
  const cartRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const layoutResetCartHandle = () => {
    dispatch(setLayoutResetActions());
  };
  const handleScroll = () => {
    const scrollTop = cartRef.current.scrollTop;
    const scrollHeight = cartRef.current.scrollHeight;
    const height = cartRef.current.clientHeight;
    const scrollPercentage = ((scrollTop + height) / scrollHeight) * 100;
    const widthDisplay = Math.floor(scrollPercentage);
    setDisplayWidth(widthDisplay);
  };
  const setCartHeightHandle = () => {
    if (cartRef.current) {
      setCartHeight(cartRef.current.scrollHeight);
      cartRef.current.addEventListener("scroll", handleScroll);
    }
  };
  const setTotalHeightHandle = () => {
    if (containerRef.current) {
      setTotalHeight(containerRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    handleScroll();
    setCartHeightHandle();
    setTotalHeightHandle();
    return () => {
      if (cartRef.current) {
        cartRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [cartItems]);

  return (
    <div
      ref={containerRef}
      onClick={layoutResetCartHandle}
      className={`${
        result
          ? "opacity-100 duration-300 pointer-events-auto"
          : "opacity-0 duration-300 pointer-events-none"
      } fixed top-0 left-0 flex justify-end w-full z-20 bg-darkPrimary bg-opacity-60`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          result
            ? "translate-x-0 duration-300"
            : "translate-x-[500px] duration-300"
        } w-[80vw] md:w-[60vw] lg:w-[40vw] h-screen bg-whitePrimary`}
      >
        {/* Content */}
        <div className="relative flex flex-col gap-5 p-5 md:p-16 h-full">
          <div className="flex justify-between w-full items-center">
            <p className="text-darkPrimary font-medium uppercase text-sm md:text-base">
              Cart
            </p>
            <MdClose
              onClick={layoutResetCartHandle}
              className="cursor-pointer text-xl md:text-2xl"
            />
          </div>
          {cartHeight > totalHeight && (
            <div className="relative bg-darkPrimary bg-opacity-10 my-1 md:my-4 w-full h-[0.2rem]">
              <div
                className="absolute top-0 left-0 bg-darkPrimary bg-opacity-50"
                style={{
                  width: `${displayWidth}%`,
                  transition: "width 0.3s ease",
                  height: "100%",
                }}
              ></div>
            </div>
          )}

          <div ref={cartRef} className="scrollbar-none overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex justify-center items-center my-14">
                <h5 className="text-darkPrimary text-opacity-45 text-sm md:text-base">
                  Chưa có sản phẩm nào cả
                </h5>
              </div>
            ) : (
              <CartLayoutItems />
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-whitePrimary">
            <div className="flex items-center justify-between px-5 md:px-10 pt-5 md:pt-8">
              <p className="uppercase text-sm text-darkPrimary">Tổng tiền: </p>
              <p className="text-base font-medium text-darkPrimary">
                {formatCurrency(parseInt(total))}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button className="duration-300 hover:bg-darkPrimary hover:bg-opacity-15 border-t border-r border-black w-full px-3 md:px-6 py-4 text-sm uppercase text-black">
                Xem giỏ hàng
              </button>
              <button className="duration-300 hover:bg-darkPrimary hover:bg-opacity-15 border-t border-black w-full px-3 md:px-6 py-4 text-sm uppercase text-black">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

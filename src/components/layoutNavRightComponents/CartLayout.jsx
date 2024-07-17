import { useDispatch, useSelector } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutNavRightActions";
import { MdClose } from "react-icons/md";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect, useRef, useState } from "react";
import CartLayoutItems from "./CartLayoutItems";
import { useNavigate } from "react-router";

export default function CartLayout({ result }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartHeight, setCartHeight] = useState(0);
  const [totalCartHeight, setTotalCartHeight] = useState(0);
  const [displayWidth, setDisplayWidth] = useState(0);
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);

  const layoutResetCartHandle = () => {
    dispatch(setLayoutResetActions());
  };
  const handleScroll = () => {
    const cartElement = cartRef.current;
    if (cartElement) {
      const scrollTopCartElement = cartElement.scrollTop;
      const scrollHeightCartElement = cartElement.scrollHeight;
      const clientHeightCartElement = cartElement.clientHeight;
      const scrollPercentage =
        ((scrollTopCartElement + clientHeightCartElement) /
          scrollHeightCartElement) *
        100;
      // const scrollPercentage =
      //   (scrollTopCartElement /
      //     (scrollHeightCartElement - clientHeightCartElement)) *
      //   100;
      setDisplayWidth(Math.min(scrollPercentage, 100));
    }
  };
  const updateCartDimensions = () => {
    if (cartRef.current) {
      setCartHeight(cartRef.current.offsetHeight);
      setTotalCartHeight(cartRef.current.scrollHeight);
    }
  };
  const navigateCartHandle = async () => {
    layoutResetCartHandle();
    navigate("/cart");
  };

  useEffect(() => {
    const cartElement = cartRef.current;
    updateCartDimensions();
    handleScroll();
    if (cartElement) {
      cartElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (cartElement) {
        cartElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [cartItems]);

  return (
    <div
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
        <div className="relative flex flex-col gap-5 p-5 h-full">
          <div className="flex justify-between w-full items-center">
            <p className="text-darkPrimary font-medium uppercase text-sm md:text-base">
              Cart
            </p>
            <MdClose
              onClick={layoutResetCartHandle}
              className="cursor-pointer text-xl md:text-2xl"
            />
          </div>
          {cartHeight < totalCartHeight && (
            <div className="relative bg-darkPrimary bg-opacity-10 mb-1 w-full h-[0.2rem]">
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

          <div ref={cartRef} className="scrollbar-none overflow-y-auto mb-24">
            {cartItems.length === 0 ? (
              <div className="flex justify-center items-center my-14">
                <h5 className="text-darkPrimary text-opacity-45 text-sm md:text-base">
                  Chưa có sản phẩm nào cả
                </h5>
              </div>
            ) : (
              <CartLayoutItems cartItems={cartItems} />
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-whitePrimary">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="uppercase text-sm text-darkPrimary">Tổng tiền: </p>
              <p className="text-base font-medium text-darkPrimary">
                {formatCurrency(parseInt(total))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={navigateCartHandle}
                className="duration-200 active:bg-darkPrimary active:bg-opacity-15 border-t border-r border-black w-full px-3 md:px-6 py-4 text-sm uppercase text-black"
              >
                Xem giỏ hàng
              </button>
              <button className="duration-200 active:bg-darkPrimary active:bg-opacity-15 border-t border-black w-full px-3 md:px-6 py-4 text-sm uppercase text-black">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

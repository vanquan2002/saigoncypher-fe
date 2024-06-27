import { useDispatch, useSelector } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutNavRightActions";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect, useRef, useState } from "react";

export default function CartLayout({ result }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartHeight, setCartHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [displayWidth, setDisplayWidth] = useState(0);
  const cartRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const layoutResetCartHandle = () => {
    dispatch(setLayoutResetActions());
  };
  const navigateProductHandle = (product) => {
    layoutResetCartHandle();
    navigate(`/products/${product}/detail`);
  };
  const removeFromCartHandle = (id, size) => {};

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
    const preventWindowScroll = (e) => {
      // if (
      //   cartRef.current?.contains(e.target) &&
      //   containerRef.current &&
      //   cartRef.current.scrollHeight > containerRef.current.scrollHeight
      // ) {
      //   e.preventDefault();
      // }
    };
    window.addEventListener("wheel", preventWindowScroll, { passive: false });
    return () => {
      if (cartRef.current) {
        cartRef.current.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("wheel", preventWindowScroll);
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
          <div className="flex justify-between w-full items-center mb-5">
            <p className="text-darkPrimary font-medium uppercase text-sm md:text-base">
              Cart
            </p>
            <MdClose
              onClick={layoutResetCartHandle}
              className="cursor-pointer text-xl md:text-2xl"
            />
          </div>
          <div
            className="absolute bg-darkPrimary bg-opacity-80"
            style={{
              width: `${displayWidth}%`,
              transition: "width 0.3s ease",
              height: "0.1rem",
            }}
          ></div>

          <div ref={cartRef} className="scrollbar-none overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex justify-center items-center my-14">
                <p className="text-darkPrimary text-opacity-45 text-sm md:text-base">
                  Chưa có sản phẩm nào cả
                </p>
              </div>
            ) : (
              <div className="mb-24 md:mb-16">
                {cartItems.map((item, i) => (
                  <div
                    className={`flex items-center gap-3 md:gap-5 ${
                      cartItems.length - 1 > i &&
                      "border-b border-darkPrimary border-opacity-15 pb-5 mb-5"
                    }`}
                    key={i}
                  >
                    <img
                      onClick={() => navigateProductHandle(item.product)}
                      className="w-16 md:w-20 cursor-pointer"
                      src={item.image}
                      alt=""
                    />
                    <div className="flex w-full items-start justify-between gap-1 md:gap-5">
                      <div className="flex w-full flex-col gap-1">
                        <div className="">
                          <h4
                            onClick={() => navigateProductHandle(item.product)}
                            className="line-clamp-1 md:line-clamp-2 text-darkPrimary font-medium text-sm cursor-pointer"
                          >
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex gap-5 justify-between items-center">
                          <div className="flex gap-1 text-sm text-black text-opacity-80">
                            <p>Size:</p>
                            <span className="uppercase">{item.size}</span>
                          </div>
                          <p className="text-sm line-clamp-1 text-black text-opacity-80">
                            {item.color}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex justify-center items-center bg-white bg-opacity-60 h-7 w-7">
                            <p className="text-sm text-black text-opacity-80">
                              {item.qty}
                            </p>
                          </div>
                          <p className="text-sm text-black text-opacity-80">
                            {item.price} VND
                          </p>
                        </div>
                      </div>
                      <div
                        className="p-1 rounded-full flex justify-center items-center border border-darkPrimary"
                        onClick={() =>
                          removeFromCartHandle(item.product, item.size)
                        }
                      >
                        <MdClose
                          size="1rem"
                          className="text-darkPrimary cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

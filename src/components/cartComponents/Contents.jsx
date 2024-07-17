import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useNavigate } from "react-router";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItemCartActions } from "../../redux/actions/CartActions";
import { useEffect } from "react";

export default function Contents({ cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQlt = cartItems.reduce((a, i) => a + i.qty, 0);

  const removeFromCartHandle = (id, size) => {
    dispatch(removeItemCartActions(id, size));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="sticky z-10 top-14 md:top-20 ml-5 mt-20 md:ml-20 md:mt-32 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 backdrop-blur-sm rounded-full flex items-center justify-center">
        <AiOutlineDoubleLeft
          className="absolute text-darkPrimary active:text-opacity-60 duration-200 cursor-pointer text-3xl md:text-4xl lg:text-5xl"
          onClick={() => navigate("/products")}
        />
      </div>
      <div className="px-5 md:px-20 pb-20 md:pb-40">
        <h1 className="text-center md:text-left mt-6 md:mt-12 text-[8vw] md:text-[5vw] uppercase font-bold">
          Giỏ hàng
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 md:gap-32 mt-10 md:mt-20 lg:mt-28">
          <div className="lg:col-span-3">
            {cartItems.length === 0 ? (
              <h5 className="text-darkPrimary">Giỏ hàng của bạn đang trống</h5>
            ) : (
              <>
                <h6 className="mb-2 md:mb-6">{totalQlt} sản phẩm</h6>
                {cartItems.map((item, i) => (
                  <div
                    className={`flex items-center gap-3 md:gap-5 ${
                      cartItems.length - 1 > i &&
                      "border-b border-dashed border-darkPrimary border-opacity-15 pb-5 mb-5"
                    }`}
                    key={i}
                  >
                    <img
                      onClick={() =>
                        navigate(`/products/${item.product}/detail`)
                      }
                      className="w-16 md:w-20 cursor-pointer"
                      src={item.image}
                      alt=""
                    />
                    <div className="flex w-full items-start justify-between gap-1 md:gap-5">
                      <div className="flex w-full flex-col gap-1">
                        <div className="">
                          <h4
                            onClick={() =>
                              navigate(`/products/${item.product}/detail`)
                            }
                            className="duration-200 active:text-opacity-60 hover:underline line-clamp-1 md:line-clamp-2 text-darkPrimary font-medium text-sm cursor-pointer"
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
              </>
            )}
          </div>

          {cartItems.length != 0 && <div className="lg:col-span-2"></div>}
        </div>
      </div>
    </>
  );
}

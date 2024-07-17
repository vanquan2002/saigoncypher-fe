import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeItemCartActions } from "../../redux/actions/CartActions";
import { MdClose } from "react-icons/md";
import { setLayoutResetActions } from "../../redux/actions/LayoutNavRightActions";

export default function CartLayoutItems({ cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const layoutResetCartHandle = () => {
    dispatch(setLayoutResetActions());
  };
  const navigateProductHandle = (product) => {
    layoutResetCartHandle();
    navigate(`/products/${product}/detail`);
  };
  const removeFromCartHandle = (id, size) => {
    dispatch(removeItemCartActions(id, size));
  };

  return (
    <>
      {cartItems.map((item, i) => (
        <div
          className={`flex items-center gap-3 md:gap-5 ${
            cartItems.length - 1 > i &&
            "border-b border-dashed border-darkPrimary border-opacity-15 pb-5 mb-5"
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
              onClick={() => removeFromCartHandle(item.product, item.size)}
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
  );
}

import { RiSearchLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  setLayoutCartActions,
  setLayoutMenuActions,
  setLayoutSearchActions,
} from "./../redux/actions/LayoutNavRightActions";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const layoutSearchHandler = () => {
    dispatch(setLayoutSearchActions());
  };
  const layoutCartHandler = () => {
    dispatch(setLayoutCartActions());
  };
  const layoutMenuHandler = () => {
    dispatch(setLayoutMenuActions());
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full backdrop-blur-sm flex justify-between items-center md:min-h-16 min-h-12 px-5">
      <div className="flex items-center">
        <p
          onClick={() => navigate("/")}
          className="text-base uppercase text-darkPrimary font-bold cursor-pointer"
        >
          saigoncypher
        </p>
      </div>
      <div className="flex justify-between items-center md:gap-6 gap-4">
        <RiSearchLine
          onClick={layoutSearchHandler}
          size="1.3rem"
          className="cursor-pointer text-darkPrimary active:text-opacity-60"
        />
        <MdOutlineShoppingBag
          onClick={layoutCartHandler}
          size="1.3rem"
          className="cursor-pointer text-darkPrimary active:text-opacity-60"
        />
        <HiOutlineUser
          onClick={layoutMenuHandler}
          size="1.3rem"
          className="cursor-pointer text-darkPrimary active:text-opacity-60"
        />
      </div>
    </div>
  );
}

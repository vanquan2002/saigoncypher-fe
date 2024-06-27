import { useDispatch } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutNavRightActions";
import { MdClose } from "react-icons/md";

export default function MenuLayout({ result }) {
  const dispatch = useDispatch();
  const layoutResetMenuHandle = () => {
    dispatch(setLayoutResetActions());
  };

  return (
    <div
      onClick={layoutResetMenuHandle}
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
        <div className="flex flex-col gap-7 items-center p-10 md:p-16">
          <div className="flex justify-between w-full items-center mb-5">
            <p className="text-darkPrimary font-medium uppercase text-sm md:text-base">
              Menu
            </p>
            <MdClose
              onClick={layoutResetMenuHandle}
              className="cursor-pointer text-xl md:text-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

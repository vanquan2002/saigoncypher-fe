import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutNavRightActions";
import { useNavigate } from "react-router";

export default function SearchLayout({ result }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const layoutResetSearchHandle = () => {
    dispatch(setLayoutResetActions());
  };

  const submitHandle = (e) => {
    e.preventDefault();
    layoutResetSearchHandle();
    setTimeout(() => {
      if (keyword.trim()) {
        navigate(`/products/search/${keyword}`);
      } else {
        navigate(`/products`);
      }
      setKeyword("");
    }, 500);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [result]);

  return (
    <div
      onClick={layoutResetSearchHandle}
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
              Search
            </p>
            <MdClose
              onClick={layoutResetSearchHandle}
              className="cursor-pointer text-xl md:text-2xl"
            />
          </div>
          <form
            onSubmit={submitHandle}
            className="flex items-center w-full justify-center"
          >
            <div className="relative w-full">
              <input
                ref={inputRef}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-4 py-2 md:pl-6 md:py-3 pr-10 md:pr-14 placeholder:text-[0.9rem] placeholder:text-darkPrimary outline-none border border-darkPrimary"
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={keyword}
              />
              <RiSearchLine
                onClick={submitHandle}
                className="absolute top-1/2 right-3 md:right-5 text-xl md:text-2xl cursor-pointer transform -translate-y-1/2 text-darkPrimary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

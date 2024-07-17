import { useSelector } from "react-redux";
import MainLayout from "../components/layoutNavRightComponents/MainLayout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Contents from "../components/detailsProductComponents/Contents";
import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";

export default function DetailsProductScreen() {
  const layoutNavRight = useSelector((state) => state.layoutNavRight);
  const { result } = layoutNavRight;
  const [isShowModalAddCart, setIsShowModalAddCart] = useState(false);
  const [showAddToCartButton, setShowAddToCartButton] = useState(true);
  const footerContainerRef = useRef(null);

  const scrollHandle = () => {
    const footerContainer = footerContainerRef.current;
    if (footerContainer) {
      const windowHeight = window.innerHeight;
      const footerContainerHeight = footerContainer.scrollHeight;
      const scrollPosition = window.scrollY;
      const scrolledToBottom =
        Math.ceil(scrollPosition + windowHeight) >= footerContainerHeight;
      setShowAddToCartButton(!scrolledToBottom);
    }
  };

  const debounceScroll = useMemo(
    () =>
      debounce(() => {
        scrollHandle();
      }, 200),
    []
  );

  useEffect(() => {
    scrollHandle();
    window.addEventListener("scroll", debounceScroll);
    return () => {
      window.removeEventListener("scroll", debounceScroll);
    };
  }, []);

  return (
    <div ref={footerContainerRef} className="min-h-screen">
      <Header />
      <Contents
        isShowModalAddCart={isShowModalAddCart}
        setIsShowModalAddCart={setIsShowModalAddCart}
      />
      <Footer />

      <button
        onClick={() => setIsShowModalAddCart(!isShowModalAddCart)}
        className={`fixed z-0 left-0 bottom-0 flex items-center justify-center w-screen h-12 uppercase cursor-pointer text-sm bg-darkPrimary duration-200 ${
          !showAddToCartButton || result ? "translate-y-14" : "translate-y-0"
        } text-whitePrimary active:text-opacity-15 md:hidden`}
      >
        Thêm vào giỏ
      </button>

      <MainLayout result={result} />
    </div>
  );
}

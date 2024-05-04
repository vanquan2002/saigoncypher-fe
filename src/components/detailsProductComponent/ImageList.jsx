import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import Fancybox from "./Fancybox";

const ImageList = ({ images }) => {
  const containerRef = useRef(null);
  const imgsRef = useRef(null);
  const imgsRefs = useRef([]);
  const [scrollY, setScrollY] = useState(0);
  const [heightContainer, setHeightContainer] = useState(0);
  const [displayHeightContainer, setDisplayHeightContainer] = useState(0);
  const [offsetHeightContainer, setOffsetHeightContainer] = useState(0);

  const wheelImgs = (e) => {
    const deltaY = e.deltaY;
    const scrollSpeed = 0.5;
    containerRef.current.scrollTop += deltaY * scrollSpeed;
  };
  const wheelImgsWhenClickHandle = (index) => {
    const targetElement = imgsRefs.current[index];
    if (targetElement) {
      const containerTop = containerRef.current.offsetTop;
      const targetTop = targetElement.offsetTop;
      const offset = targetTop - containerTop;
      containerRef.current.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };
  const setHeightContainerHandle = () => {
    if (imgsRef.current) {
      setHeightContainer(containerRef.current.scrollHeight);
    }
  };
  const handleScroll = () => {
    setScrollY(containerRef.current.scrollTop);
  };
  const setOffsetHeightContainerHandle = () => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
      setOffsetHeightContainer(containerRef.current.offsetHeight);
    }
  };
  const debouncedResizeContainer = useMemo(
    () =>
      debounce(() => {
        setHeightContainerHandle();
        setOffsetHeightContainerHandle();
      }, 500),
    []
  );

  useEffect(() => {
    setHeightContainerHandle();
    setOffsetHeightContainerHandle();
    const preventWindowScroll = (e) => {
      if (
        containerRef.current?.contains(e.target) &&
        heightContainer !== scrollY + offsetHeightContainer &&
        scrollY !== 0
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("resize", debouncedResizeContainer);
    window.addEventListener("wheel", preventWindowScroll, { passive: false });
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("wheel", preventWindowScroll);
      window.removeEventListener("resize", debouncedResizeContainer);
      debouncedResizeContainer.cancel();
    };
  }, []);

  useEffect(() => {
    const percentage =
      ((scrollY + offsetHeightContainer) / heightContainer) * 100;
    const displayHeightContainer = Math.floor(percentage);
    setDisplayHeightContainer(displayHeightContainer);
  }, [heightContainer, offsetHeightContainer, scrollY]);

  return (
    <div className="flex relative">
      <div className="w-full">
        <Fancybox
          options={{
            Carousel: {
              infinite: true,
            },
            Thumbs: {
              showOnStart: false,
            },
            Toolbar: {
              display: {
                left: ["infobar"],
                middle: [],
                right: ["zoomIn", "zoomOut", "close"],
              },
            },
            contentClick: "toggleMax",
            Images: {
              Panzoom: {
                maxScale: 2,
                panMode: "mousemove",
                mouseMoveFactor: 1.1,
                mouseMoveFriction: 0.12,
              },
            },
          }}
        >
          <div
            onWheel={(e) => wheelImgs(e)}
            ref={containerRef}
            className="bg-white w-full h-[450px] md:h-[520px] overflow-hidden scrollbar-none overflow-y-auto"
          >
            <div className="md:ml-11 lg:ml-0" ref={imgsRef}>
              {images?.map((img, i) => (
                <a
                  data-fancybox="gallery"
                  className="flex flex-col items-center"
                  href={img}
                  ref={(element) => (imgsRefs.current[i] = element)}
                  key={i}
                >
                  <img
                    src={img}
                    className="object-cover h-[450px] md:h-[520px]"
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
        </Fancybox>
      </div>
      <div className="bg-darkPrimary bg-opacity-10 h-[450px] md:h-[520px] ml-3 lg:ml-4 xl:ml-6">
        <div
          style={{
            height: `${displayHeightContainer}%`,
            transition: "height 0.3s ease",
            width: "2px",
          }}
          className="bg-darkPrimary bg-opacity-80"
        ></div>
      </div>
      <div className="absolute bottom-1 left-1 lg:static w-9 lg:w-10 min-h-1 flex flex-col justify-end lg:ml-4 xl:ml-6">
        {images?.map((img, i) => (
          <div key={i} className="mt-1">
            <button
              className="flex justify-center items-center hover:bg-darkPrimary hover:bg-opacity-5"
              onClick={() => wheelImgsWhenClickHandle(i)}
            >
              <img src={img} className="w-full" alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;

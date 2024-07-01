import { useState } from "react";
import Fancybox from "./Fancybox";

const ImageList = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const wheelImgsWhenClickHandle = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="gap-2 lg:gap-6">
      <div className="relative">
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
          <div className="">
            {images?.map((img, i) => (
              <a
                key={i}
                data-fancybox="gallery"
                className={`flex flex-col items-end ${
                  currentIndex === i ? "block" : "hidden"
                }`}
                href={img}
              >
                <img src={img} className="w-full" alt="" />
              </a>
            ))}
          </div>
        </Fancybox>

        <div className="absolute left-1 bottom-1 flex flex-col justify-end">
          {images?.map((img, i) => (
            <div key={i} className="mt-1">
              <button
                className="flex justify-center items-center active:opacity-75 duration-200"
                onClick={() => wheelImgsWhenClickHandle(i)}
              >
                <img src={img} className="w-10 md:w-[4vw]" alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageList;

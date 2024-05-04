import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";

register();

export default function Slides() {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      autoplay: {
        delay: 3000,
      },
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            color: #333;
          }
          .swiper-button-next svg, 
          .swiper-button-prev svg {
            width: 50%;
          }
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <div className="mt-5 md:mt-16">
      <swiper-container ref={swiperRef} init="false">
        <swiper-slide>
          <img
            src="https://static.zara.net/assets/public/e60b/8c67/e92741479f25/df406104b5b2/image-landscape-fill-6ac60c0a-b5b7-459c-900c-d88e76529134-default_0.jpg?ts=1713799708209&w=1868"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://static.zara.net/assets/public/8054/61d3/a27f46e69e9d/c5de0d9f18dd/image-landscape-default-fill-b7715e17-e811-48a2-9958-7c3ff1afe220-default_0.jpg?ts=1713799035246&w=1868"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://static.zara.net/assets/public/30dd/aba4/67654df29e66/96761bceadcb/image-landscape-fill-457d11a8-bbc0-4018-8efd-a69decba9172-default_0.jpg?ts=1713800101235&w=1868"
            alt=""
          />
        </swiper-slide>
      </swiper-container>
    </div>
  );
}

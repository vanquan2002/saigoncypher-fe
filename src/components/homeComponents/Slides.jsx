import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";

register();

export default function Slides() {
  const swiperRef = useRef(null);
  const [changeSliders, setChangeSliders] = useState(false);

  const imgsSm = [
    "https://static.zara.net/assets/public/54f3/f612/eb7a4731837a/a8c09b58ba41/T0070651080-ult/T0070651080-ult.jpg?ts=1718810592137&w=725",
    "https://static.zara.net/assets/public/f67c/74c4/942c49259594/ff1d6c16de65/T9000000096-ult/T9000000096-ult.jpg?ts=1718810586111&w=765",
    "https://static.zara.net/assets/public/10fa/cab2/cd4949158003/3a9c1d8d7283/T0070626080-ult/T0070626080-ult.jpg?ts=1718810584296&w=725",
  ];
  const imgsMd = [
    "https://static.zara.net/assets/public/e60b/8c67/e92741479f25/df406104b5b2/image-landscape-fill-6ac60c0a-b5b7-459c-900c-d88e76529134-default_0.jpg?ts=1713799708209&w=1868",
    "https://static.zara.net/assets/public/8054/61d3/a27f46e69e9d/c5de0d9f18dd/image-landscape-default-fill-b7715e17-e811-48a2-9958-7c3ff1afe220-default_0.jpg?ts=1713799035246&w=1868",
    "https://static.zara.net/assets/public/30dd/aba4/67654df29e66/96761bceadcb/image-landscape-fill-457d11a8-bbc0-4018-8efd-a69decba9172-default_0.jpg?ts=1713800101235&w=1868",
  ];

  const resizeHandle = () => {
    if (window.innerWidth <= 768) {
      setChangeSliders(true);
    } else {
      setChangeSliders(false);
    }
  };
  const debounceResize = useMemo(
    () =>
      debounce(() => {
        resizeHandle();
      }, 200),
    []
  );

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

    resizeHandle();
    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  return (
    <div className="mb-20 md:mb-40">
      <swiper-container ref={swiperRef} init="false">
        {changeSliders
          ? imgsSm.map((item, i) => (
              <swiper-slide key={i}>
                <img
                  src={item}
                  alt={item}
                  // className={`${changeSliders && "h-screen object-cover"}`}
                />
              </swiper-slide>
            ))
          : imgsMd.map((item, i) => (
              <swiper-slide key={i}>
                <img src={item} alt={item} />
              </swiper-slide>
            ))}
      </swiper-container>
    </div>
  );
}

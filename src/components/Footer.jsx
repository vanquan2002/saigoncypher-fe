import Information from "./Information";

export default function Footer() {
  const socialNetwork = ["facebook", "threads", "tiktok", "youtube"];
  const usefulLinks = [
    "Tài khoản của tôi",
    "Đổi, trả hàng và hoàn tiền",
    "Chính sách bảo mật thông tin",
    "Chính sách vận chuyển, giao hàng",
    "Giới thiệu về chúng tôi",
    "Đóng góp ý tưởng - ý kiến",
  ];

  return (
    <div className="p-5 md:p-20 mt-16 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-28">
        <div className="flex flex-col lg:items-start gap-16 md:gap-28">
          <div className="text-darkPrimary uppercase">
            <h4>Hotline</h4>
            <h1 className="mt-3 md:mt-5 text-4xl md:text-[3.5rem]">
              0905260448
            </h1>
            <p className="text-[10px] md:text-[11px] mt-4 md:mt-6">
              Online Từ Thứ 2 đến Chúa Nhật, Từ 9am đến 6pm
            </p>
            <div className="">
              <span className="text-[10px] md:text-[11px]">Email: </span>
              <span className="text-[10px] md:text-[11px] text-darkPrimary duration-200 active:text-opacity-60 hover:underline cursor-pointer">
                SUPPORT@SAIGONCYPHER.COM
              </span>
            </div>
          </div>
          <Information />
        </div>

        <div className="flex flex-col gap-16 md:gap-28 lg:justify-between lg:items-end">
          <div className="flex flex-col gap-1 lg:items-end">
            {usefulLinks.map((item, i) => (
              <span
                key={i}
                className="text-[11px] md:text-sm text-darkPrimary duration-200 active:text-opacity-60 uppercase font-medium hover:underline cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-8">
            {socialNetwork.map((item, i) => (
              <span
                key={i}
                className="text-[11px] md:text-sm text-darkPrimary duration-200 active:text-opacity-60 mt-1 uppercase font-medium hover:underline cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="p-10 md:p-20 bg-darkPrimary min-h-1">
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-x-8 gap-y-2 md:gap-8 text-whitePrimary ">
          <p className="text-[11px] md:text-xs mt-1 uppercase font-light hover:underline cursor-pointer">
            Facebook
          </p>
          <p className="text-[11px] md:text-xs mt-1 uppercase font-light hover:underline cursor-pointer">
            Threads
          </p>
          <p className="text-[11px] md:text-xs mt-1 uppercase font-light hover:underline cursor-pointer">
            Tiktok
          </p>
        </div>
        <div className="text-whitePrimary uppercase mt-16 md:mt-24 lg:mt-28">
          <p className="text-[13px] md:text-sm font-medium">Hotline</p>
          <p className="text-2xl md:text-5xl mt-2 md:mt-3 font-semibold">
            0905260448
          </p>
          <p className="text-[10px] md:text-[11px] mt-2 font-light">
            Online Từ Thứ 2 đến Chúa Nhật, Từ 9am đến 6pm
          </p>
          <div className="">
            <span className="text-[10px] md:text-[11px] font-light">
              Email:{" "}
            </span>
            <span className="text-[10px] md:text-[11px] font-light hover:underline cursor-pointer">
              SUPPORT@SAIGONCYPHER.COM
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-8 md:gap-20 lg:gap-36 mt-16 md:mt-24 lg:mt-28">
          <div className="text-whitePrimary">
            <p className="uppercase text-xs md:text-sm font-medium">Trợ giúp</p>
            <div className="mt-2 md:mt-3">
              <p className="text-[10px] mt-1 uppercase font-light hover:underline cursor-pointer">
                Tài khoản của tôi
              </p>
              <p className="text-[10px] mt-1 uppercase font-light hover:underline cursor-pointer">
                Đổi, trả hàng và hoàn tiền
              </p>
            </div>
          </div>
          <div className="text-whitePrimary uppercase">
            <p className="uppercase text-xs md:text-sm font-medium">
              Chính sách
            </p>
            <div className="mt-2 md:mt-3">
              <p className="text-[10px] mt-1 uppercase font-light hover:underline cursor-pointer">
                Chính sách bảo mật thông tin
              </p>
              <p className="text-[10px] mt-1 uppercase font-light hover:underline cursor-pointer">
                Chính sách vận chuyển, giao hàng
              </p>
            </div>
          </div>
          <div className="text-whitePrimary">
            <p className="uppercase text-xs md:text-sm font-medium">
              Hộ kinh doanh
            </p>
            <div className="mt-2 md:mt-3">
              <p className="text-[10px] mt-1 uppercase font-light hover:underline cursor-pointer">
                Giới thiệu về chúng tôi
              </p>
              <p className="text-[10px] mt-1 uppercase font-light hover:underline cursor-pointer">
                Đóng góp ý tưởng - ý kiến
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

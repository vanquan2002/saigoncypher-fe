export default function Information() {
  return (
    <div className="">
      <h4 className="uppercase">Tham gia bản tin</h4>
      <form className="w-[70vw] md:w-[40vw] lg:w-[30vw] flex flex-col gap-12 mt-3">
        <div className="relative h-11 min-[10px] w-full">
          <input
            id="email"
            placeholder=""
            className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-black focus:outline-0 disabled:border-0 disabled:bg-black placeholder:opacity-0 focus:placeholder:opacity-100"
          />
          <label className="uppercase after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[13px] leading-tight text-darkPrimary transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-200 peer-placeholder-shown:leading-[4.25] peer-focus:leading-tight peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent">
            Nhập địa chỉ email
          </label>
        </div>
      </form>
      <p className="text-[13px] font-medium text-darkPrimary text-opacity-70 mt-3 md:mt-5">
        Đăng kí bản tin để nhận nhiều ưu đãi!
      </p>
    </div>
  );
}

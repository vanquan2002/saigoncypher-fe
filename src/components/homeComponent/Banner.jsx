import { PiStarFour } from "react-icons/pi";

export default function Banner() {
  return (
    <div className="w-full min-h-0 flex justify-center mt-14 md:mt-16">
      <span className="text-[18vw] lg:text-[13rem] text-darkPrimary uppercase font-bold relative md:mt-7 py-28 md:py-36">
        Cypher
        <span className="absolute left-0 bottom-[55%]">Saigon</span>
        <span className="absolute right-0 top-[55%] flex items-center">
          <PiStarFour />
          Store
        </span>
      </span>
    </div>
  );
}

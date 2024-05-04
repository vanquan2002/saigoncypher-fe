import CartLayout from "./CartLayout";
import MenuLayout from "./MenuLayout";
import SearchLayout from "./SearchLayout";

export default function MainLayout({ result }) {
  return (
    <>
      <SearchLayout result={result === "search" ? true : false} />
      <CartLayout result={result === "cart" ? true : false} />
      <MenuLayout result={result === "menu" ? true : false} />
    </>
  );
}

import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainLayout from "../components/layoutNavRightComponents/MainLayout";
import Contents from "../components/cartComponents/Contents";

export default function CartScreen() {
  const layoutNavRight = useSelector((state) => state.layoutNavRight);
  const { result } = layoutNavRight;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="min-h-screen">
      <Header />
      <Contents cartItems={cartItems} />
      <Footer />

      <MainLayout result={result} />
    </div>
  );
}

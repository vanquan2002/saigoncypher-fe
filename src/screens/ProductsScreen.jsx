import { useSelector } from "react-redux";
import MainLayout from "../components/layoutNavRightComponents/MainLayout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Contents from "../components/productsComponents/Contents";

export default function ProductsScreen() {
  const layoutNavRight = useSelector((state) => state.layoutNavRight);
  const { result } = layoutNavRight;
  return (
    <div className="min-h-screen">
      <Header />
      <Contents />
      <Footer />

      <MainLayout result={result} />
    </div>
  );
}

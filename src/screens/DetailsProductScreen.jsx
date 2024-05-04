import { useSelector } from "react-redux";
import MainLayout from "../components/layoutNavRightComponent/MainLayout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Contents from "../components/detailsProductComponent/Contents";

export default function DetailsProductScreen() {
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

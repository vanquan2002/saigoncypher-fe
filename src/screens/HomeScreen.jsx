import Header from "./../components/Header";
import Banner from "./../components/homeComponents/Banner";
import Slides from "./../components/homeComponents/Slides";
import Contents from "./../components/homeComponents/Contents";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layoutNavRightComponents/MainLayout";
import { useEffect } from "react";
import { productLatestsActions } from "./../redux/actions/ProductActions";
import Introduce from "../components/homeComponents/Introduce";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const layoutNavRight = useSelector((state) => state.layoutNavRight);
  const { result } = layoutNavRight;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(productLatestsActions());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Header />
      <Banner />
      <Slides />
      <Introduce />
      <Contents />
      <Footer />

      <MainLayout result={result} />
    </div>
  );
}

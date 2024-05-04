import Header from "./../components/Header";
import Banner from "./../components/homeComponent/Banner";
import Slides from "./../components/homeComponent/Slides";
import Contents from "./../components/homeComponent/Contents";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layoutNavRightComponent/MainLayout";
import { useEffect } from "react";
import { productLatestsActions } from "./../redux/actions/ProductActions";

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
      <Contents />
      <Footer />

      <MainLayout result={result} />
    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import DetailsProductScreen from "./screens/DetailsProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/products/page/:pageNumber" element={<ProductsScreen />} />
        <Route path="/products/search/:keyword" element={<ProductsScreen />} />
        <Route
          path="/products/search/:keyword/page/:pageNumber"
          element={<ProductsScreen />}
        />
        <Route path="/products/:id/detail" element={<DetailsProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

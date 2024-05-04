import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import DetailsProductScreen from "./screens/DetailsProductScreen";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// npm start -- --host 0.0.0.0 --port 8000
// bg-gradient-to-r from-red-100 via-red-200 to-yellow-100
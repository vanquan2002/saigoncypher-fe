import Introduce from "./Introduce";
import ProductLatests from "./ProductLatests";

export default function Contents() {
  return (
    <div className="px-5 py-20 md:px-20 md:py-40">
      <Introduce />
      <ProductLatests />
    </div>
  );
}

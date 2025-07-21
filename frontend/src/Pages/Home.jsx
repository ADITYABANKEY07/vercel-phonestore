import BrandCarousel from "./BrandCarousel";
import BrandInformation from "./BrandInformation";
import CustomerFeedBack from "./CustomerFeedback";
import HeroSlider from "./HeroSlider";
import ProductSearch from "./ProductSearch";
import ShopByCategory from "./ShopByCategory";
import FeatureHighlights from "./FeatureHighLights";
import Faq from "./Faq";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        {/* Header */}
        <HeroSlider/>
        {/* Product Search Section*/}
        <ProductSearch/>
        {/* Brand Cards */}
        <BrandCarousel/>
        {/* Shop By Category */}
        <ShopByCategory/>
        {/* Brand Information */}
        <BrandInformation/>
        {/* CustomerFeedBack */}
        <CustomerFeedBack />
        {/* FeatureHighlights Badges */}
        <FeatureHighlights/>
        {/* Frequently Asked Questions */}
        <Faq />
      </div>
    </div>
  );
}

export default Home;

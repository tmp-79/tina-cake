import { productData } from "../../../data/productData";
import Banner from "../../components/banner/Banner";
import HeadSeo from "../../components/SEO";
import NewsLayout from "./newsLayout/NewsLayout";
import ProductLayout from "./productLayout/ProductLayout";
import FeedbackLayout from "./feedbackLayout/FeedbackLayout";
import { feedbackData } from "../../../data/feedbackData";
import { newsListData } from "../../../data/newsListData";

export default function HomePage() {
  return (
    <>
      <HeadSeo />
      <Banner></Banner>
      <ProductLayout
        link="/banh-kem-ngon"
        title="Bánh kem ngon ở Nha Trang"
        data={productData}
      ></ProductLayout>
      <ProductLayout
        link="/banh-kem-hot-trend"
        title="Bánh hottrend 2022"
        data={productData}
        background
      ></ProductLayout>
      <NewsLayout
        title="Tin tức & Sự kiện"
        link="/danh-sach-bai-viet"
        data={newsListData}
      ></NewsLayout>
      <FeedbackLayout
        title="Phản hồi từ khách hàng"
        data={feedbackData}
        link="https://www.google.com/search?q=banhkemnhatrangtina&oq=banhkemnhatrangtina&aqs=chrome..69i57j69i60l4.5409j0j7&sourceid=chrome&ie=UTF-8#lrd=0x317067bd70765427:0xcab555b4ef08718b,1,,,"
      ></FeedbackLayout>
    </>
  );
}

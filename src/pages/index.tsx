// import DownloadApps from '@components/common/download-apps';
// import Support from '@components/common/support';
// import Instagram from '@components/common/instagram';
// import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
// import ExclusiveBlock from '@containers/exclusive-block';
import BannerCard from '@components/common/banner-card';
import Container from '@components/ui/container';
import BrandGridBlock from '@containers/brand-grid-block';
import CategoryBlock from '@containers/category-block';
import Layout from '@components/layout/layout';
import BannerWithProducts from '@containers/banner-with-products';
import BannerBlock from '@containers/banner-block';
import Divider from '@components/ui/divider';
import ProductsFlashSaleBlock from '@containers/product-flash-sale-block';
import ProductsFeatured from '@containers/products-featured';
import BannerSliderBlock from '@containers/banner-slider-block';
import Subscription from '@components/common/subscription';
import { homeThreeBanner as banner } from '@framework/static/banner';
import { homeThreeMasonryBanner as masonryBanner } from '@framework/static/banner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ROUTES } from '@utils/routes';
import { GetStaticProps } from 'next';
import { urlBase64ToUint8Array } from '@utils/index';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Kiểm tra hỗ trợ Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker đăng ký thành công:', registration);
          subscribeUser(registration);
        })
        .catch(error => console.error('Lỗi đăng ký Service Worker:', error));
    }
  }, []);
  // Hàm đăng ký nhận push notification
  const subscribeUser = async (registration:any) => {
    try {
      // Thay thế bằng VAPID Public Key của bạn
      const vapidPublicKey = "BLI5Z5wKqW9Ld0KCW9UMU_ZDQn4ifafPXpl0KWsBMUL8WXlyNP0tYTbknhFrrjzuIDvATryRFSydFuHlVMafqkg"  // VAPID public key từ bước 1
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
      
      console.log('Subscription:', subscription);

      // Gửi subscription đến backend (Golang) để lưu trữ
      await fetch('http://localhost:8080/v1/notification/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
      console.log('Subscription đã được gửi đến backend.');
    } catch (error) {
      console.error('Lỗi trong quá trình đăng ký push:', error);
    }
  };
  return (
    <>
      <BannerBlock data={masonryBanner} />
      <Container>
        {/* <ProductsFlashSaleBlock date={'2025-03-01T01:02:03'} /> */}
      </Container>
      <BannerSliderBlock />
      <Container>
        <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
        {/* <ProductsFeatured sectionHeading="text-featured-products" />
        <BannerCard
          key={`banner--key${banner[0].id}`}
          banner={banner[0]}
          href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <BrandGridBlock sectionHeading="text-top-brands" />
        <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        /> */}
        {/* <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
        /> */}
        {/* <ExclusiveBlock />
        <NewArrivalsProductFeed />
        <DownloadApps />
        <Support />
        <Instagram /> */}
        <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};

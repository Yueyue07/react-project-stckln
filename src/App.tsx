import { useEffect, useState } from 'react';
import getProductDetail, { SaleInfo } from './GetProductAPI';
import ProductDetail, { ProductDescription } from './ProductDetail';
import ProductSalesTable from './ProductSalesTable';
import SalesChart from './ProductSalesChart';
import Logo from './Logo';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [productDetail, setProductDetail] = useState<ProductDescription | null>(
    null
  );
  const [sales, setSales] = useState<SaleInfo[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = (await getProductDetail())[0];
        const { id, title, image, subtitle, tags, sales } = result;
        setProductDetail({
          id,
          title,
          image,
          subtitle,
          tags,
        });
        setSales(sales);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function loadPage() {
    if (isLoading) {
      return <div className="place-holder"> Page is loading... </div>;
    }
    if (error) {
      return <div className="place-holder"> Something went wrong </div>;
    }
    return (
      <>
        <aside>
          {productDetail && <ProductDetail productDetail={productDetail} />}
        </aside>
        <main>
          {sales && <SalesChart sales={sales} />}
          {sales && <ProductSalesTable sales={sales} />}
        </main>
      </>
    );
  }

  return (
    <div className="content">
      <header>
        <Logo />
      </header>
      <div className="container">{loadPage()}</div>
    </div>
  );
}

export default App;

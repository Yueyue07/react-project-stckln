import './ProductDetail.css';

export default function ProductDetail({ productDetail }: ProductDetailProps) {
  if (!productDetail) {
    throw new Error('productDetail should exist');
  }
  const tabs = productDetail.tags.map((tab) => {
    return (
      <div className="product-tab" key={tab}>
        {tab}
      </div>
    );
  });
  return (
    <div className="product-detail">
      <div className="product-name">
        <img
          src={productDetail.image}
          alt="Description of the image"
          width="200"
          height="200"
        />
        <h2> {productDetail.title} </h2>
        <p> {productDetail.subtitle} </p>
      </div>
      <hr />
      <div className="tab-section">{tabs}</div>
      <hr />
    </div>
  );
}

export interface ProductDescription {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  tags: string[];
}

interface ProductDetailProps {
  productDetail: ProductDescription | null;
}

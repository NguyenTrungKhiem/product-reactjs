import React from "react";
import IProduct from "../../interface/Products";
import ProductImage from "./ProductImage";

interface IProductDetail {
  products: IProduct[];
}

const ProductDetail: React.FC<IProductDetail> = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {products?.map((product, index) => (
        <div className="max-h-[350px] flex flex-col mb-2.5" key={index}>
          <ProductImage images={product.images} />
          <div className="py-3">
            <p className="text-[24px]">{product.title}</p>
            <p className="text-[16px] text-red-500">Price: {product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import IProduct from "../../interface/Products";
import ProductDetail from "./ProductDetail";

const Products: React.FC = () => {
  const [dataProducts, setDataProducts] = useState<IProduct[]>([]);
  // const [nextUrl, setNextUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const getProducts =  useCallback(async (page:number) =>  {
    setLoading(true)
    const res = await axios.get(
      `https://dummyjson.com/products?limit=20&skip=${
        (page-1) * 20
      }&select=title,price,images`
    );
    const data = res.data;
    setDataProducts((prevProducts: any) => [...prevProducts, ...data.products]);
    setLoading(false);
    if (data.skip + data.limit >= data.total) {
      setHasMore(false);
    } 
    setPage(page);
  },[]);

  useEffect(() => {
    getProducts(1);
  }, [getProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
      ) {
        getProducts(page+1)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, getProducts, page]);

  return (
    <>
   
        <div className="w-full my-10">
          <ProductDetail products={dataProducts} />
        </div>
       
        {loading && <p>Loading...</p>}
    </>
  );
};
export default Products;
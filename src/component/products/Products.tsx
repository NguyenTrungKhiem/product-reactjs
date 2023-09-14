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

  const getProducts = async (page: number) =>  {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=20&skip=${
        (page - 1) * 20
      }&select=title,price,images`
    );
    const data = res.data;
    setDataProducts((prevProducts: any) => [...prevProducts, ...data.products]);
    console.log(page);
    setLoading(false);
    if (data.skip + data.limit >= data.total) {
      setHasMore(false);
    } else {
      setPage(page+1);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProducts(page);
    
  }, []);

  const handleScroll = () => {
    if (typeof document === "undefined") {
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      // getProducts(page+1);
      // setPage(page+1)
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      console.log(page);

    }
  };
  useEffect(() => {
    if (loading) {
      // Gọi hàm getProducts(page + 1) ở đây
      getProducts(page + 1).then(() => {
        setLoading(false);
      });
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
        <div className="w-full my-10">
          <ProductDetail products={dataProducts} />
        </div>
        {loading && <p>Loading...</p>}
    </>
  );
};
export default React.memo(Products);

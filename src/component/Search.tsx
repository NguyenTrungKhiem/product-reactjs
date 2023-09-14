import React, { useCallback, useEffect, useState } from "react";
import IProduct from "../interface/Products";
import axios from "axios";

export interface ISearchProps {}

const Search: React.FC = () => {
  const [dataProducts, setDataProducts] = useState<IProduct[]>([]);
  const [filterData, setFilterData] = useState<IProduct[]>([]);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`https://dummyjson.com/products/search?q=`);
      const data = res.data;
      setFilterData(data.products);
    };
    getProducts();
  }, []);

  const handleFilter = (value: string) => {
    const lowercaseValue = value.toLowerCase();
    const res = filterData.filter((f) => f.title.toLowerCase().includes(lowercaseValue));
    setDataProducts(res);
    setShowResult(value!== '')
  };

  return (
    <div className="flex justify-center items-center flex-col gap-2.5">
      <div className="block">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="p-3 border border-[#ccc] rounded-xl outline-none"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      {showResult && ( // Sử dụng showResult để kiểm tra
        <div className="block border border-[#ccc] p-2.5 result">
          {dataProducts?.map((result, index) => (
            <div key={index} className="text-[16px]">
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

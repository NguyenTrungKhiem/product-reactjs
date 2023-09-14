import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IImageProduct {
  images: string[];
}

const ProductImage: React.FC<IImageProduct> = ({ images }) => {
  return (
    
      <Swiper
        modules={[Autoplay, Pagination]}
        style={{
          width: "100%",
        }}
        slidesPerView={1}
        speed={1000}
        spaceBetween={0}
        // autoplay={{
        //   delay: 4000,
        // }}
        scrollbar={{
          draggable: true,
        }}
        loop={true}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
              <img
                src={image}
                alt="product"
                className=" h-full object-cover"
              />
          </SwiperSlide>
        ))}
      </Swiper>
    
  );
};

export default ProductImage;

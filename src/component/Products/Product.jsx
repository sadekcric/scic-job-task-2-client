import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

const Product = ({ product }) => {
  const { Ratings, Price, ProductImage, ProductName } = product;
  return (
    <div className="rounded-lg shadow-md shadow-gray-500 p-5 space-y-5">
      <div className="">
        <img src={ProductImage} alt="" className="rounded-lg h-[100px] lg:h-[170px] w-full" />
      </div>
      <div>
        <h2 className="font-semibold text-lg">{ProductName}</h2>
        <div className="flex justify-between items-center">
          <p className="text-red-500 font-semibold">${Price}</p>
          <div className="flex gap-1 items-center">
            <TiStarFullOutline className="text-yellow-600 text-lg" />
            <span>{Ratings} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

import Rating from "react-rating";
import { useLoaderData } from "react-router-dom";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import {} from "react-icons/fa6";

const Details = () => {
  const { Ratings, ProductName, ProductImage, Price, Description, CreationDate, Category } = useLoaderData();

  return (
    <div className="min-h-[calc(100vh-116px)] lg:w-4/5 mx-auto p-3">
      <div className="p-4 lg:max-w-7xl max-w-xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="min-h-[500px] lg:col-span-3 bg-gradient-to-tr  from-[#F8C794] via-[#FFE0B5] to-[#FFF2D7] rounded-lg w-full lg:sticky top-0 text-center p-6">
            <img src={ProductImage} alt="Product" className="w-3/5 rounded object-cover mx-auto py-6" />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800">{ProductName}</h2>
            <p className="text-gray-700">Creation Date: {new Date(CreationDate).toLocaleDateString()}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">${Price}</p>
              <p className="text-gray-400 text-xl">
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold"> {Category} Category</p>
            </div>

            <div className="flex gap-2 mt-4">
              <Rating
                placeholderRating={Ratings}
                emptySymbol={<FaRegStar className="text-[#FB923C] text-lg" />}
                placeholderSymbol={<FaStar className="text-[#FB923C]  text-lg" />}
                fullSymbol={<FaRegStarHalfStroke className="text-[#FB923C]  text-lg" />}
                readonly
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">About the Product</h3>
              <p>{Description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

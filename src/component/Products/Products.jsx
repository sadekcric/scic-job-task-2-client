import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const Products = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // Sorting
  const [sortByDate, setSortByDate] = useState("asc");
  const [sortByPrice, setSortByPrice] = useState("asc");

  // Pagination
  const [productLength, setProductLength] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const perPageData = 15;
  const totalPage = Math.ceil(productLength / perPageData);

  const paginationArray = [...Array(totalPage).keys()];

  const handlePrevBtn = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextBtn = () => {
    if (pageNumber < paginationArray.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    fetch(
      `https://server-site-steel-iota.vercel.app/products?pages=${pageNumber}&size=${perPageData}&sortPrice=${sortByPrice}&sortDate=${sortByDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.allProduct);
        setProductLength(data.allProductLength);
      });
  }, [pageNumber, sortByPrice, sortByDate]);

  // Pagination End

  // Searching
  const [query, setQuery] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(`https://server-site-steel-iota.vercel.app/search?query=${query}`);

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  // Category + price Range
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([1, 10000000]);

  const handlePriceRange = (e) => {
    const value = e.target.value;

    if (value) {
      const [min, max] = value.slice(1, -1).split(",").map(Number);

      setPriceRange([min, max]);
    }
  };

  useEffect(() => {
    fetch(`https://server-site-steel-iota.vercel.app/search-category?category=${category}&min=${priceRange[0]}&max=${priceRange[1]}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [category, priceRange]);

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <div className="lg:w-4/5 mx-auto my-5 lg:my-10 overflow-auto">
        <div className="flex items-center justify-between gap-5">
          {/* Categorization */}
          <div className="flex gap-5 items-center">
            <div className="rounded-full bg-gray-50  shadow-sm  shadow-gray-400 inline-block py-3 px-6 ">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className=" focus:outline-none bg-gray-50 ">
                <option value="" disabled>
                  Category
                </option>
                <option value="">All Products</option>
                <option value="Wearables">Wearables</option>
                <option value="Accessories">Accessories</option>
                <option value="Footwear">Footwear</option>
                <option value="Furniture">Furniture</option>
                <option value="Fitness">Fitness</option>
                <option value="Home Security">Home Security</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Electronics">Electronics</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
            </div>

            <div className="rounded-full bg-gray-50  shadow-sm  shadow-gray-400 inline-block py-3 px-6 ">
              <select onChange={handlePriceRange} className=" focus:outline-none bg-gray-50 ">
                <option value="" disabled>
                  Filter by Price
                </option>
                <option value="">All Product</option>
                <option value="[1,50]">1 to 50</option>
                <option value="[51,100]">51 to 100</option>
                <option value="[101,200]">101 to 200</option>
                <option value="[201, 10000000]">201 to all</option>
              </select>
            </div>
          </div>

          {/* Searching */}

          <div>
            <div className="rounded-full bg-gray-50  shadow-sm shadow-gray-400 inline-block py-3 px-6 ">
              <div className="flex items-center justify-between ">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search Hear"
                  className="bg-gray-50 focus:outline-none"
                />
                <button onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>

          {/* Sorting */}
          <div className="flex gap-5 items-center">
            {/* Sort By Date */}
            <div className="rounded-full bg-gray-50  shadow-sm shadow-gray-400 inline-block py-3 px-6 mr-5">
              <select className="bg-gray-50 focus:outline-none" value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
                <option value="" disabled>
                  Sort By Date
                </option>
                <option value="asc">Recent to Past</option>
                <option value="dsc">Past to Recent</option>
              </select>
            </div>

            {/* Sort By Date */}
            <div className="rounded-full bg-gray-50  shadow-sm shadow-gray-400 inline-block py-3 px-6 ">
              <select className="bg-gray-50 focus:outline-none" value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
                <option value="" disabled>
                  Sort By Date
                </option>
                <option value="asc">Cheap to Heigh</option>
                <option value="dsc">Heigh to Cheap</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Products */}
      <div className="lg:w-4/5 mx-auto mt-10 p-3 lg:mt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination */}
      </div>

      {/* Pagination  */}
      <div className="flex items-center justify-center gap-5 my-5 overflow-x-auto">
        <button onClick={handlePrevBtn} className="shadow-sm shadow-gray-500 rounded-sm bg-gray-50 px-4 py-1">
          Prev
        </button>

        {paginationArray.map((page, index) => (
          <button
            onClick={() => setPageNumber(page)}
            key={index}
            className={
              pageNumber === page
                ? "shadow-sm shadow-gray-500 text-white rounded-sm bg-yellow-500 px-4 py-1"
                : "shadow-sm shadow-gray-500 rounded-sm bg-gray-50 px-4 py-1"
            }
          >
            {page}
          </button>
        ))}

        <button onClick={handleNextBtn} className="shadow-sm shadow-gray-500 rounded-sm bg-gray-50 px-4 py-1">
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

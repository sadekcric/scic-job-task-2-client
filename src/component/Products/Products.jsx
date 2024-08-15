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
  const perPageData = 8;
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
    fetch(`http://localhost:5000/products?pages=${pageNumber}&size=${perPageData}&sortPrice=${sortByPrice}&sortDate=${sortByDate}`)
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
      const res = await fetch(`http://localhost:5000/search?query=${query}`);

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

  // Category
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/search-category?category=${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [category]);

  return (
    <>
      <div className="lg:w-4/5 mx-auto mt-5 lg:mt-10 overflow-auto">
        <div className="flex items-center justify-between ">
          {/* Categorization */}
          <div className="rounded-full bg-gray-50  shadow-sm shadow-gray-400 inline-block py-3 px-6 ">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className=" focus:outline-none bg-gray-50 ">
              <option value="" disabled>
                Category
              </option>
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
          <div>
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
    </>
  );
};

export default Products;

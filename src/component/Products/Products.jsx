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
    fetch(`http://localhost:5000/products?pages=${pageNumber}&size=${perPageData}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.allProduct);
        setProductLength(data.allProductLength);
      });
  }, [pageNumber]);

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

  return (
    <>
      {/* Searching */}

      <div className="text-center mt-5 lg:mt-10 ">
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

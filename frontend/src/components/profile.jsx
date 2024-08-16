import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import Cookies from "js-cookie";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.post("http://localhost:3000/products");
        setData(res.data);
        console.log("Fetched data:", res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchApi(); // Fetch data on component mount
  }, []);

  const convertToBase64 = (arrayBuffer) => {
    try {
      let binary = "";
      const bytes = new Uint8Array(arrayBuffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const handleClick = async (productid) => {
    try {
      const token = Cookies.get("token"); // Retrieve the token from cookies
      const response = await axios.post(
        "http://localhost:3000/cartdetails",
        { productid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 flex flex-wrap justify-center px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
            {data &&
              data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-md shadow-md overflow-hidden w-full"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={`data:image/jpeg;base64,${convertToBase64(
                      item.prod_image.data
                    )}`}
                    alt={item.title}
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-2">
                        {item.description.substring(0, 30) + "..."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xl font-bold text-gray-800">
                        Rs.{item.price}
                      </p>
                      <button
                        className="block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                        onClick={() => handleClick(item._id)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Profile;

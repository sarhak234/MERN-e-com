import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};

  const convertToBase64 = (arrayBuffer) => {
    try {
      let binary = '';
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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        {product ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
              {product.prod_image && product.prod_image.data ? (
                <img
                  src={`data:image/jpeg;base64,${convertToBase64(product.prod_image.data)}`}
                  alt={product.title}
                  className="w-full md:w-1/2 object-contain h-64 md:h-auto"
                />
              ) : (
                <div className="w-full md:w-1/2 bg-gray-200 h-64 flex items-center justify-center">
                  <p>No image available</p>
                </div>
              )}
              <div className="p-4 md:p-6 w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-semibold text-gray-900">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl font-semibold mt-4">Product not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetails;

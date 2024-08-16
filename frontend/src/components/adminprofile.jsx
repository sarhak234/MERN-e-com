// import React, { useState } from 'react';
// import Header from './header';
// import Footer from './footer';
// import axios from 'axios';

// function AdminProfile() {
//   const [productName, setProductName] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('productName', productName);
//     formData.append('description', description);
//     formData.append('image', image);

//     try {
//       const response = await axios.post('http://localhost:3000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Product uploaded successfully!');
//       setProductName('');
//       setDescription('');
//       setImage(null);
//     } catch (error) {
//       setError('Error uploading product. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="h-screen flex flex-col items-center bg-slate-300">
//         <div className="text-center mb-5">
//           <h1 className="text-6xl font-extrabold text-blue-700 drop-shadow-lg">
//             Admin Profile
//           </h1>
//         </div>
//         <form 
//           className="bg-black p-6 rounded-sm text-white flex flex-col items-center"
//           onSubmit={handleSubmit}
//         >
//           <h3 className="text-2xl mb-6">Upload Product</h3>
//           <input
//             type="text"
//             placeholder="Product Name"
//             className="bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-[90%]"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             className="bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-[90%]"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <input
//             type="file"
//             className="mb-4"
//             onChange={handleImageChange}
//             required
//           />
          
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {message && <p className="text-green-500 text-center">{message}</p>}
//           <button type="submit" className="bg-white text-black w-[90%] p-2 rounded-md">
//             Submit
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AdminProfile;

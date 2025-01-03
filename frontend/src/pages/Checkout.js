import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NizxzSCV4TK3HtnKRXpFI5ZcmZ712SextOFj9cYoSfFnNT4RbN6BTHqytxvGc1ybSPEOwpl2dWBTjbz62rWsXjC00yrVkp4gj"
);

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(1000); // Example amount in cents
  const [items, setItems] = useState([
    {
      name: "AirPods",
      description:
        "AirPods Pro (2nd generation) with MagSafe Charging Case (USB-C)",
      images:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1694014871985",
      quantity: 1,
      amount: 24900,
    },
    {
      name: "OLEVS Gold Watch",
      description:
        "Gold Watch for Men,Stainless Steel Quartz Watches Waterproof Crystal Diamond Watches Calendar Wrist Watch",
      images:
        "https://m.media-amazon.com/images/I/71VxRe7HeKL._AC_UY1000_.jpg",
      quantity: 1,
      amount: 8000,
    },
  ]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Request to create a checkout session from the backend
      const { data } = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          amount,
          email,
          username,items
        }
      );
      const stripe = await stripePromise;

      // Redirect the user to Stripe Checkout
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

export default Checkout;

////=----

// HASSAN CODE FRONTEND WE WILL SEND THE CART ARRAY TO THE BACKEND LIKE THIS ------------------

// "use client";

// import React from "react";
// import { useSelector } from "react-redux";

// import { useRouter } from "next/navigation";
// import Button from "./Button";
// import { itemType } from "../../../redux/reducers/cartSlice";
// import getStripe from "../../../utils/getStripe";
// import Stripe from "stripe";
// import { fetchPostJSON } from "../../../utils/api-helpers";

// const CheckoutComp = () => {
//   const { items } = useSelector((state: any) => state.cart);
//   const router = useRouter();

//   let USDollar = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   });

//   let totalAmount = 0;
//   items.forEach((item: itemType) => {
//     totalAmount += item.totalPrice;
//   });

//   const handleSubmit = async () => {
//     // Handle form submission here
//     // ... (rest of your existing code)

//     // Create a new applicant in Sanity
//     try {
//       const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
//         "/api/checkoutSession",
//         {
//           items,
//           // address : address,
//         }
//       );

//       // Internal Server Error
//       if ((checkoutSession as any).statusCode === 500) {
//         console.error((checkoutSession as any).message);
//         return;
//       }

//       // Redirect to checkout
//       const stripe = await getStripe();
//       const { error } = await stripe!.redirectToCheckout({
//         // Make the id field from the Checkout Session creation API response
//         // available to this file, so you can provide it as parameter here
//         // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//         sessionId: checkoutSession?.id, //This is is used as the query parameter to the success page.
//       });

//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer
//       // using `error.message`.
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer
//       // using `error.message`.
//       console.warn(error.message);
//     } catch {
//       console.log("ERROR OCCURED");
//     }
//   };
//   return (
//     <div className="min-h-screen overflow-hidden">
//       <main className="mx-auto max-w-5xl pb-24">
//         <div className="px-4">
//           <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
//             {items.length > 0 ? "Review your bag." : "Your bag is empty."}
//           </h1>
//           <p className="my-4">Free delivery and free returns.</p>

//           {items.length === 0 && (
//             <Button
//               onClick={() => router.push("/")}
//               title="Continue Shopping"
//             ></Button>
//           )}
//         </div>

//         {items.length > 0 && (
//           <div className="mx-5 md:mx-8">
//             <div className="my-12 mt-6 ml-auto ">
//               <div className="divide-y divide-black">
//                 <div className="pb-4">
//                   <div className="flex justify-between">
//                     <p>Subtotal</p>
//                     <p>{USDollar.format(totalAmount)}</p>
//                   </div>
//                   <div className="flex justify-between">
//                     <p>Shipping</p>
//                     <p>FREE</p>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="flex flex-col gap-x-1 lg:flex-row">
//                       Estimated tax for:{" "}
//                       <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
//                         Enter zip code
//                         {/* <ChevronDownIcon className="h-6 w-6" /> */}
//                       </p>
//                     </div>
//                     <p>$ -</p>
//                   </div>
//                 </div>

//                 <div className="flex justify-between pt-4 text-xl font-semibold">
//                   <h4>Total</h4>
//                   <h4>{USDollar.format(totalAmount)}</h4>
//                 </div>
//               </div>

//               <div className="my-14 space-y-4">
//                 <h4 className="text-xl font-semibold">
//                   How would you like to check out?
//                 </h4>
//                 <div className="flex flex-col gap-4 md:flex-row">
//                   <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl text-black bg-white p-8 py-12 border-4 md:order-2">
//                     <h4 className="mb-4 flex flex-col text-xl font-semibold">
//                       Pay in full
//                       <span>{USDollar.format(totalAmount)}</span>
//                     </h4>

//                     {items?.map((item: itemType) => (
//                         <div className="w-full flex relative" key={items?.uid}>
//                           <img src={item?.image} className="w-48" alt="" />
//                           <div className="w-[70%] flex flex-col items-start">
//                             <div className="font-semibold text-lg flex justify-around w-full">
//                               <span className="flex-[8]">{item?.title}</span>
//                               <span className="flex-1">${item?.price}</span>
//                             </div>
//                             <div
//                               dangerouslySetInnerHTML={{
//                                 __html: `${item?.description?.replace("\\n", "")?.slice(0, 250)}...`,
//                               }}
//                             />
//                             <span className="bg-gray-400 px-5 py-2 rounded-full lg:absolute lg:bottom-5 lg:right-20">
//                               {item?.quantity}
//                             </span>
//                           </div>
//                         </div>
//                       ))}

//                     <Button
//                       noIcon
//                       loading={false}
//                       title="Check Out"
//                       width="w-full"
//                       onClick={handleSubmit}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CheckoutComp;
// PRODUCTS ARRAY WILL BE SEND WITH THE BODY PRODUCTS ARRAY SAMPLE NEXT IS GIVEN BELOW
const express = require('express');
const stripe = require('stripe')("sk_test_51NizxzSCV4TK3HtnWjiVLbzkmHGZCIwLos19AC8IXIKoM0xtOXuNWyhXzMg04NeljR26ou8ytRKGYwIxJNXJXbGD00sbTi8ks2");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
    const { amount, email, username , items} = req.body;
// 
    if (!amount || isNaN(amount) || amount <= 0 || !email || !username) {
        return res.status(400).send({ error: 'Invalid data' });
    }


    // Map products to line_items
    const lineItems = items?.map((product, index) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product?.name,
                // name: `Test product ${index}`,
                description: product?.description || '',
                // description: `A sample product for testing ${index}` || '',
                images: [product?.images] || [],
             
                // images:['https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg']|| [],
            },
            // unit_amount: product.amount, // amount in cents
            // unit_amount: 1000, // amount in cents
            unit_amount: product?.amount, // amount in cents
        },
        quantity: product?.quantity || 1,
        // quantity: index+1 || 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            
            // line_items: lineItems,    // THIS IS ALSO VALID IF WE ARE NOT APPENDING DISCOUNT ITEMS HERE 
            line_items: 
 
            [
                // {
                    
                //     price_data: {
                //         currency: 'usd',
                //         product_data: {
                //             name: 'Sample Product',
                        
                //             description: 'A sample product for testing',
                //             images:['https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg']
                //         },
                //         unit_amount: amount, // amount in cents
                //     },
                    
                //     quantity: 1,
                // },
                ...lineItems,
                // FOR MULTIPLE PRODUCTS 
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Processing Fee',
                            images: [], // No image for processing fee
                        },
                        unit_amount: 300, // amount in cents (3$)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: email,  
            
            // Pass the customer's email
            metadata: { username:username, images:"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"  },  // Pass additional data (username) in metadata
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`, 
            cancel_url: `http://localhost:3000/cancel`,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error); 
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//---------------------

// hassan code  

// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { itemType } from "../../../redux/reducers/cartSlice";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   // https://github.com/stripe/stripe-node#configuration
//   apiVersion: "2023-10-16",
// });
// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   email: string;
//   codingExperience: string;
//   careerPath: string;
//   goals: string;
//   interviewTime: string[];
// }

// export async function POST(
//     request: Request
// ) {
//     const body = await request.json();
//     const items: itemType[] = body?.items;
//     const transformedItems = items?.map((item) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: item?.title,
    //       // images: [urlFor(item.image[0]).url()],
    //       images : [item?.printUrl],
    //     },
    //     unit_amount: Math.round(item?.price * 100),
    //   },
//       quantity: item.quantity,
//     }));

//     // Calculate the total amount for the checkout session (you can change this according to your logic)
//     const totalAmount = 4000; // $25.00 in cents

//     try {
//      const params: Stripe.Checkout.SessionCreateParams = {
//         payment_method_types: ["card"],
//         // shipping_address_collection: {
//         //   allowed_countries: ["US", "CA", "GB"],
//         // },
//         line_items: transformedItems,
//         shipping_address_collection: {
//           allowed_countries: ['US', 'CA', 'GB']
//         },
//         payment_intent_data: {},
//         mode: "payment",
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}succss?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}checkout`,


//         metadata: { //  THIS DATA WILL BE USED IN SUCCESS PAGE    
//           images: JSON.stringify(items.map((item) => item.printUrl)),
//           quantities: JSON.stringify(items.map((item) => item.quantity)),
//           // address: body.address,
//           productUID: JSON.stringify(items.map((item) => item.uid)),
//         },
//       };
//       const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

//       return NextResponse.json(checkoutSession);
//     } catch (err) {
//       console.log(err)
//       const errorMessage = err instanceof Error ? err.message : "Internal server error";
//       return NextResponse.json({ statusCode: 500, message: errorMessage });
//     }
//   } 
//
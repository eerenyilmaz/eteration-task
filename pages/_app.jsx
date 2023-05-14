import '../app/globals.css'
import 'tailwindcss/tailwind.css'
import Header from '../app/components/Header'
import store from "../app/redux/store"
import { Provider, useDispatch } from "react-redux";

import { useEffect } from 'react';
import { useState } from 'react';
import { setCartStorage } from '../app/redux/reducer/productsReducer';
import Cart from '../app/components/Cart';

function MyApp({ Component, pageProps }) {
    
   return (
       <Provider store={store}>
           <Header />
           <main className="flex w-full h-auto flex-col md:flex-row px-4 md:px-0 mb-[60px]">
               <div className="flex w-full justify-center flex-row md:w-4/5">
                   <Component {...pageProps} />
               </div>
               <div className="w-full md:w-1/5 py-4 top-16 md:fixed md:top-16 md:right-0">
                   <Cart />
               </div>
           </main>
       </Provider>
   )
 }

 export default MyApp
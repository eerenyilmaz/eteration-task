import { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import CartProducts from "./CartProducts";
import { setTotalPrice } from "../redux/reducer/productsReducer";


export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const cartFromRedux = useSelector((state) => state.storageCart.storageCart)
    const dispatch = useDispatch();
    useEffect(() => {
        let dataFromStorage = localStorage.getItem("carts")
        // dataFromStorage = JSON.parse(dataFromStorage);
        setCartItems(dataFromStorage)
    }, [])

    const totalPrice = cartFromRedux.reduce((accumulator, object) => {
        return accumulator + (parseInt(object.price) * parseInt(object.quantity));
    }, 0);
    dispatch(setTotalPrice(totalPrice))
    
    return (
        <div className="w-full">

            <div className="h-auto w-full md:w-5/6 lg:w-4/5 xl:w-4/5 flex flex-col px-4 shadow-2xl mb-8">
                {
                    cartFromRedux.map((cartItems, index) => (
                        <CartProducts data={cartItems} key={index} />
                        
                    ))
                }
            </div>

            <div className="h-24 w-full md:w-5/6 lg:w-4/5 xl:w-4/5 flex flex-col justify-center items-center px-4 shadow-2xl">
                <div className="flex lg:flex-row md:flex-col mb-2 items-start w-full">
                    <span className="me-2 text-sm">Total Price : </span>
                    <span className="text-sm self-start text-blue-800 font-semibold">{totalPrice}₺</span>
                </div>

                <button className="bg-blue-700 w-full py-2 text-white text-sm self-center hover:bg-blue-400 self-end rounded">
                    Checkout
                </button>
            </div>
        </div>
    )
}
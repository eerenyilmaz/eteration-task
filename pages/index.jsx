import ProductList from "../app/views/ProductList";
import Filter from "../app/components/Filter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCartStorage } from "../app/redux/reducer/productsReducer";

export default function Home() {

    const [cart, setCart] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        var empty = []
        let data = localStorage.getItem("carts");
        if (!data) {
            localStorage.setItem("carts", JSON.stringify(empty));
        } else {
            
            localStorage.setItem("carts", data);
            data = JSON.parse(data)
            dispatch(setCartStorage(data))
        }
    }, [])

    return (
        <div className="w-full flex flex-col md:flex-row py-4">
            <div className="md:w-1/4 w-full flex justify-center">
                <Filter />
            </div>

            <div className="md:w-3/4 w-full h-auto py-4 md:py-0">
                <ProductList />
            </div>

        </div>
    )
}
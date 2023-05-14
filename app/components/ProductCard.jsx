import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { useEffect } from "react";
import { setCartStorage } from "../redux/reducer/productsReducer";

export default function ProductCard({products, index}) {
    const [cartButtonStatus, setCartButtonStatus] = useState(true);
    const dispatch = useDispatch();
    const deneme = useSelector((state) => state.storageCart.storageCart)

    useEffect(() => {
        let data = localStorage.getItem("carts")

        if (data) {
            data = JSON.parse(data);
            if (data.some(added =>added.id === products.id)) {
                setCartButtonStatus(false)
            } else {
                setCartButtonStatus(true)
            }
        }
    },[])
    
    const addCart = () => {
        setCartButtonStatus(!cartButtonStatus)
        
        let data = localStorage.getItem("carts");
        
        if (data) {
            data = JSON.parse(data);
            
            if (data.some(added =>added.id === products.id)) {
                
                const pos = data.map(e => e.id).indexOf(products.id);
                if (pos > -1) {
                    data.splice(pos,1)
                    data = JSON.stringify(data);
                    
                }
            } else {
                data.push({id: products.id, name: products.name, quantity: 1, price: products.price})
                data = JSON.stringify(data);
                
            }

        } else {
            data = JSON.stringify([{id: products.id, name: products.name, quantity: 1,price: products.price}]);
        }
        localStorage.setItem("carts", data);
        dispatch(setCartStorage(JSON.parse(data)))
        
    }


    
    return (
        <div className="flex flex-col border-2 border-black-200 h-96 p-2 shadow-2xl">
        
            <Link href={{ pathname: `/detail/${products.id}`, query: { id: products.id } }} className="h-full">
                <div className="h-auto">
                    <img src={products.image}/>
                </div>

                <div className="flex flex-col h-1/3">
                    <div className="h-full flex flex-col py-4">
                        <span className="text-xl self-start text-blue-800 font-semibold mb-5">{ products.price } ₺</span>
                        <span className="text-md text-black">{products.name} - { products.model }</span>
                    </div>
                </div>
            </Link>

            {cartButtonStatus 
                ? <button onClick={addCart} className="bg-blue-700 w-full py-2 text-white text-sm self-center hover:opacity-50 transition duration-300 self-end rounded">Add to Cart</button>
                : <button onClick={addCart} className="bg-green-700 w-full py-2 text-white text-sm self-center hover:opacity-50 transition duration-300 self-end rounded">Added</button>
            }
        </div>
    )
}
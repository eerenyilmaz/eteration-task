import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import axios from 'axios'
import { setProducts } from "../redux/reducer/productsReducer"
import { useState } from "react";
import { setCartStorage } from "../redux/reducer/productsReducer";

export default function ProductDetail() {
    
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)
    const router = useRouter()
    const [product, setProduct] = useState();
    const [cartButtonStatus, setCartButtonStatus] = useState();
    const cartRedux = useSelector(state => state.storageCart.storageCart)

    let name = product?.find(x => x.id === router.query.id).name;
    let price = product?.find(x => x.id === router.query.id).price;
    let description = product?.find(x => x.id === router.query.id).description;
    let image = product?.find(x => x.id === router.query.id).image;
    let id = product?.find(x => x.id === router.query.id).id
    let quantity = product?.find(x => x.id === router.query.id).quantity

    useEffect(() => {
        
        if (products.length == 0) {
            
            axios({
                method: 'get',
                url: 'https://5fc9346b2af77700165ae514.mockapi.io/products',
                responseType: 'json'
            })
                .then(function (response) {
                    dispatch(setProducts(response.data))
                })
            
        } else {
            setProduct(products)
        }
                
    }, [products]);

    useEffect(() => {
        let data = localStorage.getItem("carts")
        var empty = [];
        if (data) {
            data = JSON.parse(data);
            let idFromUrl = parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
            
            if (data.some(added => added.id == idFromUrl)) {
                setCartButtonStatus(false)
                
            } else {
                setCartButtonStatus(true)
            }
            dispatch(setCartStorage(data))
        } else {
            localStorage.setItem("carts", JSON.stringify(empty));
            data = JSON.parse(data)
            setCartButtonStatus(false)
            dispatch(setCartStorage(empty))
        }
    },[cartButtonStatus])

    

    const addCart = () => {
        setCartButtonStatus(!cartButtonStatus)
        
        let data = localStorage.getItem("carts");
        
        if (data) {
            data = JSON.parse(data);
            
            if (data.some(added =>added.id === id)) {
                
                const pos = data.map(e => e.id).indexOf(id);
                if (pos > -1) {
                    data.splice(pos,1)
                    data = JSON.stringify(data);
                    
                }
            } else {
                data.push({id: id, name: name, quantity: 1, price: price})
                data = JSON.stringify(data);
                
            }

        } else {
            data = JSON.stringify([{id: product.id, name: product.name, quantity: quantity,price: product.price}]);
        }
        localStorage.setItem("carts", data);
        dispatch(setCartStorage(JSON.parse(data)))
        
    }

    return (
        <div className="flex h-full w-full md:items-center md:justify-center shadow-2xl">

            <div className="w-full h-auto flex flex-col md:flex-row p-2">
                <div className="w-full md:w-1/2 h-1/2 md:h-auto flex items-center justify-center">
                    <img src={image} />
                </div>

                <div className="w-full md:w-1/2 px-4 flex flex-col">
                    <div className="flex flex-col mb-4">
                        <span className="py-2 text-xl text-black">{name}</span>
                        <span className="py-2 text-xl self-start text-blue-800 font-semibold">{price} ₺</span>
                        {cartButtonStatus 
                            ? <button onClick={addCart} className="bg-blue-700 w-full py-2 text-white text-sm self-center hover:opacity-50 transition duration-300 self-end rounded">Add to Cart</button>
                            : <button onClick={addCart} className="bg-green-700 w-full py-2 text-white text-sm self-center hover:opacity-50 transition duration-300 self-end rounded">Added</button>
                        }
                    </div>

                    <div className="h-auto md:h-1/2 overflow-y-scroll mt-4">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useSelector, useDispatch } from "react-redux"
import { setCartStorage } from "../redux/reducer/productsReducer"

export default function CartProducts({ data }) {
    const cartStorage = localStorage.getItem("carts")
    const dispatch = useDispatch()

    const decreaseQuantity = () => {
        let dataFromStorage = JSON.parse(cartStorage)
        let foundIndex = dataFromStorage.findIndex(x => x.id == data.id)
        
        
        if (dataFromStorage[foundIndex].quantity > 1) {
            dataFromStorage[foundIndex].quantity -= 1
            dispatch(setCartStorage(dataFromStorage))

            dataFromStorage = JSON.stringify(dataFromStorage)
            localStorage.setItem("carts", dataFromStorage);
        }
        
        
    }

    const increaseQuantity = () => {
        let dataFromStorage = JSON.parse(cartStorage)
        let foundIndex = dataFromStorage.findIndex(x => x.id == data.id)
        
        dataFromStorage[foundIndex].quantity += 1
        dispatch(setCartStorage(dataFromStorage))

        dataFromStorage = JSON.stringify(dataFromStorage)
        localStorage.setItem("carts", dataFromStorage);
        
    }

    return (
        <div className="w-full flex flex-row">
            <div className="flex flex-col justify-center w-2/3">
                <span className="md:text-sm">{data.name}</span>
                <span className="text-sm text-blue-800">{data.price}₺</span>
            </div>

            <div className="flex flex-row justify-center items-center w-1/3">
                <button onClick={decreaseQuantity} className="w-[30px] h-[30px] bg-gray-200 rounded">-</button>
                <div className="w-[30px] h-[30px] bg-blue-800 text-white text-sm flex items-center justify-center">{data.quantity}</div>
                <button onClick={increaseQuantity} className="w-[30px] h-[30px] bg-gray-200 rounded">+</button>
            </div>
        </div>
    )
}
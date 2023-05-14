import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFilterProducts, setProducts} from '../redux/reducer/productsReducer';

export default function Header() {

    const products = useSelector(state => state.products.products);
    const totalPrice = useSelector(state => state.totalPriceRedux.totalPrice);
    const filterProducts = useSelector(state => state.filterProducts.filterProducts);
    const dispatch = useDispatch();
    const searchProducts = (e) => {
        if (e.key === 'Enter') {
            let searchedProduct = searchByValue(products, e.target.value)
            let searchedFilterProduct = searchByValue(filterProducts, e.target.value)
            dispatch(setProducts(searchedProduct))
            dispatch(setFilterProducts(searchedFilterProduct))
        }
    }

    function searchByValue(response, searchValue) {

        return response.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            el.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
            el.model.toLowerCase().includes(searchValue.toLowerCase()));
    }

    return (
        <header className="w-full bg-blue-700 h-16 sticky top-0 z-10 px-2">
            <div className="flex items-center h-full content shadow md:shadow-none justify-center">
                <div className="flex justify-between w-full gap-x-1 mx-auto max-w-screen-lg justify-center items-center text-white">
                    <a href="/" className="font-medium text-md md:text-2xl pl-4 md:pl-0 me-2">Eteration</a>

                    <div className="relative w-2/3 md:w-1/3">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-black-500" fill="#666666" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg>
                        </div>
                        <input
                            onKeyDown={(e) => searchProducts(e)}
                            type="text"
                            id="simple-search"
                            className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 text-black"
                            placeholder="Search" />
                        
                    </div>
                    
                    <ul className="flex gap-1 md:gap-2 text-gray-500 items-end pl-4">
                        <li className="cursor-pointer text-white md:mx-1 flex flex-col items-center md:flex-row md:min-w-[100px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            <span className="md:ms-2">{totalPrice}₺</span>
                        </li>

                        <li className="cursor-pointer text-white md:mx-1 flex flex-col items-center md:flex-row ms-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span className="md:ms-2">Eren</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import axios from 'axios'
import {useState, useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/reducer/productsReducer"
import { setFilterProducts } from "../redux/reducer/productsReducer";

let PageSize = 12;

export default function ProductList() {
    
    const productsArray = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    const [selectedPage, setSelectedPage] = useState(1);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://5fc9346b2af77700165ae514.mockapi.io/products',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(setProducts(response.data))
                dispatch(setFilterProducts(response.data))
            })

    }, []);

    useEffect(() => {
        setSelectedPage(1);
    }, [productsArray])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (selectedPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return productsArray.slice(firstPageIndex, lastPageIndex);
    }, [selectedPage, productsArray]);


    return (
        <div className="w-full h-full px-12">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    currentTableData.map((product, index) => (
                        <ProductCard products={product} index={index} key={product.id}/>
                    ))
                }
            </div>
            <Pagination currentPage={selectedPage} totalCount={productsArray} pageSize={PageSize}
                        onPageChange={page => setSelectedPage(page)}/>
        </div>
    )
}
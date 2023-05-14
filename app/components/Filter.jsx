import { useSelector, useDispatch } from "react-redux"
import { setProducts } from "../redux/reducer/productsReducer";
import { useEffect } from "react";
import { useState } from "react";

export default function Filter() {

    const products = useSelector(state => state.products.products);
    const filterProducts = useSelector(state => state.filterProducts.filterProducts);
    const dispatch = useDispatch();
    const [brandFilter, setBrandFilter] = useState([]);
    const [modelFilter, setModelFilter] = useState([]);
    const [pureProducts, setPureProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedModel, setSelectedModel] = useState([]);

    useEffect(() => {
        getBrandFilter(filterProducts, null);
        getModelFilter(filterProducts, null);
        setPureProducts(products);
    }, [filterProducts])
    
    useEffect(() => {
        filterByValues(selectedBrand,selectedModel);
    },[selectedBrand,selectedModel])

    const updateDispatch = (e) => {
        let filterType = e.target.getAttribute("order-value")
        let orderType = e.target.getAttribute("order-type")
        let array = [...products]
        let orderedResponse = orderBy(array, filterType, orderType)
        let orderedResponse1 = orderBy([...pureProducts], filterType, orderType)
        setPureProducts(orderedResponse1)
        
        dispatch(setProducts(orderedResponse))
    }

    const selectBrandFilter = (e) => {
        
        let checkBoxStatus = e.currentTarget.checked;
        if (checkBoxStatus) {
            setSelectedBrand(current => [...current, e.target.value])
            selectedBrand.push(e.target.value)
            getModelFilter(products, selectedBrand)
        } else {
            let arrayDelete = selectedBrand;
            arrayDelete = arrayDelete.filter((item) => item != e.target.value);
            setSelectedBrand(arrayDelete);
            getModelFilter(pureProducts, null)
        }
    }

    const selectModelFilter = (e) => {
        
        let checkBoxStatus = e.currentTarget.checked;
        if (checkBoxStatus) {
            setSelectedModel(current => [...current, e.target.value])
            selectedModel.push(e.target.value)
            getBrandFilter(products, selectedModel)
        } else {
            let arrayDelete = selectedModel;
            arrayDelete = arrayDelete.filter((item) => item != e.target.value);
            setSelectedModel(arrayDelete);
            getBrandFilter(pureProducts, null)
        }
    }

    function orderBy(response, filterType, orderType) {
    
        if (filterType == "date") {
            response.sort(function (a, b) {
                return orderType == "asc" ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
        }
    
        if (filterType == "price") {
            response.sort(function (a, b) {
                return orderType == "asc" ? parseInt(a.price) - parseInt(b.price) : parseInt(b.price) - parseInt(a.price);
            });
        }
        return response
    }

    function getBrandFilter(response, modelFilterValues) {
        if (modelFilterValues == null) {
            var brandFilter = response.map(a => a.brand);
            var uniqueBrandfilter = [...new Set(brandFilter)];
            setBrandFilter(uniqueBrandfilter);
        } else {
            var filteredResponse = response.filter(function (el) {
                return modelFilterValues.includes(el.model);
            })
        
            var brandFilteredResponse = filteredResponse.map(a => a.brand);
            var uniqueBrandFilteredResponse = [...new Set(brandFilteredResponse)];
            setBrandFilter(uniqueBrandFilteredResponse);
        }
    }

    function getModelFilter(response, brandFilterValues) {
       
        if (brandFilterValues == null) {
            var modelFilter = response.map(a => a.model);
            var uniqueModelFilter = [...new Set(modelFilter)];
            setModelFilter(uniqueModelFilter);
        } else {
            var filteredResponse = response.filter(function (el) {
                return brandFilterValues.includes(el.brand);
            })
        
            var modelFilteredResponse = filteredResponse.map(a => a.model);
            var uniqueModelFilteredResponse = [...new Set(modelFilteredResponse)];
            setModelFilter(uniqueModelFilteredResponse);
        }
    }

    function filterByValues(brandFilterValues, modelFilterValues) {

        var filteredResponse = pureProducts.filter(function (el) {
            if (brandFilterValues.length == 0 && modelFilterValues.length == 0) {
                return true;
            } else if (brandFilterValues.length == 0) {
                return modelFilterValues.includes(el.model);
            } else if(modelFilterValues.length == 0){
                return brandFilterValues.includes(el.brand)
            } else {
                return brandFilterValues.includes(el.brand) && modelFilterValues.includes(el.model);
            }
        })
        dispatch(setProducts(filteredResponse));
    }


    return (

        <div className="w-2/3 md:w-1/5 md:fixed md:top-18 md:left-16">
            <div className="w-full md:w-2/3 flex items-center flex flex-col">
                <div className="flex flex-col mb-8 w-full">
                    <span className="text-[10px] text-gray-300">Sort By</span>
                    
                    <div className="flex flex-col items-start p-2 bg-white rounded-sm shadow-2xl">
                        <label className="flex items-center" onChange={(e) => updateDispatch(e)}>
                            <input type="radio" value="option1" order-value="date" order-type="asc" name="sort"/>
                            <span className="text-[13px] text-blue-800 px-2 tracking-wide">Old to New</span>
                        </label>

                        <label className="flex items-center" onChange={(e) => updateDispatch(e)}>
                            <input type="radio" value="option2" order-value="date" order-type="desc" name="sort" />
                            <span className="text-[13px] text-blue-800 px-2 tracking-wide">New to Old</span>
                        </label>

                        <label className="flex items-center" onChange={(e) => updateDispatch(e)}>
                            <input type="radio" value="option3" order-value="price" order-type="desc" name="sort" />
                            <span className="text-[13px] text-blue-800 px-2 tracking-wide">Price High to Low</span>
                        </label>

                        <label className="flex items-center" onChange={(e) => updateDispatch(e)}>
                            <input type="radio" value="option4" order-value="price" order-type="asc" name="sort" />
                            <span className="text-[13px] text-blue-800 px-2 tracking-wide">Price Low to High</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col mb-8 w-full">
                    <span className="text-[10px] text-gray-300">Brands</span>
                    
                    <div className="flex flex-col h-32 items-start p-4 bg-white rounded-sm overflow-y-scroll shadow-2xl">
                        {
                            brandFilter.map((item, index) => (
                                <label className="flex items-center">
                                    <input type="checkbox" value={item} name="sort" onChange={(e) => selectBrandFilter(e)}/>
                                    <span className="text-[13px] text-blue-800 px-2 tracking-wide">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <span className="text-[10px] text-gray-300">Models</span>
                    
                    <div className="flex flex-col h-32 items-start p-2 bg-white rounded-sm overflow-y-scroll shadow-2xl">
                        {
                            modelFilter.map((item,index) => (
                                <label className="flex items-center">
                                    <input type="checkbox" value={item} name="sort" onChange={(e) => selectModelFilter(e)}/>
                                    <span className="text-[13px] text-blue-800 px-2 tracking-wide">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}
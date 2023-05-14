import { createSlice } from "@reduxjs/toolkit"

const initial = {
    products: [],
    filterProducts: [],
    storageCart: [],
    totalPrice: 0,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initial,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setFilterProducts: (state, action) => {
            state.filterProducts = action.payload;
        },
        setCartStorage: (state, action) => {
            state.storageCart = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        }
    }
})

export const { setProducts, setFilterProducts, setCartStorage, setTotalPrice } = productsSlice.actions;
export default productsSlice;
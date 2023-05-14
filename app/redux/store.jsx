import { configureStore } from "@reduxjs/toolkit"
import { productsSlice } from "./reducer/productsReducer"

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        filterProducts: productsSlice.reducer,
        storageCart: productsSlice.reducer,
        totalPriceRedux : productsSlice.reducer,
    }
})

export default store;
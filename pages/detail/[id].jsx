import ProductDetail from "../../app/components/ProductDetail";

export default function Detail() {
    return (
        <div className="w-full h-1/2 md:h-auto flex justify-center pt-4 pe-4">
            <div className="md:w-1/4"></div>
            
            <div className="md:w-3/4 flex justify-center">
                <ProductDetail />
            </div>
        </div>
    )
}
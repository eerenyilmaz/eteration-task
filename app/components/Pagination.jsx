import React from 'react';
import {usePagination} from "../utils/usePagination";

export default function Pagination({onPageChange, totalCount, siblingCount, currentPage, pageSize}) {

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className="flex justify-center mt-[20px]">
            <li className="py-3 h-8 text-center my-auto mx-1 flex items-center rounded-md min-w-[32px] cursor-pointer"
                onClick={onPrevious}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 12" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.08211 0.807903C7.32457 1.08499 7.29649 1.50617 7.0194 1.74862L2.25946 5.91357L7.0194 10.0785C7.29649 10.321 7.32457 10.7422 7.08211 11.0192C6.83966 11.2963 6.41848 11.3244 6.14139 11.082L1.09475 6.66615C0.639428 6.26774 0.639426 5.55941 1.09475 5.161L6.14139 0.745189C6.41848 0.502734 6.83966 0.530812 7.08211 0.807903Z"
                              fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.08211 0.807903C7.32457 1.08499 7.29649 1.50617 7.0194 1.74862L2.25946 5.91357L7.0194 10.0785C7.29649 10.321 7.32457 10.7422 7.08211 11.0192C6.83966 11.2963 6.41848 11.3244 6.14139 11.082L1.09475 6.66615C0.639428 6.26774 0.639426 5.55941 1.09475 5.161L6.14139 0.745189C6.41848 0.502734 6.83966 0.530812 7.08211 0.807903Z"
                              fill="#2A59FE" fillOpacity="0.3"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.08211 0.807903C7.32457 1.08499 7.29649 1.50617 7.0194 1.74862L2.25946 5.91357L7.0194 10.0785C7.29649 10.321 7.32457 10.7422 7.08211 11.0192C6.83966 11.2963 6.41848 11.3244 6.14139 11.082L1.09475 6.66615C0.639428 6.26774 0.639426 5.55941 1.09475 5.161L6.14139 0.745189C6.41848 0.502734 6.83966 0.530812 7.08211 0.807903Z"
                              fill="white" fillOpacity="0.5"/>
                    </svg>
                </div>
            </li>
            {
                paginationRange.map(number => {
                    if (number === "...") {
                        return <li className="py-3 h-8 text-center my-auto mx-1 flex items-center rounded-md min-w-[32px] cursor-pointer">&#8230;</li>;
                    }
                    return (
                        <li key={number} className={`py-3 h-8 text-center my-auto mx-1 flex items-center justify-center rounded-md min-w-[32px] cursor-pointer ${number === currentPage ? 'text-[#2A59FE] bg-white shadow-custom' : ''}`}
                            onClick={() => onPageChange(number)}>
                            {number}
                        </li>
                    );
                })}
            <li className="py-3 h-8 text-center my-auto mx-1 flex items-center rounded-md min-w-[32px] cursor-pointer"
                onClick={onNext}>
                <div className="rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 12" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.08211 0.807903C7.32457 1.08499 7.29649 1.50617 7.0194 1.74862L2.25946 5.91357L7.0194 10.0785C7.29649 10.321 7.32457 10.7422 7.08211 11.0192C6.83966 11.2963 6.41848 11.3244 6.14139 11.082L1.09475 6.66615C0.639428 6.26774 0.639426 5.55941 1.09475 5.161L6.14139 0.745189C6.41848 0.502734 6.83966 0.530812 7.08211 0.807903Z"
                              fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.08211 0.807903C7.32457 1.08499 7.29649 1.50617 7.0194 1.74862L2.25946 5.91357L7.0194 10.0785C7.29649 10.321 7.32457 10.7422 7.08211 11.0192C6.83966 11.2963 6.41848 11.3244 6.14139 11.082L1.09475 6.66615C0.639428 6.26774 0.639426 5.55941 1.09475 5.161L6.14139 0.745189C6.41848 0.502734 6.83966 0.530812 7.08211 0.807903Z"
                              fill="#2A59FE" fillOpacity="0.3"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.08211 0.807903C7.32457 1.08499 7.29649 1.50617 7.0194 1.74862L2.25946 5.91357L7.0194 10.0785C7.29649 10.321 7.32457 10.7422 7.08211 11.0192C6.83966 11.2963 6.41848 11.3244 6.14139 11.082L1.09475 6.66615C0.639428 6.26774 0.639426 5.55941 1.09475 5.161L6.14139 0.745189C6.41848 0.502734 6.83966 0.530812 7.08211 0.807903Z"
                              fill="white" fillOpacity="0.5"/>
                    </svg>
                </div>
            </li>
        </ul>
    );
};

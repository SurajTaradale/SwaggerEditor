import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col md:flex-row mx-auto border-t border-gray-300">
            <div className="bg-gray-200 p-8 rounded basis-1/2 mx-auto  w-full max-w-[450px]">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
            </div>
            <div className="basis-1/2 text-white text-center p-20 flex flex-col items-center" style={{ backgroundColor: '#16395b' }}>
                <div className="h-40 w-40 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4 w-36"></div>
                <div className="h-6 bg-gray-300 rounded mb-4 w-48"></div>
                <div className="h-6 bg-gray-300 rounded mb-4 w-60"></div>
                <div className="h-6 bg-gray-300 rounded mb-4 w-24"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;

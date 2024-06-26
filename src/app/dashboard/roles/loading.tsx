const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col md:flex-row lg:flex-row h-full container mx-auto border-t border-solid border-gray-300">
            <div className="w-full md:w-64 lg:w-64 p-6 text-gray-600 border-r border-l border-solid border-gray-300">
                <div className="flex flex-row overflow-scroll md:flex-col lg:flex-col md:overflow-hidden lg:overflow-hidden">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="list-none">
                            <div className="block py-2 px-4 bg-gray-300 h-10 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
            <main className="flex-1 p-10 text-gray-600">
                {[...Array(5)].map((_, index) => (
                    <div key={index}>
                        <div className="text-2xl font-semibold mb-4 bg-gray-300 h-8 rounded"></div>
                        <div className="bg-gray-300 h-6 w-2/3 mb-2 rounded"></div>
                        <div className="bg-gray-300 h-4 w-4/5 rounded"></div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default LoadingSkeleton;

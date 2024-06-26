const LoadingSkeleton = () => {
  return (
      <div className="animate-pulse flex flex-wrap justify-center">
          {[1, 2, 3, 4].map((index) => (
              <div key={index} className="w-full sm:w-full md:w-1/2 lg:w-1/2 p-4">
                  <div className="bg-white p-4 rounded-md flex flex-row h-full gap-6 border border-solid border-gray-300">
                      <div className="bg-gray-400 w-16 h-16 rounded-full"></div>
                      <div className="flex-grow">
                          <div className="bg-gray-400 h-6 w-2/3 mb-2 rounded"></div>
                          <div className="bg-gray-400 h-4 w-4/5 mb-2 rounded"></div>
                          <div className="bg-gray-400 h-4 w-3/4 rounded"></div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  );
};

export default LoadingSkeleton;
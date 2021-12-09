const LoadingSkeleton = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <div className="flex flex-wrap flex-col md:flex-row items-center mx-10">
        {data.map(() => {
          return (
            <div className="bg-white md:bg-gray-100 md:mr-10 dark:bg-gray-700 rounded-xl mb-7 w-[370px] sm:w-[400px] md:w-[240px] lg:w-[240px]">
              <div className="flex flex-col justify-between rounded shadow-lg">
                <div className="relative bg-gray-200 h-[240px] md:h-[160px] lg:h-[180px] rounded animate-pulse"></div>
                <div
                  className="flex flex-col justify-between"
                  style={{
                    height: "200.25px",
                  }}
                >
                  <div className="flex flex-col px-5 pt-5">
                    <div
                      className="font-roman"
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                      }}
                    >
                      <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    </div>
                    <div
                      className="flex flex-col space-y-2.5 font-roman pt-5"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      <div className="grid grid-cols-4 gap-1">
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

                        <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>

                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LoadingSkeleton;

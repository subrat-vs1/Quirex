import CountUp from "react-countup";

const Counter = () => {
  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 min-h-80">
        <div className="flex flex-col items-center justify-center text-center p-6">
          <img
            src="/img/c11.png"
            alt="img1"
            className="w-24 h-24 object-cover mb-4"
          />
          <p className="text-2xl font-bold">
            <CountUp start={0} duration={2} end={560} />+
          </p>
          <p className="text-[14px] text-gray-600">Total Area Sq</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-6">
          <img
            src="/img/c2.png"
            alt="img1"
            className="w-24 h-24 object-cover mb-4"
          />
          <p className="text-2xl font-bold">
            <CountUp start={0} duration={2} end={197} />
            K+
          </p>
          <p className="text-[14px] text-gray-600">Apartments Sold</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-6">
          <img
            src="/img/c3.png"
            alt="img1"
            className="w-24 h-24 object-cover mb-4"
          />
          <p className="text-2xl font-bold">
            <CountUp start={0} duration={2} end={560} />+
          </p>
          <p className="text-[14px] text-gray-600">Total Constructions</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-6">
          <img
            src="/img/c4.png"
            alt="img1"
            className="w-24 h-24 object-cover mb-4"
          />
          <p className="text-2xl font-bold">
            <CountUp start={0} duration={2} end={340} />+
          </p>
          <p className="text-[14px] text-gray-600">Apartments Rooms</p>
        </div>
      </div>
    </>
  );
}

export default Counter

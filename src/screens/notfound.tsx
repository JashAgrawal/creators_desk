import { GiDeathNote } from "react-icons/gi";
const Notfound = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
      <h1 className="text-6xl text-gray-800 font-black mb-4">OOPS !</h1>
      <GiDeathNote size={270} className="text-red-500" />
      <h3 className="text-2xl text-gray-600 font-semibold">
        Looks like you wanderd somewhere unknown !
      </h3>
    </div>
  );
};

export default Notfound;

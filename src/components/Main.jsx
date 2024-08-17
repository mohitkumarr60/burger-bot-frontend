import Hero from "./Hero";
import Chatbot from "./Chatbot";

export default function Main() {
  return (
    <div className="lg:flex gap-10 justify-evenly container m-auto">
      <div className="lg:w-[40%] backdrop-blur bg-white bg-opacity-40 rounded-xl p-12 lg:px-16 lg:h-[700px] flex items-center">
        <div>
          <Hero />
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-[60%] lg:h-[700px] rounded-xl font-semibold">
        <Chatbot />
      </div>
    </div>
  );
}

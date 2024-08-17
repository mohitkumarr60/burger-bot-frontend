export default function Navbar() {
  return (
    <div className="flex w-full backdrop-blur bg-white bg-opacity-40 h-[100px] rounded-xl justify-start items-center font-semibold container m-auto px-5 gap-5">
      <img
        src="/src/assets/logo.jpeg"
        className="w-14 h-14 rounded-full"
        alt=""
      />
      <h1 className="text-2xl md:text-3xl">Mohit&apos;s Kitchen</h1>
    </div>
  );
}

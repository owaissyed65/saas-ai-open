import Image from "next/image";


const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center gap-y-4 mb-4">
      <div className="w-10 h-10 animate-spin relative">
        <Image src="/logo.png" fill alt="logo" />
      </div>
      <p className='text-sm text-muted-foreground'> Genius is thinking...</p>
    </div>
  );
};

export default Loader;

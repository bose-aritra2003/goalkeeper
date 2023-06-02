import Link from "next/link";
import Image from "next/image";

const Brand = ({ priority }: {  priority: boolean }) => {
  return (
    <Link href="/" className="flex space-x-2 w-fit">
      <div className="flex items-center space-x-2">
        <Image
          priority={priority}
          width={40} height={40}
          src="/images/logo.svg"
          alt="logo"
          className="drop-shadow-lg"
        />
        <span className="sr-only">goalkeeper</span>
        <span className="text-3xl font-bold tracking-tight text-blue-900 drop-shadow-sm">
          Goalkeeper
        </span>
      </div>

      <span className="mt-0.5 font-bold bg-yellow-400 h-fit text-amber-950 text-[0.5rem] py-0.5 px-1 border border-black rounded-md drop-shadow-sm">
        AI
      </span>
    </Link>
  );
}
export default Brand;
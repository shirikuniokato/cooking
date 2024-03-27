import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="bg-black h-[90px] sticky top-0 z-[999]">
      <div className="relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <Link href="/" className="h-full flex items-center justify-center">
          <Image src="/logo.svg" width={84} height={44.28} alt="西岡料理修行" />
        </Link>
      </div>
    </header>
  );
}

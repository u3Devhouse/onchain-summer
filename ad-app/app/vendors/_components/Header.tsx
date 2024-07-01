import ConnectButton from "@/app/_components/ConnectButton";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center border-b-2 border-black sticky top-0 bg-white/50 backdrop-blur-sm">
      <header className="flex flex-row items-center justify-between px-4 py-2 w-full max-w-[1440px]">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="text-3xl font-anton">CollectAds</div>
          <nav className="md:flex flex-row items-center justify-center gap-2 text-base hidden ">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/vendors/search">
              Search
            </Link>
            <Link className="hover:underline" href="/vendor">
              My Ads
            </Link>
          </nav>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <ConnectButton />
          <div className="rounded-full border-[1px] border-black p-2">
            <FaRegUser />
          </div>
        </div>
      </header>
    </div>
  );
}

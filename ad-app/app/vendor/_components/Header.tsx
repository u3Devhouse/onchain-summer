import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center border-b-2 border-black sticky top-0 bg-white/50 backdrop-blur-sm">
      <header className="flex flex-row items-center justify-between px-4 py-2 w-full max-w-[1440px]">
        <div className="text-3xl font-anton">AdLibrary</div>
        <div className="flex flex-row items-center justify-center gap-2">
          <nav className="flex flex-row items-center justify-center gap-2">
            <Link href="/">Home</Link>
            <Link href="/vendor/search">Search</Link>
            <Link href="/vendor">My Ads</Link>
          </nav>
          <div>Wallet Button</div>
        </div>
      </header>
    </div>
  );
}

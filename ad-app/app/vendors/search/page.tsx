import Ads from "./_components/Ads";
import Filters from "./_components/Filters";
import SearchBar from "./_components/SearchBar";

export default function FeedPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <SearchBar />
      <Filters />
      <hr className="w-full my-8" />
      <Ads />
    </div>
  );
}

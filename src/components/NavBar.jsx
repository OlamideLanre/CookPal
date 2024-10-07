import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export function NavBar({ searchTerm, setSearchTerm }) {
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <nav className="">
        <div className="flex justify-around items-center p-4 nav-container">
          <div className="logo flex gap-3">
            <img src="cook-book.png" alt="logo" srcset="" width={"40px"} />
            <div>
              <h2 className="text-3xl font-bold tracking-wider text-yellow-500">
                CookPal
              </h2>
            </div>
          </div>

          <div>
            <input
              type="text"
              className="py-2 pr-20 pl-5 mr-3 outline-none border border-gray-300 rounded-md"
              placeholder="find recipe..."
              value={searchTerm}
              onChange={handleSearchTerm}
            />
            {/* <SearchOutlined className="cursor-pointer" /> */}
          </div>
          <div className="pages">
            <Link>favorites</Link>
            <Link>bookmark</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

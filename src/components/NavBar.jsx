import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export function NavBar({ searchTerm, setSearchTerm }) {
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <nav className="">
        <div className="flex flex-wrap p-4 nav-container">
          <div className="logo flex gap-3">
            <img src="cook-book.png" alt="logo" srcset="" width={"40px"} />
            <div>
              <h2 className="text-3xl font-bold tracking-wider text-yellow-500 mr-3">
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
          <div className="pages flex gap-5 items-center">
            <div>
              <Link className="link" to="/favorites">
                favorites
              </Link>
            </div>
            <div>
              <Link className="link" to="/bookmark">
                bookmark
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

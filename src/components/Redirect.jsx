import { Link } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
export function Redirect() {
  return (
    <>
      <div className="mt-3">
        <Link to="/" className="bg-yellow-500 p-2 ml-3 rounded-sm">
          <HomeFilled className="items-start" />
        </Link>

        {/* <img src="cook-book.png" alt="logo" srcset="" width={"40px"} /> */}
      </div>
    </>
  );
}

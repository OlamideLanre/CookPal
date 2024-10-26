import { useState } from "react";
import { Redirect } from "../components/Redirect";
import { useRecipeCollection } from "../hooks/useRecipeCollection";
import { Link } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";

export function BookMark() {
  const { recipes: bookmarks, removeRecipe: removeFromBookmarks } =
    useRecipeCollection("bookMarks");

  return (
    <>
      <Redirect />
      <div className="container p-2">
        <h1 className="font-semibold">Bookmarks: save recipes for later</h1>
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <div
              className="flex flex-col bg-yellow-300 text-left mt-2 p-3 rounded-md"
              key={bookmark.ID}
            >
              <div className="flex-child flex items-center gap-2">
                <div className="img-div">
                  <img
                    src={bookmark.MealImg}
                    alt={bookmark.MealName}
                    width={"100px"}
                  />
                </div>
                <div className="text-div">
                  <p>{bookmark.MealName}</p>
                  <Link
                    key={bookmark.ID}
                    to={`/details/${bookmark.ID}`}
                    className="view"
                    style={{
                      color: "#0F4122",
                    }}
                  >
                    View recipe
                  </Link>
                </div>
              </div>
              <div className="justify-end flex items-center cursor-pointer">
                <DeleteFilled
                  onClick={() => {
                    removeFromBookmarks(bookmark.ID);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="error text-2xl font-semibold">
            No saved recipe <br /> in bookmark
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "../components/Redirect";
import { DeleteFilled } from "@ant-design/icons";
import { useRecipeCollection } from "../hooks/useRecipeCollection";

export function Favorites() {
  const { recipes: favorites, removeRecipe: removeFromFavs } =
    useRecipeCollection("favRecipes");

  return (
    <>
      <Redirect />
      <div className="container p-2">
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div
              className="flex flex-col bg-yellow-300 text-left mt-2 p-3 rounded-md"
              key={favorite.ID}
            >
              <div className="flex-child flex items-center gap-2">
                <div className="img-div">
                  <img
                    src={favorite.MealImg}
                    alt={favorite.MealName}
                    width={"100px"}
                  />
                </div>
                <div className="text-div">
                  <p>{favorite.MealName}</p>
                  <Link
                    key={favorite.ID}
                    to={`/details/${favorite.ID}`}
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
                    removeFromFavs(favorite.ID);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="error text-2xl font-semibold">
            No recipe <br /> in favorites
          </div>
        )}
      </div>
    </>
  );
}

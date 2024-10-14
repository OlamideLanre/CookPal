import { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "../components/Redirect";

export function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedRecipes = localStorage.getItem("favRecipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  return (
    <>
      <Redirect />
      <div className="container">
        {favorites.map((favorite, index) => (
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
          </div>
        ))}
      </div>
    </>
  );
}

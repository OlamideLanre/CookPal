import { Link } from "react-router-dom";

export function MealCard({ meal }) {
  return (
    <>
      <div
        className="border rounded-md p4 mt-10 ml-5"
        style={{
          borderWidth: "2px",
          borderColor: "#A9C471",
        }}
      >
        {/* image div */}
        <div className=" flex justify-center items-center mt-4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mb-2 rounded-md"
            width={"200px"}
          />
        </div>
        <Link
          key={meal.idMeal}
          to={`/details/${meal.idMeal}`}
          className="font-bold text-xl"
          style={{
            color: "#0F4122",
          }}
        >
          {meal.strMeal}
        </Link>
        <p className="ml-2 italic text-center">
          <span>Category: </span>
          {meal.strCategory}
          <span className="ml-3">
            Origin: <span>{meal.strArea}</span>
          </span>
        </p>
      </div>
    </>
  );
}

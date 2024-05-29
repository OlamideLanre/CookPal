export function MealCard({ meal }) {
  return (
    <>
      <div className="border border-gray-300 rounded p4 mt-10">
        <div className=" flex justify-center items-center mt-4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mb-2 rounded-md"
            width={"200px"}
          />
        </div>
        <h3 className="font-bold mr-64 text-xl text-">{meal.strMeal}</h3>
        <p className="text-start ml-2">
          <span className="font-bold">Category: </span>
          {meal.strCategory}
          <br />
          <span>
            Origin: <span>{meal.strArea}</span>
          </span>
        </p>
        <p>
          <span className="font-bold">Instructions</span>
          {meal.strInstructions}
        </p>
      </div>
    </>
  );
}

export function MealCard({ meal }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return (
    <>
      <div className="border border-gray-300 rounded p4 mt-10">
        {/* image div */}
        <div className=" flex justify-center items-center mt-4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mb-2 rounded-md"
            width={"200px"}
          />
        </div>
        <h3 className="font-bold text-xl">{meal.strMeal}</h3>
        <p className="text-start ml-2 italic">
          <span>Category: </span>
          {meal.strCategory}
          <span className="ml-3">
            Origin: <span>{meal.strArea}</span>
          </span>
        </p>

        <p className="text-start mt-2 ml-3">
          <span className="text-lg font-semibold">Ingredients: </span> <br />
          {ingredients.map((ingredient, index) => (
            <span key={index} className="block">
              {ingredient}
            </span>
          ))}
        </p>

        <a href="">Instruction</a>
        {/* <p className="mt-3">
          <h3 className="font-bold text-xl text-start">Instructions</h3>
          <p className="text-justify ">{meal.strInstructions}</p>
        </p> */}
      </div>
    </>
  );
}

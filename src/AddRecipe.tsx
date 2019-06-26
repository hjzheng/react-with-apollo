import React, { useState } from "react";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";
import { Mutation } from "react-apollo";

interface Recipe {
  title: string;
  vegetarian: string;
}

interface RecipeInput {
  variables: {
    recipe: Recipe;
  };
}

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

enum INPUT_TYPE {
  "CHECKBOX",
  "TEXT"
}

function useInput(defaultValue: any, type: INPUT_TYPE) {
  let [value, setValue] = useState(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === INPUT_TYPE.CHECKBOX) {
      setValue(e.target.checked);
    }

    if (type === INPUT_TYPE.TEXT) {
      setValue(e.target.value);
    }
  };

  return [value, onChange];
}

export function AddRecipe() {
  let [title, onTileChange] = useInput("", INPUT_TYPE.TEXT);
  let [vegetarian, onVegetarianChange] = useInput(false, INPUT_TYPE.CHECKBOX);

  return (
    <Mutation
      mutation={addRecipeMutation}
      refetchQueries={[
        {
          query: recipesQuery,
          variables: { vegetarian: false }
        },
        {
          query: recipesQuery,
          variables: { vegetarian: true }
        }
      ]}
      awaitRefetchQueries={true}
    >
      {(
        addRecipe: (recipeInput: RecipeInput) => void,
        { loading, error }: { loading: boolean; error?: ApolloError }
      ) => (
        <form
          onSubmit={evt => {
            evt.preventDefault();
            addRecipe({
              variables: {
                recipe: {
                  title,
                  vegetarian
                }
              }
            });
          }}
        >
          <label>
            Title: <input value={title} onChange={onTileChange} />
          </label>
          <label>
            vegetarian:
            <input
              type="checkbox"
              value={vegetarian}
              onChange={onVegetarianChange}
            />
          </label>
          <div>
            <button>Add Recipe</button>
          </div>
        </form>
      )}
    </Mutation>
  );
}

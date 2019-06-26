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

function useInput(
  defaultValue: any,
  type: INPUT_TYPE
): [any, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void] {
  let [value, setValue] = useState(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === INPUT_TYPE.CHECKBOX) {
      setValue(e.target.checked);
    }

    if (type === INPUT_TYPE.TEXT) {
      setValue(e.target.value);
    }
  };

  const onReset = () => {
    setValue(defaultValue);
  };

  return [value, onChange, onReset];
}

export function AddRecipe() {
  let [title, onTileChange, onTitleReset] = useInput("", INPUT_TYPE.TEXT);
  let [vegetarian, onVegetarianChange, onVegetarianReset] = useInput(
    false,
    INPUT_TYPE.CHECKBOX
  );

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
            onTitleReset();
            onVegetarianReset();
          }}
        >
          <label>
            Title: <input value={title} onChange={onTileChange} />
          </label>
          <label>
            vegetarian:
            <input
              type="checkbox"
              checked={vegetarian}
              onChange={onVegetarianChange}
            />
          </label>
          <div>
            <button>Add Recipe</button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </form>
      )}
    </Mutation>
  );
}

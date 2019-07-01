import React from "react";
import gql from "graphql-tag";
import FlexBox from "./FlexBox";
import { ApolloError } from "apollo-boost";
import { Mutation } from "react-apollo";
import useForm, { Errors, FormResult } from "./useForm";
import * as yup from "yup";

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

export function AddRecipe() {
  let [form, onChange, onBlur, onReset, onSubmit, errors]: FormResult = useForm(
    {
      title: "",
      vegetarian: false
    },
    values => {
      let errors: Errors = {};

      if (values.title === "") {
        errors.title = "title can not be empty";
      } else {
        errors.title = "";
      }

      return errors;
    },
    values => {
      console.log(values);
    }
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
                  title: form.title,
                  vegetarian: form.vegetarian
                }
              }
            });
            onSubmit();
            onReset();
          }}
        >
          <FlexBox
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"600px"}
          >
            <FlexBox>
              <label>
                Title:{" "}
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.title}
              </label>
            </FlexBox>
            <FlexBox>
              <label>
                vegetarian:
                <input
                  type="checkbox"
                  name="vegetarian"
                  checked={form.vegetarian}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
            </FlexBox>
            <FlexBox>
              <button>Add Recipe</button>
            </FlexBox>
          </FlexBox>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </form>
      )}
    </Mutation>
  );
}

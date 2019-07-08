import React from "react";
import gql from "graphql-tag";
import FlexBox from "@jxz/flexbox";
import { ApolloError } from "apollo-boost";
import { Mutation } from "react-apollo";
import useForm, { Errors, FormResult } from "./useForm";
// import * as yup from "yup";

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
      vegetarian: false,
      hobby: [],
      skill: "vue"
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
    (values, errors, dirties) => {
      console.log(values, errors, dirties);
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
            width={"800px"}
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
            <FlexBox>
              <span>Hobby:</span>
              <label>
                reading:
                <input
                  type="checkbox"
                  name="hobby"
                  value="reading"
                  checked={form.hobby.includes("reading")}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
              <label>
                coding:
                <input
                  type="checkbox"
                  name="hobby"
                  value="coding"
                  checked={form.hobby.includes("coding")}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
            </FlexBox>
            <FlexBox>
              <span>Skill: onlyone choice</span>
              <label>
                vue:
                <input
                  type="radio"
                  name="skill"
                  value="vue"
                  checked={form.skill === "vue"}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
              <label>
                react:
                <input
                  type="radio"
                  name="skill"
                  value="react"
                  checked={form.skill === "react"}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
            </FlexBox>
          </FlexBox>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </form>
      )}
    </Mutation>
  );
}

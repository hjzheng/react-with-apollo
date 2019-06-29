import React, { useState } from "react";
import gql from "graphql-tag";
import FlexBox from "./FlexBox";
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

// https://jaredpalmer.com/formik/docs/overview

type InitialValues = {
  [propName: string]: any;
};

type Errors = {
  [propName: string]: any;
};

type Dirties = {
  [propName: string]: boolean;
};

function useForm(
  initialValues: InitialValues,
  validate: (values: InitialValues) => Errors,
  submit: (values: InitialValues) => void
): [
  object,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => Errors,
  () => void,
  () => void,
  Errors
] {
  let [form, setForm] = useState(initialValues);
  let [dirties, setDirties] = useState({} as Dirties);
  let [errors, setErrors] = useState({} as Errors);

  // TODO 缺乏对数组的判断
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;

    const val = /number|range/.test(type)
      ? parseFloat(value)
      : /checkbox/.test(type)
      ? checked
      : /radio/.test(type) // is this needed?
      ? value
      : value;

    setDirties({
      ...dirties,
      [name]: true
    });

    setForm({
      ...form,
      [name]: val
    });
  };

  // TODO validate
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    const val = /number|range/.test(type)
      ? parseFloat(value)
      : /checkbox/.test(type)
      ? checked
      : /radio/.test(type) // is this needed?
      ? value
      : value;

    if (dirties[name]) {
      setErrors({
        ...errors,
        ...validate({ [name]: val })
      });
    }
    return errors;
  };

  const onReset = () => {
    setForm(initialValues);
  };

  // TODO
  const onSubmit = () => {
    submit(form);
  };

  return [form, onChange, onBlur, onReset, onSubmit, errors];
}

export function AddRecipe() {
  let [form, onChange, onBlur, onReset, onSubmit, errors]: [
    any,
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    () => void,
    () => void,
    Errors
  ] = useForm(
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

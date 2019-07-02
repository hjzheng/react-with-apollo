import React, { useState } from "react";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import FlexBox from "@jxz/flexbox";

interface Recipe {
  id: string;
  title: string;
}
interface Result {
  recipes: Recipe[];
}

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

export function Recipes() {
  const [vegetarian, setVegetarian] = useState(false);

  const updateVegetarian = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVegetarian(e.target.checked);
  };

  return (
    <FlexBox
      flexDirection="row"
      alignItems={"center"}
      justifyContent={"space-between"}
      width={600}
    >
      <label>
        <input
          type="checkbox"
          checked={vegetarian}
          onChange={updateVegetarian}
        />
        <span>vegetarian</span>
      </label>
      <Query query={recipesQuery} variables={{ vegetarian }}>
        {({
          data,
          loading,
          error
        }: {
          data: Result;
          loading: boolean;
          error?: ApolloError;
        }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Something went wrong</p>;

          return (
            <ul>
              {data.recipes.map(({ id, title }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    </FlexBox>
  );
}

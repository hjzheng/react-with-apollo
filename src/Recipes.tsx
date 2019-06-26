import React from "react";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";
import { Query } from "react-apollo";

interface Recipe {
  id: string;
  title: string;
}
interface Result {
  recipes: Recipe[];
}

export function Recipes() {
  return (
    <Query
      query={gql`
        {
          recipes {
            id
            title
          }
        }
      `}
    >
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
  );
}

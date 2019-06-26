import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Recipes } from "./Recipes";
import { AddRecipe } from "./AddRecipe";

import "./App.css";

// create apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">Hello Wrold</div>
      <AddRecipe />
      <Recipes />
    </ApolloProvider>
  );
};

export default App;

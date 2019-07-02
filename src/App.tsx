import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Recipes } from "./Recipes";
import { AddRecipe } from "./AddRecipe";
import FlexBox from "@jxz/flexbox";

import "./App.css";

// create apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const BoxStyle = {
  borderBottom: "1px solid #000",
  padding: "20px"
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <FlexBox flexDirection={"column"}>
        <FlexBox style={BoxStyle}>
          <div className="App">Hello APOLLO</div>
        </FlexBox>
        <FlexBox style={BoxStyle}>
          <AddRecipe />
        </FlexBox>
        <FlexBox style={BoxStyle}>
          <Recipes />
        </FlexBox>
      </FlexBox>
    </ApolloProvider>
  );
};

export default App;

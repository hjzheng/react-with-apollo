import React from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, ApolloConsumer } from "react-apollo";

import "./App.css";

// create apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">Hello Wrold</div>
      <ApolloConsumer>
        {client => {
          client
            .query({
              query: gql`
                {
                  recipes {
                    id
                    title
                  }
                }
              `
            })
            .then(result => console.log(result));
          return null;
        }}
      </ApolloConsumer>
    </ApolloProvider>
  );
};

export default App;

# react-with-apollo

### install dependence

yarn add graphql apollo-boost react-apollo

### step1 setup and connect an Apollo Client

where is Apollo Server ?
https://github.com/nikgraf/graphql-apollo-client-course/tree/master/server

```js
cd server
npm run seed
npm run start:slow
```

### step2 fetch data using the query component

### step3 dynamic arguments in query component

```js
const recipesQuery = gql`
  {
    recipes(vegetarian: true) {
      id
      title
    }
  }
`;

const recipesQuery = gql`
  query recipes($vegetarian: Boolean! {
    recipes(vegetarian: $ vegetarian) {
      id
      title
    }
  }
`;
```

### step4 update data using the mutation component

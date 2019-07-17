# Code class GraphQL

## [Slides](https://voorhoede.github.io/code-class-graphql/)

## Setup
```sh
git clone git@github.com:voorhoede/code-class-graphql.git
cd code-class-graphql
npm install
```

## Run exercise
Use `npm run` followed by the exercise number, for example to run the second exercise:
```sh
npm run 2
```

Running the solution works in a similar fashion:
```sh
npm run 2:solution
```

## Exercises

### One
Change the schema and resolver to return an array with extra information about the code class.

### Two
Add the `CodeClass` type and resolver with a required `name` and `date`.

### Three
Write a query to fetch folks at De Voorhoede GitHub organization and pass this data to the `voorhoedeMembers` function.

    WTF is GraphQL?
    https://graphql.org/
        !!! GraphQL is a specification for a query language and execution engine
        How does GraphQL fit in the big picture
        Introduction
            Front-end perspective
                All about: how to access database content from our frontend?
                "GraphQL is particularly great for frontend developers since it completely eliminates many of the inconveniences and shortcomings that are experienced with REST APIs. Complexity is pushed to the server-side where powerful machines can take care of the heavy computation work." - nikolasburk
                get exactly the data you want in the structure you expect
        How? Compare with REST
            Relations
                FE <> REST Server <> DB
                FE <> GraphQL Server <> DB
            One endpoint
            Not tied to the HTTP protocol allows subscriptions over protocols like websockets
            No HTTP status codes, responses can solve partially
                !!! Server-side caching is more complex but also more precise, field specific caching and authentication is possible!
            Most implementations send JSON that contain the GraphQL query to a GraphQL server
            Resolvers, not part of GraphQL
        Why?
            "GraphQL enables the server developer to focus on describing the data available rather than implementing and optimizing specific endpoints" - marktani
            Get data in the shape you expect, like an object with only the keys, the server will fill in the values
            show simple graphql query
            One request: no need to get data from multiple endpoints
            Versioning: no need to change tons of code for using new API versions because you ask for fields
            No more URL construction, query language: structure, types, variables and logic
            Explorable API, available data is defined
            show graphiql
            !!! Pagination is not solved, facebook advises opinionated solutions through docs and tools
        Who?
            The GraphQL specification is open source & made by facebook
            The first GraphQL specification went up in 2015 but before that facebook has been using graphql internally for a couple of years
            about a year ago the "GraphQL Working Group" was started with contributors from different companies
            Good sign, big companies like shopify and github started using GraphQL in its early stage
        Implementation
            language independent
                doesn't matter what language the server or frontend is written in
                JS is the most popular language with facebook's reference implementation also being JS
            Frontend
                GraphQL clients vary in abstraction, you can use `fetch`
                One abstraction higher there are graphql-request & fetchql
                    these take care of formatting the query and the headers
                    can also clients like axios with some boilerplate to achieve the same
                One abstraction higher there are framework specific clients like apollo & relay
                    these merge all of your data requirements per view together in one big GraphQL query and send that back to the server
            Serverside
                For the server ruby, python, golang and scala are also good options
                GraphQL can be placed in front of a REST API, multiple REST APIs even
                FE <> GraphQL Server <> REST Server <> DB
                Also you can even omit the server-side and 'proxy' requests client-side in the frontend with GraphQL
                Prisma
                FE <> GraphQL Server <> GraphQL Server <> DB
                    "Because getting the needed data from the DB is hard"
                    Adds an extra layer which can use multiple DBs
                    Postgres, MySQL, MongoDB
                    Use GraphQL schema to describe your data model
                    Add business logic, e.g. for authentication
                !!! Automatic DB to GraphQL mapping so you don't have to write the GraphQL server
                FE <> GraphQL Server <> DB
                    Get the types and permissions from PostgreSQL
                    Graphile
                    https://www.graphile.org/
                    Hasura
                    https://hasura.io/
        Let's try it out
            GraphQL cheatsheet
            https://devhints.io/graphql
            difference named queries and omitting query completely
            try changing the schema and resolver so an array is returned
            npm run 1
            add the CodeClass type and resolver with a required name and date
            npm run 2
            two react components with apollo, think of something funny or cool
            npm run 3
        Conclusion
            How to GraphQL
            http://howtographql.com/
            Can't beat the simplicity of REST, just HTTP calls, nothing special needed
            Conventions are still in flux, best I could find, doc by Spotify developer
            https://gist.github.com/swalkinshaw/3a33e2d292b60e68fcebe12b62bbb3e2
            Play around with:
                GitHub API
                https://developer.github.com/v4/explorer/
                Pokemon API
                https://graphql-pokemon.now.sh/

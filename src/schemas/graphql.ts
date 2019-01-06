import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";
import { login, register } from "../routes";
import { userLoginSchema } from "./userLoginSchema";
import { userRegisterSchema } from "./userRegisterSchema";

// Define the Query type
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    loginUser: {
      type: new GraphQLNonNull(userRegisterSchema.responseType),
      // `args` describes the arguments that the `user` query accepts
      args: {
        input: { type: userLoginSchema.UserInput },
      },
      async resolve(_, args) {
        const val = await login(args);
        return val;
      },
    },
  },
});

// Defining Mutation
const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: new GraphQLNonNull(userRegisterSchema.responseType),
      // `args` describes the arguments that the `user` query accepts
      args: {
        input: { type: userRegisterSchema.UserInput },
      },
      async resolve(_, args) {
        const val = await register(args);
        return val;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
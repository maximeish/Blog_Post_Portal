/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Users: {
            screens: {
              UsersScreen: "users",
            },
          },
          Posts: {
            screens: {
              PostsScreen: "posts",
            },
          },
          Comments: {
            screens: {
              CommentsScreen: "comments",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

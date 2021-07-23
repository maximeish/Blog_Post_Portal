import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Users: {
            screens: {
              UsersScreen: "Users",
            },
          },
          Posts: {
            screens: {
              PostsScreen: "Posts",
            },
          },
          Comments: {
            screens: {
              CommentsScreen: "Comments",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

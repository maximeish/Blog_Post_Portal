/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import UsersScreen from "../screens/UsersScreen";
import PostsScreen from "../screens/PostsScreen";
import CommentsScreen from "../screens/CommentsScreen";
import {
  BottomTabParamList,
  UsersScreenParamList,
  PostsScreenParamList,
  CommentsScreenParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Users"
      tabBarOptions={{
        activeTintColor: "#000",
        style: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: 10,
          height: 80,
          paddingBottom: 15,
          shadowColor: "#7F5DF0",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 5,
        },
      }}
    >
      <BottomTab.Screen
        name="Users"
        component={UsersScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarUsersIcon name="user" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Posts"
        component={PostsScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarPostsIcon name="post-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Comments"
        component={CommentsScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarCommentsIcon name="comments" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarUsersIcon = (props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) => <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarPostsIcon = (props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) => (
  <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
);

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarCommentsIcon = (props: {
  name: React.ComponentProps<typeof Fontisto>["name"];
  color: string;
}) => <Fontisto size={30} style={{ marginBottom: -3 }} {...props} />;

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const UsersScreenStack = createStackNavigator<UsersScreenParamList>();

function UsersScreenNavigator() {
  return (
    <UsersScreenStack.Navigator>
      <UsersScreenStack.Screen
        name="Users"
        component={UsersScreen}
        options={{ headerTitle: "Users management" }}
      />
    </UsersScreenStack.Navigator>
  );
}

const PostsScreenStack = createStackNavigator<PostsScreenParamList>();

function PostsScreenNavigator() {
  return (
    <PostsScreenStack.Navigator>
      <PostsScreenStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerTitle: "Posts management" }}
      />
    </PostsScreenStack.Navigator>
  );
}

const CommentsScreenStack = createStackNavigator<CommentsScreenParamList>();

function CommentsScreenNavigator() {
  return (
    <CommentsScreenStack.Navigator>
      <CommentsScreenStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerTitle: "Comments management" }}
      />
    </CommentsScreenStack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: "#7F5DF0",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 2,
//     elevation: 5,
//   },
// });

import * as React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { View } from "../components/Themed";
import { DataTable, ActivityIndicator, Text, Button } from "react-native-paper";

import { DashboardContext } from "../context/DashboardContext";
import { Foundation, MaterialIcons } from "@expo/vector-icons";
import styles from "../shared/styles/tableStyles";

const PostsScreen = () => {
  useEffect(() => {
    (async () =>
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((posts) => {
          setDashboardState({ ...dashboardState, posts: posts.data });
          setFetching(false);
        })
        .catch((e) => {
          console.log(e);
          setNetError(true);
          setDashboardState({
            ...dashboardState,
            posts: [{ id: "Error" }],
          });
          setFetching(false);
        }))();
  }, []);

  const { dashboardState, setDashboardState } = useContext(DashboardContext);
  const [isPostSelected, setPostSelected] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [netError, setNetError] = useState(false);
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [4, 5, 6];
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    dashboardState.posts.length
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const selectSinglePost = (postId) => {
    setFetching(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((post) => {
        setDashboardState({ ...dashboardState, selectedPost: post.data });
        setFetching(false);
        setPostSelected(true);
      })
      .catch((e) => console.log(e));
  };

  const closePostInfoView = () => setPostSelected(false);

  return (
    <View style={styles.container}>
      {isPostSelected ? (
        <View
          style={{
            display: isPostSelected ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          <Text>User ID: {dashboardState.selectedPost.userId}</Text>
          <Text>Post ID: {dashboardState.selectedPost.id}</Text>
          <Text>Title: {dashboardState.selectedPost.title}</Text>
          <Text>Body: {dashboardState.selectedPost.body}</Text>

          <Button
            style={styles.closeInfoView}
            icon="close"
            mode="contained"
            onPress={() => closePostInfoView()}
          >
            Back
          </Button>
        </View>
      ) : (
        <View>
          <Button>
            <MaterialIcons name="post-add" size={36} color="lightgreen" />
          </Button>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Title</DataTable.Title>
              <DataTable.Title>Body</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>

            {isFetching ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                animating={true}
              ></ActivityIndicator>
            ) : (
              dashboardState.posts.map((post, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell onPress={() => selectSinglePost(post.id)}>
                    {post.id}
                  </DataTable.Cell>
                  <DataTable.Cell onPress={() => selectSinglePost(post.id)}>
                    {post.title}
                  </DataTable.Cell>
                  <DataTable.Cell onPress={() => selectSinglePost(post.id)}>
                    {!netError &&
                      post.body?.split(" ").slice(0, 5).join(" ") + "..."}
                  </DataTable.Cell>

                  <DataTable.Cell>
                    {!netError && (
                      <View style={styles.actionButton}>
                        <Foundation
                          name="page-edit"
                          size={30}
                          color="lightblue"
                        />

                        <Foundation name="page-delete" size={30} color="red" />
                      </View>
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            )}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(
                dashboardState.posts.length / numberOfItemsPerPage
              )}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${dashboardState.posts.length}`}
              showFastPaginationControls
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={numberOfItemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </View>
      )}
    </View>
  );
};

export default PostsScreen;

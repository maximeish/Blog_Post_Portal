import * as React from "react";
import { useContext, useState, useEffect } from "react";

import { View } from "../components/Themed";
import { DataTable, ActivityIndicator, Button } from "react-native-paper";

import { DashboardContext } from "../context/DashboardContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../shared/styles/tableStyles";
import axios from "axios";

const CommentsScreen = () => {
  useEffect(() => {
    (async () =>
      await axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((comments) => {
          setDashboardState({ ...dashboardState, comments: comments.data });
          setFetching(false);
        })
        .catch((e) => {
          console.log(e);
          setNetError(true);
          setDashboardState({
            ...dashboardState,
            comments: [{ id: "Error" }],
          });
          setFetching(false);
        }))();
  }, []);

  const { dashboardState, setDashboardState } = useContext(DashboardContext);
  const [netError, setNetError] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const numberOfItemsPerPageList = [4, 5, 6];
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    dashboardState.comments.length
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View style={styles.container}>
      <Button>
        <MaterialCommunityIcons
          name="comment-plus"
          size={36}
          color="lightgreen"
        />
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Body</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {isFetching ? (
          <ActivityIndicator
            style={styles.activityIndicator}
            animating={true}
          ></ActivityIndicator>
        ) : (
          dashboardState.comments.map((comment, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{comment.id}</DataTable.Cell>
              <DataTable.Cell>{comment.name}</DataTable.Cell>
              <DataTable.Cell>{comment.email}</DataTable.Cell>
              <DataTable.Cell>
                {!netError &&
                  comment.body?.split(" ").slice(0, 5).join(" ") + "..."}
              </DataTable.Cell>

              <DataTable.Cell>
                {!netError && (
                  <View style={styles.actionButton}>
                    <MaterialCommunityIcons
                      name="comment-edit"
                      size={30}
                      color="lightblue"
                    />
                    <MaterialCommunityIcons
                      name="comment-remove"
                      size={30}
                      color="red"
                    />
                  </View>
                )}
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(
            dashboardState.comments.length / numberOfItemsPerPage
          )}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${dashboardState.comments.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
};

export default CommentsScreen;

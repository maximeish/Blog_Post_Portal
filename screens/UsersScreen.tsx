import * as React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { View } from "../components/Themed";
import { DataTable, ActivityIndicator, Button, Text } from "react-native-paper";
import { SectionList, Alert } from "react-native";

import { DashboardContext } from "../context/DashboardContext";
import { FontAwesome5, AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "../shared/styles/tableStyles";

const UsersScreen = () => {
  useEffect(() => {
    (async () =>
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((users) => {
          setDashboardState({ ...dashboardState, users: users.data });
          setFetching(false);
        })
        .catch((e) => {
          console.log(e);
          setNetError(true);
          setDashboardState({
            ...dashboardState,
            users: [{ id: "Error" }],
          });
          setFetching(false);
        }))();
  }, []);

  const numberOfItemsPerPageList = [4, 5, 6];
  const [isFetching, setFetching] = useState(true);
  const [isUserSelected, setUserSelected] = useState(false);
  const [netError, setNetError] = useState(false);
  const { dashboardState, setDashboardState } = useContext(DashboardContext);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    dashboardState.users.length
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const updateUser = () => {};

  const deleteUser = (userId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        alertUserDeleted();
        setFetching(true);

        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((users) => {
            setDashboardState({ ...dashboardState, users: users.data });
            setFetching(false);
          })
          .catch((e) => {
            console.log(e);
            setNetError(true);
            setDashboardState({
              ...dashboardState,
              users: [{ id: "Error" }],
            });
            setFetching(false);
          });
      })
      .catch((e) => console.log(e));
  };

  const selectSingleUser = (userId) => {
    setFetching(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((user) => {
        setDashboardState({ ...dashboardState, selectedUser: user.data });
        setFetching(false);
        setUserSelected(true);
      })
      .catch((e) => console.log(e));
  };

  const closeUserInfoView = () => setUserSelected(false);

  const alertUserDeleted = () =>
    Alert.alert("Status", "User deleted", [], { cancelable: true });

  return (
    <View style={styles.container}>
      {isUserSelected ? (
        <View
          style={{
            display: isUserSelected ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          <Text>User ID: {dashboardState.selectedUser.id}</Text>
          <Text>Name: {dashboardState.selectedUser.name}</Text>
          <Text>Username: {dashboardState.selectedUser.username}</Text>
          <Text>Email: {dashboardState.selectedUser.email}</Text>
          <Text>
            <SectionList
              sections={[
                {
                  id: dashboardState.selectedUser.id,
                  title: "Address",
                  data: [
                    `Street: ${dashboardState.selectedUser.address?.street}`,
                    `Suite: ${dashboardState.selectedUser.address?.suite}`,
                    `City: ${dashboardState.selectedUser.address?.city}`,
                    `Zipcode: ${dashboardState.selectedUser.address?.zipcode}`,
                    `Geo: ${dashboardState.selectedUser.address?.geo.lat} (lat), ${dashboardState.selectedUser.address?.geo.lng} (lng)`,
                  ],
                },
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </Text>

          <Button
            style={styles.closeInfoView}
            icon="close"
            mode="contained"
            onPress={() => closeUserInfoView()}
          >
            Back
          </Button>
        </View>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Phone</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          {isFetching ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              animating={true}
            ></ActivityIndicator>
          ) : (
            dashboardState.users.map((user, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell onPress={() => selectSingleUser(user.id)}>
                  {user.id}
                </DataTable.Cell>
                <DataTable.Cell onPress={() => selectSingleUser(user.id)}>
                  {user.name}
                </DataTable.Cell>
                <DataTable.Cell onPress={() => selectSingleUser(user.id)}>
                  {user.phone}
                </DataTable.Cell>

                <DataTable.Cell>
                  {!netError && (
                    <View style={styles.actionButton}>
                      <FontAwesome5
                        name="user-edit"
                        size={30}
                        color="lightblue"
                      />

                      <AntDesign
                        onPress={() => deleteUser(user.id)}
                        name="deleteuser"
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
              dashboardState.users.length / numberOfItemsPerPage
            )}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${dashboardState.users.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      )}
    </View>
  );
};

export default UsersScreen;

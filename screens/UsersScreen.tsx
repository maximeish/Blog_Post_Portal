import * as React from "react";
import { useContext } from "react";

import { View } from "../components/Themed";
import { DataTable } from "react-native-paper";

import { DashboardContext } from "../context/DashboardContext";
import { Button } from "@material-ui/core";
import { FontAwesome5, AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "../shared/styles/tableStyles";

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: "Page 1",
  },
  {
    key: 2,
    name: "Page 2",
  },
  {
    key: 3,
    name: "Page 3",
  },
];

const UsersScreen = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const { dashboardState, setDashboardState } = useContext(DashboardContext);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="ascending">UserId</DataTable.Title>
          <DataTable.Title sortDirection="ascending">Name</DataTable.Title>
          <DataTable.Title sortDirection="ascending">Phone</DataTable.Title>
          <DataTable.Title numeric={false}>Actions</DataTable.Title>
        </DataTable.Header>

        {dashboardState.users.map((user, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{user.userId}</DataTable.Cell>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell>{user.phone}</DataTable.Cell>

            <DataTable.Cell>
              <FontAwesome5
                style={styles.actionButton}
                name="user-edit"
                size={15}
                color="lightblue"
              />

              <AntDesign
                style={styles.actionButton}
                name="deleteuser"
                size={15}
                color="red"
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>

      <Button>
        <Ionicons name="person-add" size={36} color="lightgreen" />
      </Button>
    </View>
  );
};

export default UsersScreen;

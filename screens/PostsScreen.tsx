import * as React from "react";
import { useContext } from "react";

import { View } from "../components/Themed";
import { DataTable } from "react-native-paper";

import { DashboardContext } from "../context/DashboardContext";
import Button from "@material-ui/core/Button";
import { Foundation, MaterialIcons } from "@expo/vector-icons";
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

const PostsScreen = () => {
  const { dashboardState, setDashboardState } = useContext(DashboardContext);
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="ascending">PostId</DataTable.Title>
          <DataTable.Title sortDirection="ascending">Title</DataTable.Title>
          <DataTable.Title sortDirection="ascending">Body</DataTable.Title>
          <DataTable.Title numeric={false}>Actions</DataTable.Title>
        </DataTable.Header>

        {dashboardState.posts.map((post) => (
          <DataTable.Row key={post.postId}>
            <DataTable.Cell>{post.postId}</DataTable.Cell>
            <DataTable.Cell>{post.title}</DataTable.Cell>
            <DataTable.Cell>
              {post.body?.split(" ").slice(0, 5).join(" ") + "..."}
            </DataTable.Cell>

            <DataTable.Cell>
              <Foundation
                style={styles.actionButton}
                name="page-edit"
                size={15}
                color="lightblue"
              />
              <Foundation
                style={styles.actionButton}
                name="page-delete"
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
        <MaterialIcons name="post-add" size={36} color="lightgreen" />
      </Button>
    </View>
  );
};

export default PostsScreen;

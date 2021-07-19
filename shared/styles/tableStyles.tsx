import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#000",
    padding: "1em 0.5em",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  addButton: {
    alignSelf: "flex-start",
    marginLeft: "1em",
  },
  actionButton: {
    marginLeft: "1.5em",
  },
});

export default styles;

import React, { useState, createContext } from "react";

const dashboardStore = {
  users: [
    { userId: 1, name: "Test user", phone: "250788112345" },
    { userId: 2, name: "Test user2", phone: "2507881123243" },
  ],
  posts: [
    {
      postId: 1,
      title: "Test post",
      body: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      postId: 2,
      title: "Test post2",
      body: "Lorem ipsum dolor sit consectetur",
    },
  ],
  comments: [
    {
      commentId: 1,
      commenterName: "Eric",
      commenterEmail: "eric@name",
      body: "This is a test comment",
    },
    {
      commentId: 2,
      commenterName: "Eric2",
      commenterEmail: "eric2@name",
      body: "This is a test comment2",
    },
  ],
  selectedUser: null,
  selectedPost: null,
  selectedComment: null,
};

export const DashboardContext = createContext(dashboardStore);

const DashboardContextWrapper = (props) => {
  const [dashboardState, setDashboardState] = useState(dashboardStore);

  return (
    <DashboardContext.Provider value={{ dashboardState, setDashboardState }}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextWrapper;

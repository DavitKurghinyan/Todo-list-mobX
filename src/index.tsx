import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import TodoList from "./components/TodoList";
import CssBaseline from "@material-ui/core/CssBaseline";

const StyledApp = styled.div`
  background-color: #f4f6f8;
  height: 100vh;
  padding: 1rem;
`;

function App() {
  return (
    <StyledApp>
      <CssBaseline />
      <TodoList />
    </StyledApp>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

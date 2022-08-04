import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TodoItem from '../TodoItem';
import { StyledTodoList, StyledHeader, Container, CheckAllBlock } from './styles';
import { Button, Checkbox, TextField } from '@material-ui/core';
import ModalNewTodo from '../ModalNewTodo';
import { useStores } from '../../use-stores';

const TodoList = observer(() => {
  const [modalNewTodoIsOpen, setModalNewTodo] = useState(false);
  const { todoStore } = useStores();

  return (
    <>
      {modalNewTodoIsOpen && (
        <ModalNewTodo
          isOpen={modalNewTodoIsOpen}
          closeModal={() => setModalNewTodo(false)}
        />
      )}
      <Container>
        <StyledHeader>
          <TextField
            style={{ marginRight: 10 }}
            placeholder={'...search'}
            onChange={(ev) => todoStore.searchTodo(ev.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModalNewTodo(true)}
          >
            Add new
          </Button>

        </StyledHeader>
        <StyledTodoList>
          {todoStore.incompleteTodos.length === 0 && <p>Nothing to do!</p>}
          {todoStore.incompleteTodos.map(todo => {
            return <TodoItem key={todo.id} todo={todo}/>;
          })}
        </StyledTodoList>

        <h3>Done {todoStore.todoProgress}</h3>
        <StyledTodoList>
          {todoStore.completedTodos.map(todo => {
            return <TodoItem key={todo.id} todo={todo}/>;
          })}
        </StyledTodoList>
        {!!todoStore.incompleteTodos.length &&
          <CheckAllBlock>
            <Checkbox
              checked={todoStore.incompleteTodos.length === 0}
              onChange={todoStore.toggleCompletedAll}
            />
            Done All
          </CheckAllBlock>
        }
      </Container>
    </>
  );
});

export default TodoList;

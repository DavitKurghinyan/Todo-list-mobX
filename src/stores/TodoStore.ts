import { computed, decorate, observable } from 'mobx';
import { toast } from 'react-toastify';

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  public todos: ITodo[] = [
    { id: 1, text: 'todo 1', completed: true },
    { id: 2, text: 'todo 2', completed: false },
    { id: 3, text: 'todo 3', completed: false }
  ];

  public filteredTodos: ITodo[] = [
    { id: 1, text: 'todo 1', completed: true },
    { id: 2, text: 'todo 2', completed: false },
    { id: 3, text: 'todo 3', completed: false }
  ];

  public addTodo = (todo: ITodo) => {
    this.todos.push(todo);
    this.filteredTodos.push(todo);
    toast.success('New Todo added', {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  public toggleCompleted = (id: number) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.filteredTodos = this.todos
  };

  public toggleCompletedAll = () => {
    const isAllCompleted = this.todos.every(todo => todo.completed);
    if (isAllCompleted) {
      this.todos = this.todos.map(todo => {
        todo.completed = false;
        return todo;
      });
    } else {
      this.todos = this.todos.map(todo => {
        todo.completed = true;
        return todo;
      });
    }
    this.filteredTodos = this.todos
  };

  public updateTodo = (updatedTodo: ITodo) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return { ...updatedTodo };
      }
      return todo;
    });
    this.filteredTodos = this.todos
  };

  public deleteTodo = (id: number) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
    toast.info('Todo deleted', {
      position: toast.POSITION.BOTTOM_CENTER
    });
    this.filteredTodos = this.todos
  };

  public searchTodo = (text: string) => {
      setTimeout(()=>{
        if (text.trim()) {
          this.filteredTodos = this.todos.filter(todo => todo.text.startsWith(text));
        }else{
          this.filteredTodos = this.todos
        }
      }, 800)
  };

  get todoProgress() {
    const completedCount = this.filteredTodos.filter(t => t.completed).length;
    const totalCount = this.filteredTodos.length;
    return `${completedCount} / ${totalCount}`;
  }

  get completedTodos() {
    return this.filteredTodos.filter(todo => todo.completed);
  }

  get incompleteTodos() {
    return this.filteredTodos.filter(todo => !todo.completed);
  }
}

decorate(TodoStore, {
  todos: observable,
  filteredTodos: observable,
  todoProgress: computed,
  completedTodos: computed,
  incompleteTodos: computed
});

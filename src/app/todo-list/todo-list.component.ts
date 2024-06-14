import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { addTodo, loadTodos, updateTodo } from "../store/todo.action";
import { Todo } from "../model/todo.model";
import { AppState } from "../store/store";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  isLoading$: Observable<boolean>;
  
  constructor(private store: Store<AppState>) {
    this.todos$ = this.store.select(state=>state.todo.todos); // Assuming 'todos' is your state slice name
    this.isLoading$ = this.store.select(state => state.todo.loading);
    this.loadTodos();
  }
  
  loadTodos() {
    this.store.dispatch(loadTodos());
  }
  
  addTodo(index: number) {
    const todo: Todo = { id: index, description: 'New Todo', completed: false };
    this.store.dispatch(addTodo({ todo }));
  }
  
  complete(todo: Todo) {
    this.store.dispatch(updateTodo({ todo: { ...todo, completed: true } }));
  }
}

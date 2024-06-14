import { Action, ActionReducer } from "@ngrx/store";
import { TodoEffects } from "./todo.effects";
import { TodoState, todoReducer } from "./todo.reducer";


export interface AppState {
    todo: TodoState
  }
  
  export interface AppStore {
    todo: ActionReducer<TodoState, Action>;
  }
  
  export const appStore: AppStore = {
    todo: todoReducer
  }
  
  export const appEffects = [TodoEffects];
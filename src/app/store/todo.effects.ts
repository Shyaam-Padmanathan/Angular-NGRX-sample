import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects"; // Import createEffect and Actions
import { loadTodos, loadTodosFailure, loadTodosSuccess } from "./todo.action";
import { ToDoService } from "../services/todo.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) =>
            of(loadTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private todoService: ToDoService) {}
}

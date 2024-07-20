import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dataChangedSubject: Subject<void> = new Subject<void>();
  dataChanged$: Observable<void> = this.dataChangedSubject.asObservable();

  constructor(private http: HttpClient) { }

  apiUrl: string = `${environment.apiUrl}/task`;

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  add(task: Task): Observable<void> {
    return this.http.post<void>(this.apiUrl, task).pipe(
      tap(() => {
        this.dataChangedSubject.next();
      })
    );
  }

  update(id: string, newTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, newTask).pipe(
      tap(() => {
        this.dataChangedSubject.next();
      })
    );
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.dataChangedSubject.next();
      })
    );
  }
}

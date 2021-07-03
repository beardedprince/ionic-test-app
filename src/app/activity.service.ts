import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from './utils/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url = 'https://orangevalleycaa.org/api/videos';
  constructor(
    private http: HttpClient
  ) { }

  getActivity(id: string): Observable<Activity> {
    return this.http.get<Activity>(this.url+/id/+`${id}`)
  }
  
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url)

  }
}

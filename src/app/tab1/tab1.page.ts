import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityService } from '../activity.service';
import { Activity } from '../utils/activity';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  activitiesList: Observable<Activity[]>;
  activities: any;

  constructor(
    private activity: ActivityService
  ) {}

  ngOnInit() {
    this.getAllVideos();
  }

  getAllVideos() {
    this.activitiesList = this.activity.getAllActivities();
    setTimeout(() => {
      
    }, 3000);

    

    this.activity.getAllActivities().subscribe((res) => {
      if (res) {
        console.log(res)
        this.activities = res;
      }
    });
  
  }

  doRefresh(e) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getAllVideos();
      e.target.complete();
    }, 2000);
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivityVideoPageModule } from '../activity-video/activity-video.module';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { ActivityService } from '../activity.service';
import { Activity } from '../utils/activity';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  activityid: any;
  // activityDetail: any;
  activityDetail: Observable<Activity>;
  activitydetail: any;;

  constructor(
    private route: ActivatedRoute,
    private activity: ActivityService,
    private modalControl: ModalController,
    private social: SocialSharing,
    private agAuth: AngularFireAuth,
    private agStore: AngularFirestore,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.activityid = this.route.snapshot.params.id;
    this.getActivityByid();
  }

  getActivityByid() {
    this.activityDetail = this.activity.getActivity(this.activityid);
    // console.log(this.activityDetail)
    this.activity.getActivity(this.activityid).subscribe((res) => {
      if (res) {
        // console.log(res)
        this.activitydetail = res;

      }
    });
  }

   async openModal() {

     const  videoModal =  await this.modalControl.create({
       component: ActivityVideoPage
     });

     return await this.activityDetail.subscribe((res) => {
      //  console.log(res)
      videoModal.componentProps = {
        videoURL: res.video_url
      };
      return  videoModal.present();
     });
   }

   shareDetail() {
    this.activityDetail.subscribe(res => {
      this.social.share('Look what i found on my app', res.name, '', res.cropped );
    });
   }

   addToFavourite() {
    this.activityDetail.subscribe(async result => {
      this.agStore.collection('favourite')
      .doc((await this.agAuth.currentUser).uid)
      .collection('favourite', (ref) => ref.where('id', '==', result.id))
      .get()
      .subscribe(async (doc) => {
        if (doc.empty) {
          this.agStore.collection('favourite')
          .doc((await this.agAuth.currentUser).uid)
          .collection('favourite')
          .add(result);
          const toast = await this.toast.create({
            message: 'Movie added to your favourite.',
            duration: 2000
          });
          toast.present();
        }
      });
    });
   }

}

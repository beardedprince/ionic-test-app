import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  favouriteList: Observable<any>;
  myStoredProfileImage: Observable<any>;

  constructor(
    private agFireStore: AngularFirestore,
    private agAuth: AngularFireAuth
  ) {}

  async ngOnInit() {
    this.favouriteList = this.agFireStore
    .collection('favourite')
    .doc((await this.agAuth.currentUser).uid)
    .collection('favourite')
    .valueChanges();

    // this.myStoredProfileImage.subscribe((res) => {
    //   // this.myProfileImage = res.imgSrc;
    //   console.log('iamehe', res);

    // });
  }

}

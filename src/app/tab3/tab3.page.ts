import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {CameraOptions, Camera} from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  myProfileImage: string;
  myStoredProfileImage: Observable<any>;

  constructor(
    private camera: Camera,
    private alert: AlertController,
    private agFireStore: AngularFirestore,
    private agAuth: AngularFireAuth
  ) {
  
  }

  ngOnInit() {
    this.getImage();
  }

  async getImage() {
    this.myStoredProfileImage = this.agFireStore
    .collection('users')
    .doc((await this.agAuth.currentUser).uid)
    .valueChanges();

    this.myStoredProfileImage.subscribe((res) => {
      this.myProfileImage = res.imgSrc;
      console.log('iamehe', res);

    });
  }


  async uploadPic() {
    const cameraOption: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    const galleryOption: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    const alert = await this.alert.create({
      header: 'Select Image',
      message: 'Select a soource for your profile Image',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.getPicture(cameraOption)
            .then(async (imageData) => {
              // this.myProfileImage = 'data:image/jpeg:base64,' + imageData;
              const image = 'data:image/jpeg:base64,' + imageData;
              this.agFireStore
              .collection('users')
              .doc((await this.agAuth.currentUser).uid)
              .set({
                imgSrc: image
              });
            });
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.camera.getPicture(galleryOption)
            .then(async (imageData) => {
              // this.myProfileImage = 'data:image/jpeg:base64,' + imageData;
              const image = 'data:image/jpeg:base64,' + imageData;
              this.agFireStore
              .collection('users')
              .doc((await this.agAuth.currentUser).uid)
              .set({
                imgSrc: image
              });
            });

          }
        }

      ]
    });
    await alert.present();

  }

}

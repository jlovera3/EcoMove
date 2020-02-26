import { Component } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../model/User';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DomSanitizer , SafeUrl } from '@angular/platform-browser';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  public misaludo: string;
  imageUrl: string="https://helpiewp.com/wp-content/uploads/2017/12/user-roles-wordpress.png";
  constructor(private translate: TranslateService, private local: NativeStorage,
     private camera: Camera, private photoLibrary: PhotoLibrary) {
      }

  ngOnInit() {
    //this.user.imageUrl="https://helpiewp.com/wp-content/uploads/2017/12/user-roles-wordpress.png";
    //this.user = this.auth.getUser();
    this.onViewDidEnter();
  }

  async onViewDidEnter() {
    console.log("Entra en home")
    this.translate.get('hello')
      .subscribe(value => {
        this.misaludo = value;
      })
  }

  public openGallery() {
    console.log("galeria");

    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function (libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
            this.imageUrl=this.library.getPhotoURL();
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
      .catch(err => console.log('permissions weren\'t granted'));

  }

  public openCamera() {
    console.log("camara")
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

     this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData);
      console.log(base64Image);
      this.local.setItem('image', base64Image);
      this.imageUrl = base64Image;//this.getFileEntry(imageData);
      //this.auth.saveSession();
    }, (err) => {
      // Handle error
    });
  }
  /*getFileEntry(imgUri): string{
    let myUrl:string;
    <any>window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
        console.log("got file: " + fileEntry.fullPath);
        console.log('cdvfile URI: ' + fileEntry.toInternalURL());
        this.myUrl=fileEntry.toInternalURL();
    });
    return myUrl;
  }*/

  public cambioIngles() {
    this.translate.use('en')
  }
  public cambioEspanol() {
    this.translate.use('es')
  }

  /*public logout() {
    this.auth.logout();
  }*/

}

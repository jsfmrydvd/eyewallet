import { Component, OnInit, ViewChild} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
    @ViewChild('username') username;
    @ViewChild('number') number;
    @ViewChild('cpnumber') cpnumber;
    @ViewChild('cpusername') cpusername;

  constructor(private nativeStorage: NativeStorage,
        private router: Router,
        public alertController: AlertController) { }

  ngOnInit() {
  }
  goBack() {
      this.router.navigate(['/user'])
  }
  async saveUser() {
       this.nativeStorage.setItem('username', this.username.value).then(() => {
           console.log('Stored item!' + this.username.value)
       }).catch((err) => {
           // alert(JSON.stringify(err));
       });
       this.nativeStorage.setItem('number', this.number.value).then(() => {
           console.log('Stored item!' + this.number.value)
       }).catch((err) => {
           // alert(JSON.stringify(err));
       });
       this.nativeStorage.setItem('cpusername',  this.cpusername.value).then(() => {
           console.log('Stored item!' + this. cpusername.value)
       }).catch((err) => {
           // alert(err);
       });
       this.nativeStorage.setItem('cpnumber',  this.cpnumber.value).then(() => {
           console.log('Stored item!' + this.cpnumber.value)
       }).catch((err) => {
           // alert(err);
       });
       if(this.username.value != "" && this.number.value != "" &&
       this.cpusername.value != "" && this.cpnumber.value != "") {
           const alert = await this.alertController.create({
                header: 'Success',
                // subHeader: 'Subtitle',
                message: 'Details updated.',
                buttons: ['OK']

              });
              await alert.present();
              this.router.navigate(['/user'])
       } else {
           const alert = await this.alertController.create({
                header: 'Error',
                // subHeader: 'Subtitle',
                message: 'Please fill out the empty fields.',
                buttons: ['OK']
              });
              await alert.present();
       }

   }
}

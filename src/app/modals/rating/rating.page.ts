import { Component, AfterViewInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements AfterViewInit  {
  modalReady = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;

  constructor(private modalCtrl: ModalController,  private toastCtrl: ToastController) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
  countStar(star) {
    this.selectedValue = star;
  }

  addClass(star) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      document.getElementById(ab).classList.add("selected");
    }
  }
  removeClass(star) {
    let ab = "";
    for (let i = star-1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("selected");
    }
  }

  send() {  
    if(this.selectedValue == 0)
      this.showToast("Bitte eine Bewerung abgeben!")
    else
      this.modalCtrl.dismiss({rating: this.selectedValue})
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

}

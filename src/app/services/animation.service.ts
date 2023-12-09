import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(private alertController : AlertController) { }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
      buttons: [
        {
          text: 'OK',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
    });
    alert.present();
  }


  async decisionAlert(header: string, message: string, e:Function) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
      buttons: [
        {
          text: 'No',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
        {
          text: 'Yes',
          handler: () => {
            e()
          }
        },
      ],
    });
    alert.present();
  }
  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Ads } from '../models/Ads';
import { AuthService } from '../services/auth/auth.service';
import { categories } from '../data/Category';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AnimationService } from '../services/animation.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.page.html',
  styleUrls: ['./ad-details.page.scss'],
})
export class AdDetailsPage implements OnInit {

  titleAds: any = "";
  ad!: Ads;
  isOwner: boolean = false;

  @ViewChild(IonModal) modal!: IonModal;
  data: Ads = {
    title: "",
    img: "",
    description: "",
    owner: "",
    category: "",
    created_at: new Date().toLocaleDateString()
  };
  catgs = categories;
  isModalOpen: boolean = false;
  idCollection: any;
  constructor(private route: ActivatedRoute, private adService: AdsService, private authService: AuthService,
              private alertController: AlertController,
              private animationService: AnimationService, private location: Location) { }

  ngOnInit() {
    this.titleAds = this.route.snapshot.paramMap.get('title');
    console.log(this.titleAds);
    
    this.getAdByTitle(this.titleAds);
    this.getIDCollection();
    
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  getAdByTitle(title: string) {
    this.adService.getAdByTitle(title).valueChanges().subscribe(
      (s) => {
        console.log(s);
        this.ad = s[0];
        if (this.ad.owner == this.authService.Owner()) this.isOwner = true;
      }, (e) => {
        console.log(e);
        
      }
    );
  }

  edit() {
    this.data = this.ad;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    
    this.onupdate(this.data)
    // this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  // update function
  onupdate(data: Ads) {
    console.log(data);
    this.adService.updateAd(data).then(
      (s) => {
        // alert de success
        this.cancel();

      }, (e) => {
        this.animationService.showAlert("Error in saving !", "Please verify your ad !");
      }
    )
  }


  async getIDCollection() {
    this.adService.getAds().get().subscribe(
      (s) => {
        console.log(s);
        s.forEach((doc: any) => {
          if (doc.data().title === this.ad.title) {
            // transfer to delete function
            console.log(doc.id);
            this.idCollection = doc.id;            
          }       
        });
      }, (e) => {
        console.log(e);
        
      }
    );
  }


  async decisionAlert(header: string, message: string) {
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
            this.delete()
          }
        },
      ],
    });
    alert.present();
  }

  delete() {
    console.log(this.idCollection);
    
    this.adService.deleteAd(this.idCollection).then(
      (s) => {
        this.location.back();
      }, (e) => {
        this.animationService.showAlert("Error in saving !", "An error is occured. !");
      }
    )
  }

  deleteAd() {
    console.log(this.idCollection);
    
    this.decisionAlert("Deleting Ad", "Are you sure to do this action ?");    
    
  }
}

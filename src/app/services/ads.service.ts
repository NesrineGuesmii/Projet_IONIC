import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Ads } from '../models/Ads';


@Injectable({
  providedIn: 'root'
})
export class AdsService {
  adsrRef!:  AngularFirestoreCollection<Ads>;
  private dbPath = '/ads';
  
    constructor(private db: AngularFirestore) {
      this.adsrRef = db.collection(this.dbPath);
     }


     getAds() {
      return this.adsrRef;
     }
}

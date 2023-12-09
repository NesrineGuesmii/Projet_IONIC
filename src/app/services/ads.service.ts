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

     setAds(data: Ads) {
      return this.adsrRef.add(data) //.push(data);
     }

     getAdsByEmail(email: string) {
      return this.db.collection<any>('ads', ref =>
        ref.where('owner', '==', email));
     }

     getAdByTitle(title: string) {
      return this.db.collection<any>('ads', ref =>
        ref.where('title', "==", title));
     }

     updateAd(data: Ads) {
      return this.adsrRef.doc(this.dbPath).update(data);
     }

     deleteAd(idCollection: any) {      
      return this.adsrRef.doc(idCollection).delete();
     }
}

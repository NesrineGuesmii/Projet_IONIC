import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userRef!:  AngularFirestoreCollection<User>;
private dbPath = '/users';

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
   }


  getAll(): AngularFirestoreCollection<any> {
    return this.userRef;
  }

  create(user: User): any {
    return this.userRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}

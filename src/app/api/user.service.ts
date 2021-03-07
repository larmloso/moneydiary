import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  info: any;
  income: any;
  expenditure: any;
  expenditureall: any;
  incomeall: any;

  constructor(private fs: AngularFirestore) { }


    //read
    readData() {
        return this.fs.collection('listinfo').snapshotChanges();
    }

    //delete
    delData(docId: any) {
        return this.fs.doc('listinfo/' + docId).delete();

    }

    createData(tmpdoc: any) {
        return this.fs.collection('listinfo').add(tmpdoc);
    }


    updateData(docId: any, tmpdoc: any) {
        return this.fs.doc('listinfo/' + docId).update(tmpdoc);
    }

    // gethistory() {
    //   const a = this.fs.collection('history').snapshotChanges();
    //   //console.log(a.subscribe());
    //   a.subscribe(data => {
    //     data.map(e => {
    //       console.log(e.payload.doc.id);
    //     })
    //   })

    // }

}

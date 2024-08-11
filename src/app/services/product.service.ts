import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';

import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore:AngularFirestore,private storage:AngularFireStorage) { }

  uploadFile(data:any):Promise<string>{
    const filePath = `products/${Math.floor(Math.random()+101)}_${data.name}`;
    const fileRef = this.storage.ref(filePath);
    /* this.storage.upload(filePath, data).then(task=>{
      task.ref.getDownloadURL().then(url=>{
        console.log(url);
      })
    }).catch(err=>{
      console.log(err);
    }) */

    const uploadTask = this.storage.upload(filePath, data);
    return new Promise<string>((resolve, reject)=>{
      uploadTask.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(url=>{
            resolve(url);
          }, error=>{
            reject(error);
          })
        })
      ).subscribe();
    });

  }

  createProduct(obj:any):Promise<any>{
    return this.firestore.collection('products').add(obj);
  }

  loadAll():Observable<DocumentChangeAction<any>[]>{
    return this.firestore.collection('products').snapshotChanges();
  }

  

}

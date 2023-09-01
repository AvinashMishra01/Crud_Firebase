import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CrudHttpService {

  constructor(public http: HttpClient, public firabasedatabase: AngularFireDatabase) {}

//  httpUrl='https://crud-81adb-default-rtdb.firebaseio.com/'
 httpUrl='https://crudoperation-11e7e-default-rtdb.firebaseio.com/'

 async getUser()
 {
   let resp=this.http.get(this.httpUrl+'main_emp.json').toPromise().then((data)=>{
    return data
   })
   return resp
 }

async saveMainEmp(obj){
  let resp= this.http.post(this.httpUrl+'main_emp.json', obj).toPromise().then((res)=>{
    return res;
  })
  return resp;
}

async save_R_Emp(objList) {
  const promises = objList.map(obj => {
    return this.http.post(`${this.httpUrl}r_emp.json`, obj).toPromise();
  });

  try {
    const responses = await Promise.all(promises);
    return responses; // Returns an array of responses from the POST requests
  } catch (error) {
    throw error; // Handle the error if any of the requests fail
  }
}


async updateData(obj, id) {
  console.log("this is the path ", `${this.httpUrl}main_emp/${id}.json`); // Make sure to add .json at the end
  let resp = this.http.put(`${this.httpUrl}main_emp/${id}.json`, obj).toPromise().then((res) => {
    return res;
  });
  return resp;
}


}

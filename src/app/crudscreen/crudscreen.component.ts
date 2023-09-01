import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud-http.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
// import { bootstrapApplication } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any
declare var bootstrap: any

@Component({
  selector: 'app-crudscreen',
  templateUrl: './crudscreen.component.html',
  styleUrls: ['./crudscreen.component.css']
})
export class CrudscreenComponent implements OnInit {

constructor(public service:CrudHttpService, public spinner:NgxSpinnerService){}
data;
m_emp_data={}
m_emp_dataArr=[]

r_emp_dataArr=[];
 r_emp_data= {}


displayedColumns1: string[] = ['sr', 'name', 'mo_no', 'email', 'gst', 'pan','city','code','state', 'act'];
displayedColumns: string[] = ['sr', 'name', 'mo_no', 'email', 'dep', 'des'];
dataSource;
dataSource1;

dataarr=[]

updateIs=false;
data_id=[]
operation_id;

// validataion var
spanAvi=false;

async ngOnInit() {

  await this.getData()

const arrayOfObj = Object.entries(this.data).map((e) => ( { [e[0]]: e[1] } ));
console.log('this is the data ', arrayOfObj)
for(let i of arrayOfObj)
{
  console.log(i)
  this.data_id.push(Object.keys(i))
  console.log(Object.keys(i), Object.values(i))
}


}
async openAddUpdateScreen(){
  this.m_emp_data={}
  this.spanAvi=false
  this.updateIs=false;

}


async getData()
{
  this.spinner.show();
  this.data= await this.service.getUser()
  console.log(" this is the data ",this.data);

  this.m_emp_dataArr= Object.values(this.data)
// console.log(Object.values(this.data))
this.dataSource1= new MatTableDataSource(this.m_emp_dataArr);
this.spinner.hide();
}




async addOneMore(){

  if( this.r_emp_data['r_mo_no']== undefined ||this.r_emp_data['r_mo_no']== null|| this.r_emp_data['r_mo_no'].length!=10)
  {
    Swal.fire('Info', "Mobile No Less Then 10 Digits", 'info');
    return;
  }

  this.r_emp_dataArr.push(this.r_emp_data)
  console.log("this is the add data ", this.r_emp_dataArr);
  this.dataSource= new MatTableDataSource(this.r_emp_dataArr);
   this.r_emp_data={}
}
async cancelData()
{
   this.r_emp_data={}
}
async cancelData1()
{
   this.m_emp_data={}
}

async deleteOne()
{
  this.r_emp_dataArr.pop();
}


async saveData(){
 if(this.checkvalidation('saveData1'))
 {
   return;
 }
  this.spinner.show();
  console.log("this is the r_emo_data", this.m_emp_data);
 let resp= await this.service.saveMainEmp(this.m_emp_data);
 console.log("this is the resp", resp)
 if(resp['name']!=undefined && resp['name']!=null)
 {
  await this.save_R_empdata(resp['name'])

 }
 else{

 }

}

async save_R_empdata(id)
{
    this.r_emp_dataArr=this.r_emp_dataArr.map((item)=>{
      item['main_id_p']=id
      return item
    })
    console.log('this is the r emp dat ', this.r_emp_dataArr);
    try {
      const responses = await this.service.save_R_Emp(this.r_emp_dataArr);
      console.log('Responses:', responses);
      Swal.fire('Success', "Data Save Successfully", 'success');
      this.m_emp_data={};
      // this.r_emp_data={}
      this.r_emp_dataArr=[]
      this.spinner.hide();
      this.dataSource=new MatTableDataSource( this.r_emp_dataArr)
      this.dataSource1= new MatTableDataSource(this.m_emp_dataArr);
    } catch (error) {
      this.spinner.hide();
      console.error('Error:', error);
    }
}




async openUpdate(element, index)
{

  this.updateIs=true;
  this.m_emp_data=element
await this.checkEmail(this.m_emp_data['email'])
if(this.checkvalidation('updateData'))
{
  // return;
  console.log('Some valid not pass')
}
  $('#pills-add-tab').tab('show');
   this.operation_id=this.data_id[index]
console.log('this is the data ', element, index, this.operation_id)


}
async updateData()
{
  if(this.checkvalidation('updateData'))
{
  return
}

this.spinner.hide();
  let resp=await this.service.updateData(this.m_emp_data, this.operation_id)
  console.log('this si update resp ', resp);
  if(resp['add']!=undefined && resp['add']!=null)
  {
    Swal.fire("Success", 'Data Update Successfully', 'success');
    this.m_emp_data={}
    $('#pills-home-tab').tab('show');
  }else{
    this.spinner.hide()
  }

}


checkEmail(obj:any)
{
let c=0;
let e=0;
  let d=obj.split('.');
  if((d!=undefined || d!=null)&&( d[(d.length)-1]=='com'))
  {
    let position= d[0].substring(d[0].length-5);
    if(position=="gmail")
    {
   e=2;
  }
  }
let b=obj.split('');
  b.map((x)=>{
    if(x=="." || x=="@")
      {
      ++c;
      }
        });

        if(c==2 && e==2)
        {

          this.spanAvi=true;
        }

        else{

         this.spanAvi=false;

        }

}


checkvalidation= (data)=>{

if(this.m_emp_data['mo_no']==null || this.m_emp_data['mo_no']==undefined || this.m_emp_data['mo_no']=='' )
{
   Swal.fire("Warning", ' * Fields are required', 'warning')
  return true

}
else if( this.m_emp_data['mo_no'].length!=10)
{
  Swal.fire('Info', "Mobile No Less Then 10 Digits", 'info');
  return true
}

else if(data=='saveData1'){

  if(!(this.r_emp_dataArr.length>=2) ){
    Swal.fire("Warning", 'Please Add At Least Two Contact Person Details ', 'warning');
    return true
 }else{
  return false
 }
}

else{
   return false
}

}


async deleteMessage()
{
  Swal.fire({
    title: 'This feature will be available soon...',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `
  })
}


}

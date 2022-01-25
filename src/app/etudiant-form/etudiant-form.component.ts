
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'app/models/etudiant';
import { Member } from 'app/models/member.model';
import { MemberService } from 'app/services/member-service';
@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {
  showEtd: boolean =true;
  showEns: boolean =false;
  form: any;
  item1: any;
  currentId: any;
 
  
  constructor(private memberService: MemberService,private router: Router,private activatedRoute : ActivatedRoute) { 


    
  }

  ngOnInit() {
    this.currentId=this.activatedRoute.snapshot.params.id;
    
    console.log(this.currentId);
    if(!!this.currentId)
    {
      this.memberService.getMemberById(this.currentId).subscribe(res => {
        console.log('edit sucess!');
        
      //const item=new Etudiant(res.id,res.cin,res.nom,this.form.value.prenom,res.dateInscription,res.cv,res.photo,res.email,res.password,formatDate(res.date,'yyyy-MM-dd','en-US'));
      this.item1=res;  
      //console.log(this.item1);
      console.log("icciiiiiii")
  console.log(this.item1)
        this.initform(res);
   }
      ) 
    }
    else
    this.initform(null);
   

  }

  initform (item : any):void{
  
    this.form=new FormGroup(
      { 
        cin:new FormControl(item?.cin,[Validators.required]),
        nom:new FormControl(item?.nom,[Validators.required]),
        prenom:new FormControl(item?.prenom,[Validators.required]),
        date:new FormControl(item?.date,[Validators.required]),
        cv:new FormControl(item?.cv,[]),
        email:new FormControl(item?.email,[Validators.required]),
        password:new FormControl(item?.password,[Validators.required]),
        photo:new FormControl(item?.photo,[]),
        dateInscription:new FormControl(item?.dateInscription,[Validators.required]),
        diplome:new FormControl(item?.diplome,[Validators.required])
        
        

      }
    )
  }

OnSubmit():void{
  console.log("ggggggggggg")
  console.log(this.form.value.cin);
  //const objectTosub:any=[...this.item1,...this.form.value]
  var objectTosub:Etudiant
  if(!!this.currentId)
  {
    objectTosub = new Etudiant(this.item1.id,this.form.value.cin,this.form.value.nom,this.form.value.prenom,this.form.value.dateInscription,this.form.value.cv,this.form.value.photo,this.form.value.email,this.form.value.password,this.form.value.date)
  }
  else
    objectTosub=this.form.value;
   // const objectTosub:Etudiant = new Etudiant(this.item1.id,this.form.value.cin,this.form.value.nom,this.form.value.prenom,this.form.value.dateInscription,this.form.value.cv,this.form.value.photo,this.form.value.email,this.form.value.password,this.form.value.date)
    console.log(this.item1);

      this.memberService.saveEtudiant(objectTosub).subscribe(res => {
        console.log('Post etd created successfully!');
        this.router.navigate(['./etudiants']);
   })
 


  

    
    
  }
changeTypeMb(e) {
  
 if(e.value == '1'){
  this.showEns=false;
  this.showEtd=true;
 }
 else{
  this.showEtd=false;
  this.showEns=true;
}
}

}

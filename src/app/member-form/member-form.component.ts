import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'app/services/member-service';


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  showEtd: boolean =true;
  showEns: boolean =false;
  form: any;
  item1: any;
  currentId: any;
 
 
  
  constructor(private memberService: MemberService,private router: Router,private activatedRoute : ActivatedRoute) { 


    
  }

  ngOnInit(): void {
    this.currentId=this.activatedRoute.snapshot.params.id;
    
    console.log(this.currentId);
    if(!!this.currentId)
    {
      this.memberService.getMemberById(this.currentId).subscribe(res => {
        console.log('edit sucess!');
        this.item1=res;
        this.initform(this.item1);
   }
      ) 
    }
    else{
      this.initform(null);
    }

  }

  initform (item : any ):void{
    this.form=new FormGroup(
      {
        cin:new FormControl(item?.cin,[Validators.required]),
        nom:new FormControl(item?.nom,[Validators.required]),
        prenom:new FormControl(item?.prenom,[Validators.required]),
        date:new FormControl(item?.date,[Validators.required]),
        cv:new FormControl(item?.cv,[Validators.required]),
        email:new FormControl(item?.email,[Validators.required]),
        password:new FormControl(item?.password,[Validators.required]),
        //photo:new FormControl(item?.photo,[]),
        dateInscription:new FormControl(item?.dateInscription,[]),
        diplome:new FormControl(item?.diplome,[]),
        grade:new FormControl(item?.grade,[]),
        etablissement:new FormControl(item?.etablissement,[]),

      }
    )
  }

OnSubmit():void{
    console.log(this.form.value);
    if(this.showEtd==true){
      this.memberService.saveEtudiant(this.form.value).subscribe(res => {
        console.log('Post etd created successfully!');
        this.router.navigate(['./members']);
   })
 }

    
    else {
      this.memberService.saveEnseigant(this.form.value).subscribe(res => {
        console.log('Post ens created successfully!');
        this.router.navigate(['./members']);
      })


    }
  

    
    
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

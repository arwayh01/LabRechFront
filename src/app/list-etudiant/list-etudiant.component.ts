import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MemberService } from 'app/services/member-service';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {
  etudiantList:any;
  constructor(private  MS:MemberService,private dialog:MatDialog,private router: Router) { 
    this.MS.getAllEtudiant().subscribe(data => {
  
    this.etudiantList = data;
  setTimeout(()=>{   
    $('#datatableexample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu : [5, 10, 25]
  } );
  }, 1);
        }, error => console.error(error));
}

  ngOnInit(): void {
  }
  deleteEtudiant(id){
    this.MS.deleteMember(id).subscribe((response: any) => {
    for(let i = 0; i < this.etudiantList.length; ++i){
      if (this.etudiantList[i].id === id) {
          this.etudiantList.splice(i,1);
      }
  } 
  }
)
}
}

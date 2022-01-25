import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member-service';
import { Member } from '../models/member.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';





@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  displayedColumns: string[] = ['id','type','cin', 'nom', 'prenom','dateNaissance','cv','photo','email','password'];
  dtOptions: DataTables.Settings = {};

  etudiantList:any;
  static mdialog: MatDialog;
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

   // MemberListComponent.mdialog=dialog;
  
 
  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      ajax: {url:'http://localhost:9000/MEMBRE-SERVICE/members/etudiants',dataSrc:""},
      //{title: 'Photo', data: 'photo'},{data: 'id'},
      columns: [
        {title: 'Id', data:'id'},
        {title: 'Cin', data: 'cin'},
        {title: 'Nom', data: 'nom'},
        {title: 'Prenom', data: 'prenom'},
        {title: 'Date Naissence', data: 'date'},
        {title: 'Cv', data: 'cv'},
        {title: 'Email', data: 'email'},
        {title: 'Date Inscription', data: 'dateInscription'},
        {title: 'Action'},
        {"render": function ( data, type, full, meta ) {
          
           
      
    
          var buttonID =full.id;
          return'<div class="btn-group"><button type="button" id='+buttonID+' routerLink=/edit/'+buttonID+' class="btn btn-info btn-xs dt-view" style="margin-right:16px;"><span class="glyphicon glyphicon-eye-open glyphicon-info-sign" aria-hidden="true"></span>Edit</button><button type="button" (click)='+deleteMember(buttonID)+' id='+buttonID+' class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove glyphicon-trash" aria-hidden="true"></span>Delete</button></div>'}}
      ],
        columnDefs: [
          {
              "searchable": false,
              "orderable": false,
              "targets": 0
          },
          { 
            width: '1%', 
            targets: 0  //la primer columna tendra una anchura del  20% de la tabla
          },
          
          { orderable: false, searchable: false, targets: -1 } //Ultima columna no ordenable para botones
      ], 

      

     
    };}

    /*,
      dom:'Blfrtip',
      buttons: [
        'colvis'
    ],*/
    /*this.MS.getAllMembers().subscribe(
      (result: Member[]) => {
        console.log(result)
        result.forEach(

          element => {
            const pub = new Member(element.id,element.type,element.cin,element.nom,element.prenom,element.dateNaissance,element.cv,element.photo,element.email,element.password);
            this.dataSource.push(pub);
            console.log(this.dataSource)
          }

        );*/
       
        
      
      changeTypeMb(e) {
        //$("#tab").DataTable().destroy();
       if(e.value == '1'){
        $('#tab').DataTable().destroy();
        $("#tab thead").empty();
        $("#tab tbody").empty();
        $("#tab").DataTable({
          destroy: true, // For new version use table.destroy();
          pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
      ajax: {url:'http://localhost:9000/MEMBRE-SERVICE/members/etudiants',dataSrc:""},
     
      //{title: 'Photo', data: 'photo'},{data: 'id'},
      columns: [
        {title: 'Id', data:'id'},
        {title: 'Cin', data: 'cin'},
        {title: 'Nom', data: 'nom'},
        {title: 'Prenom', data: 'prenom'},
        {title: 'Date Naissence', data: 'date'},
        {title: 'Cv', data: 'cv'},
        {title: 'Email', data: 'email'},
        {title: 'Date Inscription', data: 'dateInscription'},
        {title: 'Action'}
      ],
        columnDefs: [
          {
              "searchable": false,
              "orderable": false,
              "targets": 0
          },
          { 
            width: '1%', 
            targets: 0  //la primer columna tendra una anchura del  20% de la tabla
          },
          {
              targets: -1, //-1 es la ultima columna y 0 la primera
              data: null,
              defaultContent: '<div class="btn-group"><button type="button" class="btn btn-info btn-xs dt-view" style="margin-right:16px;"><span class="glyphicon glyphicon-eye-open glyphicon-info-sign" aria-hidden="true"></span>Edit</button><button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove glyphicon-trash" aria-hidden="true"></span>Delete</button></div>'
          },
          { orderable: false, searchable: false, targets: -1 } //Ultima columna no ordenable para botones
      ]

          }).draw();
          console.log('hello Etd')
      
        
       }
       
       else{
         
        // The line above is needed if number of columns change in the Data
        $('#tab').DataTable().destroy();
        $("#tab thead").empty();
        $("#tab tbody").empty();
        $("#tab").DataTable({
          
          destroy: true,
          pagingType: 'full_numbers',
          pageLength: 10,
      autoWidth: true,
      ajax: {url:'http://localhost:9000/MEMBRE-SERVICE/members/enseignantChercheurs',dataSrc:""},
      //{title: 'Photo', data: 'photo'},{data: 'id'},
      columns: [
        {title: 'Id', data:'id'},
        {title: 'Cin', data: 'cin'},
        {title: 'Nom', data: 'nom'},
        {title: 'Prenom', data: 'prenom'},
        {title: 'Date Naissence', data: 'date'},
        {title: 'Cv', data: 'cv'},
        {title: 'Email', data: 'email'},
        {title: 'Grade', data: 'grade'},
        {title: 'Etablissement', data: 'etablissement'},
        {title: 'Action'}
      ],
        columnDefs: [
          {
              "searchable": false,
              "orderable": false,
              "targets": 0
          },
          { 
            width: '1%', 
            targets: 0  //la primer columna tendra una anchura del  20% de la tabla
          },
          {
              targets: -1, //-1 es la ultima columna y 0 la primera
              data: null,
              defaultContent: '<div class="btn-group"><button type="button" class="btn btn-info btn-xs dt-view" style="margin-right:16px;"><span class="glyphicon glyphicon-eye-open glyphicon-info-sign" aria-hidden="true"></span>Edit</button><button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove glyphicon-trash" aria-hidden="true"></span>Delete</button></div>'
          },
          { orderable: false, searchable: false, targets: -1 } //Ultima columna no ordenable para botones
      ]

          }).draw();
          console.log('hello Enseingnt');
       }
       
      }
      
}


function deleteMember(id: any) {
  console.log('Delete !');
  //
  const dialogRef=MemberListComponent.mdialog.open(ConfirmDialogComponent,{});
  
  dialogRef.afterClosed().pipe().subscribe(isDeleteConfirmed =>
    {  
      if(isDeleteConfirmed){this.MS.deleteMember(id).subscribe(res => {
        console.log('Delete successfully!');
        this.router.navigate(['./members']);
  //redirect
  }) 
} 
})
}
  
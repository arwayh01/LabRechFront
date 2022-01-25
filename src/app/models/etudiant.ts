export class Etudiant{
    id:String;
 
    cin:String;
    nom:String;
    prenom:String;
   
    cv:string;
    photo:string;
    email:string;
    password:string;
    dateInscription:Date;
    diplome:String;
  date: string;
   
    constructor(id:String,cin:String,nom:String,prenom:String,dateInscription:Date,cv:string,photo:string,email:string,password:string,date:string) {
        this.id = id;
   
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.dateInscription= dateInscription
        this.cv = cv;
        this.photo = photo;
        this.email = email;
        this.password = password;
        this.date=date;
    
      }
    }
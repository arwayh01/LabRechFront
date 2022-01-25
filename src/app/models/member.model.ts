export class Member{
id:String;
type:String;
cin:String;
nom:String;
prenom:String;
dateNaissance:Date;
cv:string;
photo:string;
email:string;
password:string;
dateInscription:Date;
diplome:String;
etablissement:String;
grade:String;
constructor(id:String,type:String,cin:String,nom:String,prenom:String,dateNaissance:Date,cv:string,photo:string,email:string,password:string) {
    this.id = id;
    this.type = type;
    this.cin = cin;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.cv = cv;
    this.photo = photo;
    this.email = email;
    this.password = password;

  }
}
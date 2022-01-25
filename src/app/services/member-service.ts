import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/member.model'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from 'app/models/etudiant';





@Injectable({
  providedIn: 'root'
})
export class MemberService {
  
  tab:Member[]=[]  

  private apiServer = 'http://localhost:9000/MEMBRE-SERVICE';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      
      
    })
  }

  constructor(private httpClient : HttpClient) {}
  getMemberById(id:any): Observable<Etudiant> {
    console.log("hii!!")
    return this.httpClient.get<Etudiant>('/MEMBRE-SERVICE/members/'+id,this.httpOptions);
  }
  
  getAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiServer + '/members');
  }
  getAllEtudiant(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiServer + '/members/etudiants');
  }

  getAllEnseignant(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiServer + '/members/enseignantChercheurs');
  }
  
  saveEnseigant(member:Member):Observable<any>{
  
  
    return this.httpClient.post('/MEMBRE-SERVICE/members/addEnseigant',JSON.stringify(member), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
    
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 } 

  saveEtudiant(member:Etudiant): Observable<any> {

    return this.httpClient.post('/MEMBRE-SERVICE/members/addEtudiant',JSON.stringify(member), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
 
   deleteMember(id:number){
    return this.httpClient.delete('/MEMBRE-SERVICE/members/'+ id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

    
    
 
  
}



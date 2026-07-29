import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})
    export class AiAgentService{
         constructor(private http:HttpClient){}
         
         analyzeForm(data:any){
            return this.http.post<any>('/api/ai-agent', data);
         }
    }

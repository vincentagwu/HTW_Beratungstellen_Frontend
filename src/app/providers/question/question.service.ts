import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient,} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = environment.apiUrl;
  constructor(public http:HttpClient) {
  }

  public getAnswer(question) {
    return this.http.get<String[]>(this.apiUrl+'/question?q="' + question +'"');
  }
}

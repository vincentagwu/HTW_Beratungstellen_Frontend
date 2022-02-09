import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService} from '../providers/question/question.service';
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  question: string = '';
  sendedQuestion: string = '';
  questions: any = [] ;
  input: boolean= false;
  buttonClicked: boolean= false;
  emptyInput: boolean= false;

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private app: AppComponent) { }

  ngOnInit() {
    this.folder = this.app.appPages[0].title;
    this.buttonClicked = false;
  }

  async insertQuestion(question){
    if(question.length > 0){
      this.buttonClicked = true;
      this.sendedQuestion = question;
      const response = await fetch('http://127.0.0.1:5000/question?q="' + question ).then( response => {
        //this.questions =  response.json();
        return response.json();
      } ).then( json => {
        let answer  = json;
        //this.sortByScore(answer.answers);
        console.log(json);
        answer.answers[0].sort((a,b)=> b.score-a.score);
        this.questions =  answer;
        console.log(json );
        console.log( "json", answer );
      });
      this.input = false;
    }
    
  }

  userInput(){
    if(this.question.length > 0){
      this.input = true;
      this.emptyInput = false;
      // setTimeout(()=>{
      //   this.insertQuestion(this.question);
      // }, 2000);
      this.insertQuestion(this.question);
    }
    else{
      this.emptyInput = true;
      this.input = true;
      this.buttonClicked = false;
    }
  }


  public sortByScore(array): void {
    array.sort((x, y) => +x.score - + y.score);
  }


}

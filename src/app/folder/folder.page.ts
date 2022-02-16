import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService} from '../providers/question/question.service';
import {AppComponent} from '../app.component'
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RatingPage } from '../modals/rating/rating.page';
import { ModalController, AlertController } from '@ionic/angular';

class Rating {
  question: String; 
  result: String; 
  rating: String;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  question: string = '';
  sendedQuestion: string = '';
  result: any = [] ;
  input: boolean= false;
  buttonClicked: boolean= false;
  emptyInput: boolean= false;
  apiUrl = environment.apiUrl;
  language = this.app.language;
  rating = new Rating();
  rateDone: boolean = false;
  

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private app: AppComponent, 
    public http: HttpClient, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.folder = this.app.appPages[0].title;
    this.buttonClicked = false;
  }

  async insertQuestion(question){
    if(question.length > 0){
      this.buttonClicked = true;
      this.sendedQuestion = question;
      const response = await fetch(this.apiUrl+'/question?q="' + question +'"').then( response => {
        //this.questions =  response.json();
        return response.json();
      } ).then( json => {
        let answer  = json;
        //this.sortByScore(answer.answers);
        console.log(json);
        answer.answers[0].sort((a,b)=> b.score-a.score);
        this.result =  answer;
        console.log(json );
        console.log( "json", answer );
      });
      this.input = false;
      this.rateDone =false
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

  async switchLanguage(language){
    this.app.language = language;

    this.app.languageChange(this.app.language);  
    this.language = this.app.language;
  }


  public sortByScore(array): void {
    array.sort((x, y) => + x.score - + y.score);
  }

  // rateQuestion(question){

   
    
  //   this.http.post(this.apiUrl + 'newRatings', {
  //     question: question,
  //     result: "111",
  //     rating: "1"
  //   })
  //     .subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  async rateQuestion() {
    

    const modal = await this.modalCtrl.create({
      component: RatingPage,
      cssClass: '',
      backdropDismiss: false,
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.rating) {
        this.rateDone =true;
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        //headers.append('Access-Control-Allow-Headers', 'application/json' );
        const requestOptions = new HttpResponse({ headers: headers });

        let i = 1 ;
        let output = "";
        this.result.answers[0].forEach(element => {
          output += i + ": " +  element.label + ",\n"
          i++;
        });

        var data = { question:  this.question, result: output, rating: result.data.rating};

        this.rating = new Rating();

        this.rating.question =  this.question;
        this.rating.result = this.result;
        this.rating.rating = result.data.rating;



        console.log(data);
        this.presentAlert('Danke fürs bewerten', 'Bewertung abgegeben', 'Danke, dass Sie ihre Bewertung abgegeben haben!');
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl + 'newRating', [{ question:  this.question, result: output, rating: result.data.rating}], requestOptions)
          .subscribe((response: any) => {
            resolve(response);
          });
        });
      }
    });
  }

  async presentAlert(header:string, subHeader:string, message:string ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

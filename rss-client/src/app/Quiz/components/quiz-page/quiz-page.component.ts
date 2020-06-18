import { QuizPageService } from 'src/app/Test/Quiz/quiz-page.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {

  constructor(private testservice: QuizPageService) {
    this.quizData = this.testservice.getQuizData();
  }
  searchText: string;
  quizData;

  ngOnInit(): void {
    console.log(this.quizData);
  }

}

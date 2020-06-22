import { QuizService } from './../../../services/quiz.service';
import { QuizPageService } from './../../../Test/Quiz/quiz-page.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css'],
})
export class EditQuizComponent implements OnInit {
  view = 'select';
  searchText: string;
  quizData: any;
  focusedQuiz;
  focusedQuestion;
  reducer = (accumulator, currentValue) =>
    accumulator + currentValue.pointValue;
  updateTotal() {
    let total = this.focusedQuiz.questions.reduce(this.reducer, 0);
    this.focusedQuiz.availablePoints = total;
  }
  focusQuiz(event) {
    this.focusedQuiz = this.quizService.getSampleQuiz(event.id);
    this.updateTotal();
    this.view = 'focus';
  }
  onBack() {
    this.view = 'select';
  }
  submitChanges() {
    //TODO: save focused quiz to the database
    console.log(this.focusedQuiz);
  }
  closeResult = '';
  open(content, question) {
    if (question == 'new') {
      this.focusedQuestion = {
        questionId: null,
        question: null,
        pointValue: null,
        options: [],
      };
    } else {
      this.focusedQuestion = question;
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result.type == 'update') {
            //TODO:update question in Database
            let newQuestion = {
              questionId: this.focusedQuestion.questionId,
              question: result.value.question,
              pointValue: result.value.pointValue,
              options: [],
            };
            for (let [key, value] of Object.entries(result.value)) {
              if (key[0] == 'o') {
                newQuestion.options.push(value);
              }
            }
            let index = this.focusedQuiz.questions.indexOf(
              this.focusedQuestion
            );
            if (index == -1) {
              this.focusedQuiz.questions.push(newQuestion);
            } else {
              this.focusedQuiz.questions[index] = newQuestion;
            }
            this.updateTotal();
          } else if (result.type == 'delete') {
            //remove question from database
            this.focusedQuiz.questions = this.focusedQuiz.questions.filter(
              (x) => x.questionId != result.value.questionId
            );
            this.updateTotal();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(
    private quizService: QuizService,
    private testservice: QuizPageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.quizData = this.testservice.getQuizData();
  }
}

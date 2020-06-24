import { QuizService } from 'src/app/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  view = 'select';
  subjects;

  focusedQuiz = {
    quizId: 0,
    subject: null,
    quizTopic: null,
    quizDescription: null,
    subjectId: 0,
    creatorEmail: this.userservice.user.email,
    questions: [],
    availablePoints: null,
  };
  focusedQuestion;
  addSubject(event) {
    //TODO:Add subject to database
    this.subjects.push(event.value);
    console.log(event.value);
    this.quizService.addSubject(event.value).subscribe();
  }
  setSubject(event) {
    this.focusedQuiz.subject = event;
    this.updateTotal();
    this.view = event;
  }
  reducer = (accumulator, currentValue) =>
    accumulator + currentValue.questionValue;
  updateTotal() {
    let total = this.focusedQuiz.questions.reduce(this.reducer, 0);
    this.focusedQuiz.availablePoints = total;
  }

  onBack() {
    this.view = 'select';
  }
  submitChanges() {
    //TODO: save focused quiz to the database
    console.log(this.focusedQuiz);
    this.focusedQuiz.subjectId = this.focusedQuiz.subject.subjectId;
    this.quizService.addQuiz(this.focusedQuiz).subscribe((res) => {
      this.focusedQuiz.quizId = res.quizId;
      console.log(this.focusedQuiz.quizId);
      this.focusedQuiz.questions.forEach((x) => {
        x.quizId = this.focusedQuiz.quizId;
      });
      this.quizService.addManyQuestions(this.focusedQuiz.questions).subscribe();
    });
  }
  closeResult = '';
  open(content, question) {
    if (question == 'new') {
      this.focusedQuestion = {
        questionId: null,
        question: null,
        questionValue: null,
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
              qusestionValue: result.value.questionValue,
              quizId: 0,
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
    private modalService: NgbModal,
    private quizService: QuizService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.quizService.getAllSubjects().subscribe((res) => (this.subjects = res));
  }
}

import { QuizService } from './../../../services/quiz.service';
import { QuizPageService } from './../../../Test/Quiz/quiz-page.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

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

  isValid = false;
  validate() {
    if (this.focusedQuiz.quizTopic && this.focusedQuiz.questions.length > 0) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  reducer = (accumulator, currentValue) =>
    accumulator + currentValue.questionValue;
  updateTotal() {
    let total = this.focusedQuiz.questions.reduce(this.reducer, 0);
    this.focusedQuiz.availablePoints = total || 0;
  }
  focusQuiz(event) {
    this.focusedQuiz = event;
    console.log(event.quizId);
    this.focusedQuiz.questions = [];
    this.quizService.getQuestionsByIdAdmin(event.quizId).subscribe((res) => {
      res.forEach((x) => this.focusedQuiz.questions.push(x));
    });
    this.updateTotal();
    this.validate();
    this.view = 'focus';
  }
  onBack() {
    this.view = 'select';
  }
  submitChanges() {
    //TODO: finish this method in add-quiz and copy here.
    //Group 2 Change
    this.focusedQuiz.quizTotalPoints = this.focusedQuiz.availablePoints;
    this.focusedQuiz.subjectId = this.focusedQuiz.subject.subjectId;
    this.quizService.addQuiz(this.focusedQuiz).subscribe((res) => {
      this.focusedQuiz.quizId = res.quizId;

      this.focusedQuiz.questions.forEach((x) => {
        x.quizId = this.focusedQuiz.quizId;
        x.quiz = {};
        delete x.userEmail;
        delete x.selectedAnswer;
      });
      this.quizService.addManyQuestions(this.focusedQuiz.questions).subscribe();
    });

    this.view = 'select';
  }
  closeResult = '';
  open(content, question) {
    if (question == 'new') {
      this.focusedQuestion = {
        quesionId: null,
        question: null,
        quizId: this.focusedQuiz.quizId,
        questionValue: null,
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
        quiz: {},
      };
    } else {
      this.focusedQuestion = question;
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // when modal is manually closed, it sends a type and value.
          if (result.type == 'update') {
            //TODO:update question in Database here
            // Addstuff here to change what each question contains
            let newQuestion = {
              questionId: this.focusedQuestion.questionId,
              question: result.value.question,
              questionValue: result.value.questionValue,
              correctAnswer: result.value.correctAnswer,
            };
            // Adds only options with not null values
            let i = 1;
            for (let [key, value] of Object.entries(result.value)) {
              if (key[0] == 'o') {
                if (value != null) {
                  let thisOption = 'option' + i;
                  newQuestion[thisOption] = value;
                  i++;
                }
              }
            }
            // Searches question array to see if this question exists
            let index = this.focusedQuiz.questions.indexOf(
              this.focusedQuestion
            );
            // if it doesn't exist, push it to the end of the quesion array
            if (index == -1) {
              this.focusedQuiz.questions.push(newQuestion);
            } else {
              // if it does exists, update the question
              this.focusedQuiz.questions[index] = newQuestion;
            }
            // updates the total points available in this quiz
            this.updateTotal();
            this.validate();
            //Group 2 change
            this.focusedQuiz.quizTotalPoints = this.focusedQuiz.availablePoints;
          } else if (result.type == 'delete') {
            //TODO:remove question from database here
            this.quizService.deleteQuestion(result.value).subscribe();
            this.focusedQuiz.questions = this.focusedQuiz.questions.filter(
              (x) => x.questionId != result.value.questionId
            );
            this.updateTotal();
            this.validate();
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
    private modalService: NgbModal,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((x) => {
      this.quizData = x;
    });
  }
}

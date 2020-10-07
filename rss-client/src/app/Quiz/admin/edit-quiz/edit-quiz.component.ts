import { QuizService } from '../../service/quiz.service';
import { QuizPageService } from '../../service/quiz-page.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/User/services/user.service';
import { User } from 'src/app/User/models/user';

@Component({
  selector: 'edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css'],
})
 /*This class is  the ts file for the page that admin is in when they are editing
  * This .ts file is also almost (if not exactly) the same as add-quiz.component.html
  * differences lie within the add-quiz.component.ts file
  * @focusedQuiz is type quiz (interfaces --> quiz.ts)
  * @focusedQuestion is type question (interfaces --> question.ts)
  */
export class EditQuizComponent implements OnInit {
  view = 'select';
  searchText: string;
  quizData: any;
  focusedQuiz;
  focusedQuestion;
  isValid = false;
  /** validate ()
   * validates that the quiz topic and the questions exist and the difficulty has been changed
   * if it does not than the save button does not appear/is faded so it cannot be submitted
   * */
  validate() {
    if (this.focusedQuiz.quizTopic && this.focusedQuiz.questions.length > 0 && this.focusedQuiz.quizDifficulty) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
/** reducer ()
*
* */
  reducer = (accumulator, currentValue) =>
    accumulator + currentValue.questionValue;
/** updateTotal ()
*
* */
  updateTotal() {
    let total = this.focusedQuiz.questions.reduce(this.reducer, 0);
    this.focusedQuiz.availablePoints = total || 0;
  }
/** focusQuiz(event) ()
 * @Event: the quiz that was selected
 * set the focus quiz to the quiz that was slested 
* */
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
/** onBack()
*
* */
  onBack() {
    this.view = 'select';
  }
/** submitChanges()
* add the quiz with updated info to the database
 * in the response that you confirmed to be submitted
 * add the questions from that quiz to the add many questions service method
* */
  submitChanges() {
    //Group 2 Change
    //make sure the points that are being submitted match to the total points
    // this.focusedQuiz.quizTotalPoints = this.focusedQuiz.quizTotalPoints; this works too.
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

  /**
   * Open()
   * 
   * @param content
   * @param question
   */
  open(content, question) {
    /*
     * when button "add new question" is clicked pass (content, 'new')
     * set the field values that pop to null except
     * set quizId of quiz value matches the id of the quiz that is being edited
     * 
     * if 2 parameters and second is not new than set the focusted question to that parameter
     * */
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
            // sets quizTotalPoints to availablePoints (which is all the added questions points added together)
            this.focusedQuiz.quizTotalPoints = this.focusedQuiz.availablePoints;
          } else if (result.type == 'delete') {
            this.quizService.deleteQuestion(result.value).subscribe();
            this.focusedQuiz.questions = this.focusedQuiz.questions.filter(
              (x) => x.questionId != result.value.questionId
            );
            this.updateTotal();
            this.validate();
            //Group 2 change
            // sets quizTotalPoints to self 
            //subtracting the point value of the question that is being deleted
            this.focusedQuiz.quizTotalPoints = this.focusedQuiz.quizTotalPoints  - result.value.questionValue;
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  /**
   * getDismissReason()
   * @param reason
   * allowing user to go back in page or exit view.
   */
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
  /** on init of page:
   * GetRequest from quiz service to get all Quizzes of type Quiz[]
   *
   * */
  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((x) => {
      this.quizData = x;
    });
  }
}

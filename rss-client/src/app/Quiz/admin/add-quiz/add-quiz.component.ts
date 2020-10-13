import { QuizService } from '../../service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/User/services/user.service';

@Component({
  selector: 'add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
/*This class is  the ts file for the page that admin is in when they are adding a quiz
* This .ts file is also almost (if not exactly) the same as edit-quiz.component.html based on the inherited code
 * the differences are the subject methods: addSubject() & setSubject() , subject text field
 * which are necessary to add subject quizes to the database.
* @focusedQuiz is type quiz (interfaces --> quiz.ts)
*/
export class AddQuizComponent implements OnInit {
  view = 'select';
  subjects;

  focusedQuiz = {
    quizId: 0,
    subject: null,
    quizTopic: null,
    quizDescription: null,
    subjectId: 0,
    quizTotalPoints: 0,
    quizDifficulty: null,
    quizAttempt: 0,
    creatorEmail: this.userservice.userPersistance().email,
    questions: [],
    availablePoints: null,
  };
  isValid = false;
/** validate ()
* validates that the quiz topic exists and that the questions also exist
* if it does not than the save button does not appear/is faded so it cannot be submitted
* */
  validate() {
    if (this.focusedQuiz.quizTopic && this.focusedQuiz.questions.length > 0) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
  focusedQuestion;

  subjectText = '';
  /**
   * addSubject():
   * add subject to database 
   * 
   * @param : the subject info that was added
   */
  addSubject(event) {
    delete event.value.subjectId;
    this.quizService.addSubject(event.value).subscribe(
      (res) => { },
      (error) => {
        if (error.status == 500) {
          window.alert('Error adding subject');
        } else {
          this.quizService
            .getAllSubjects()
            .subscribe((res) => (this.subjects = res));
        }
      }
    );
  }
  /**
   * SetSubject()
   * set subject to the subject that was selected
   * @param event: subject that was selected
   */
  setSubject(event) {
    this.focusedQuiz.subject = event;
    this.updateTotal();
    this.view = event;
  }
  reducer = (accumulator, currentValue) =>
    accumulator + currentValue.questionValue;
  updateTotal() {
    let total = this.focusedQuiz.questions.reduce(this.reducer, 0);
    this.focusedQuiz.availablePoints = total || 0;
  }

  onBack() {
    this.view = 'select';
  }

/** submitChanges()
* add the quiz with updated info to the database
* in the response that you confirmed to be submitted
* add the questions from that quiz to the add many questions service method
* */
  submitChanges() {
    //TODO: save focused quiz to the database
    //Group 2 change --> the real winner and what we need to change
    this.focusedQuiz.quizTotalPoints = this.focusedQuiz.availablePoints;
    //this.focusedQuiz.quizTotalPoints = Number(sessionStorage.getItem('points'));
    this.focusedQuiz.subjectId = this.focusedQuiz.subject.subjectId; 
    this.quizService.addQuiz(this.focusedQuiz).subscribe((res) => {
      this.focusedQuiz.quizId = res.quizId;
      this.focusedQuiz.questions.forEach((x) => {
        x.quizId = this.focusedQuiz.quizId;
      });
      this.quizService.addManyQuestions(this.focusedQuiz.questions).subscribe();
    });
    this.view = 'select';
  }
  closeResult = '';
  /**
   * 
   * @param content
   * @param question
   * @param subject
   */
  open(content, question, subject?) {
  /*
  * when button "add new question" is clicked pass (content, 'new')
  * set the field values that pop to null except
  * set quizId of quiz value matches the id of the quiz that is being edited
  *
  * if 2 parameters and second is not new than set the focusted question to that parameter
  * */
    if (question == 'new') {
      this.focusedQuestion = {
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
            //group 2 change
            // sets quizTotalPoints to availablePoints (which is all the added questions points added together)
            this.focusedQuiz.quizTotalPoints = this.focusedQuiz.availablePoints;
          } else if (result.type == 'delete') {
            this.focusedQuiz.questions = this.focusedQuiz.questions.filter(
              (x) => x.questionId != result.value.questionId
            );
            this.updateTotal();
            this.validate();
            //Group 2 change
            // sets quizTotalPoints to self 
            //subtracting the point value of the question that is being deleted
            this.focusedQuiz.quizTotalPoints = this.focusedQuiz.quizTotalPoints - result.value.questionValue;
          } else if (result.type == 'subject') {
            this.addSubject(subject);
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
    private modalService: NgbModal,
    private quizService: QuizService,
    private userservice: UserService
  ) { }
/** on init of page:
 * GetRequest from quiz service to get all  Subject of quizes of type Subject[]
 *
 * */
  ngOnInit(): void {
    this.quizService.getAllSubjects().subscribe((res) => (this.subjects = res));
  }
}
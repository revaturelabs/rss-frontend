import { UserService } from '../../../User/services/user.service';
import { ImageService } from 'src/app/User/services/image.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/User/services/account.service';
import { AppComponent } from 'src/app/app.component';
import { IndividualQuizPageComponent } from '../individual-quiz-page/individual-quiz-page.component';
import { CheaterService } from '../../service/cheater.service';
import { Observer } from 'rxjs';
import { Quiz } from '../../models/quiz';


@Component({
  selector: 'test-in-progress',
  templateUrl: './test-in-progress.component.html',
  styleUrls: ['./test-in-progress.component.scss'],
})
export class TestInProgressComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  questions;
  index;
  max;
  answers = {};
  quizzesTaken: any[] = [0];
  //group 2 addition
  quizAttempt: Quiz;
  attempt: number;

  isADirtyCheater: boolean;

  constructor(
    private quizservice: QuizService,
    private modalService: NgbModal,
    private userService: UserService,
    private accountservice: AccountService,
    private parentaluntil: IndividualQuizPageComponent,
    private cheaterService: CheaterService,
  ) {
    this.cheaterService.beginMonitoring()
    this.cheaterService.invalidated.subscribe(e => {
      this.isADirtyCheater = e
    })
  }
  
  accId;
  account = {
    accId: 0,
    userId: 0,
    accTypeId: 0,
    points: 0,
  };
  //sets up answer form and test layout
  ngOnInit(): void {
    this.index = 0;
    this.max = this.config.questions.length - 1;
    this.accountservice
      .getAllUserAccounts(this.userService.userPersistance().userId)
      .subscribe((res1) =>
        res1.forEach((x) => {
          if (x.accTypeId == 2) {
            this.account = x;
          }
        })
      );
    this.quizservice
      .getUserScores(this.userService.userPersistance().email)
      .subscribe((res) => {
        if (res.length == 0) {
          this.quizzesTaken.push(0);
        } else {
          this.quizzesTaken = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.cheaterService.resetValidity()
  }

  //Submits the form and
  onSubmit() {
    console.log('in submit')
    //TODO:finish submitting the quiz
    this.pushProgress.emit('post-test');
    let answersArr = [];
    for (let [key, value] of Object.entries(this.answers)) {
      let obj = {
        questionId: key,
        selectedAnswer: value,
        userEmail: this.userService.userPersistance().email,
        userId: this.userService.userPersistance().userId,
        quizId: this.config.quizId
      };
      answersArr.push(obj);
    }
    var theQuiz = this.quizzesTaken.filter((x) => {
      return x == this.config.quizId;
    });
    for (let i = 0; i < theQuiz.length; i++) {
      if (theQuiz[i] == this.config.quizId) {
        var theOne = true;
        break;
      }
    }

    if (theOne == true) {
      this.quizservice.submitQuiz(answersArr).subscribe((res) => {
        this.account.points = res.totalPoints;
        this.parentaluntil.results = res;
        this.parentaluntil.results.totalPoints = 0;
      });
    } else {
      if (this.isADirtyCheater) {
        this.quizservice.submitQuiz(answersArr).subscribe((res) => {
          this.parentaluntil.results = res;
          this.parentaluntil.results.totalPoints = 0;
        });
      } else {
        this.quizservice.submitQuiz(answersArr).subscribe((res) => {
          this.account.points = res.totalPoints;
          this.parentaluntil.results = res;
          this.accountservice.updatePoints(this.account).subscribe();
        });
      }
    }
    this.cheaterService.resetValidity()
  }

  closeResult: string;
  //Modal!
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.onSubmit();
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

  //Focus question by clicking on it's number square
  onFocus(input) {
    this.index = input;
  }
  //Sets answer whenever a selection is made
  onChange(index, input) {
    let question = this.config.questions[index].questionId;
    this.answers[question] = input;
  }
  //Saves the state of the radio button between questions
  isChecked(index, value) {
    let question = this.config.questions[index].questionId;
    if (this.answers[question] != null) {
      if (this.answers[question] == value) {
        return true;
      }
    } else {
      return false;
    }
  }
  //highlights boxes whenever an answer is selected
  isMarkedOff(index) {
    let question = this.config.questions[index].questionId;
    if (this.answers[question] != null) {
      return true;
    }
  }
  //buttons to navigate through questions
  navigate(input) {
    switch (input) {
      case 'first':
        this.index = 0;
        break;
      case 'previous':
        if (this.index != 0) {
          this.index--;
        }
        break;
      case 'next':
        if (this.index != this.max) {
          this.index++;
        }
        break;
      case 'last':
        this.index = this.max;
        break;
      default:
        break;
    }
  }

}

import { ImageService } from './../../../services/image.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'test-in-progress',
  templateUrl: './test-in-progress.component.html',
  styleUrls: ['./test-in-progress.component.css'],
})
export class TestInProgressComponent implements OnInit {
  @Input() config;
  @Output() pushProgress = new EventEmitter();
  questions;
  index;
  max;
  answers = {};

  //Submits the form and
  onSubmit() {
    this.pushProgress.emit('post-test');
    //loop through answers to create question[]
    let answersArr = [];
    for (let [key, value] of Object.entries(this.answers)) {
      let obj = {
        questionId: key,
        selectedAnswer: value,
        userEmail: null,
        userId: null,
        quizId: this.config.quizId,
      };
      answersArr.push(obj);
    }
    console.log(answersArr);
    this.quizservice.submitQuiz(answersArr);
  }

  closeResult: string;
  //Modal!
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
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
    // console.log(`Question: ${question}, input: ${input}`);
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
  constructor(
    private quizservice: QuizService,
    private modalService: NgbModal
  ) {}

  //sets up answer form and test layout
  ngOnInit(): void {
    this.index = 0;
    this.max = this.config.questions.length - 1;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheaterService } from 'src/app/Quiz/service/cheater.service';

@Component({
  selector: 'app-invalid-quiz',
  templateUrl: './invalid-quiz.component.html',
  styleUrls: ['./invalid-quiz.component.css']
})
export class InvalidQuizComponent implements OnInit {

  open: boolean
  
  constructor(public dialog: NgbModal, private cheaterService: CheaterService) {}
  
  ngOnInit(): void {
    this.cheaterService.invalidated.subscribe(e => {
      // if (e) {
      //   if (!this.open)
      //   this.openDialog()
      // }
    })
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(InvalidQuizDialogContent);
  //   this.open = true
  //   dialogRef.close().subscribe(() => {
  //     this.open = false
  //   });
  // }

}

@Component({
  selector: 'invalid-quiz-dialog-content',
  templateUrl: './dialog-content.component.html',
})
export class InvalidQuizDialogContent {}

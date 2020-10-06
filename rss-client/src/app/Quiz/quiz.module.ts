import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';

import { AddQuizComponent } from './admin/add-quiz/add-quiz.component';
import { EditQuizComponent } from './admin/edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './admin/quiz-form/quiz-form.component';

import { CheaterWarningComponent, DialogContent } from './employee/cheater-warning/cheater-warning.component';
import { IndividualQuizPageComponent } from './employee/individual-quiz-page/individual-quiz-page.component';
import { InvalidQuizComponent, InvalidQuizDialogContent } from './employee/invalid-quiz/invalid-quiz.component';
import { PostTestComponent } from './employee/post-test/post-test.component';
import { PreTestComponent } from './employee/pre-test/pre-test.component';
import { QuizPageComponent } from './employee/quiz-page/quiz-page.component';
import { TestInProgressComponent } from './employee/test-in-progress/test-in-progress.component';

import { Questions } from './models/questions';
import { Quiz } from './models/quiz';
import { QuizSubmit } from './models/quizSubmit';
import { Subject } from './models/subject';
import { TestQuizPage } from './models/test-quiz-page-data';

import { CheaterService } from './service/cheater.service';
import { QuizPageService } from './service/quiz-page.service';
import { QuizService } from './service/quiz.service';


@NgModule({
  declarations: [
    AddQuizComponent,
    EditQuizComponent,
    QuizFormComponent,
    CheaterWarningComponent,
    IndividualQuizPageComponent,
    InvalidQuizComponent,
    PostTestComponent,
    PreTestComponent,
    QuizPageComponent,
    TestInProgressComponent,
    DialogContent,
    FilterPipe,
    InvalidQuizDialogContent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers:[
    CheaterService,
    QuizPageService,
    NgbActiveModal,
    QuizService
  ],
  exports:[
    AddQuizComponent,
    EditQuizComponent
  ]
})
export class QuizModule { }

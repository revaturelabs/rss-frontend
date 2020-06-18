import { NgModule, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Common/header/header.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { QuizPageComponent } from './Quiz/components/quiz-page/quiz-page.component';
import { IndividualQuizPageComponent } from './Quiz/components/individual-quiz-page/individual-quiz-page.component';

const routes: Routes = [
  // { path: '', component: HeaderComponent },
  { path: 'earnpoints', component: EarnpointsOverviewPageComponent },
  { path: 'quizzes', component: QuizPageComponent },
  { path: 'quizzes/:id', component: IndividualQuizPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  @Input() config;
  quizConfig;
}

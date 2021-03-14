import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegretMatchingSolverComponent } from './regret-matching-solver/regret-matching-solver.component';
import { CfrSolverComponent } from './cfr-solver/cfr-solver.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'regret-matching',
    component: RegretMatchingSolverComponent,
  },
  {
    path: 'cfr-minimization',
    component: CfrSolverComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

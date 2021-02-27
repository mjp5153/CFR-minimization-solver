import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CfrMinimizationSolverComponent } from './cfr-minimization-solver/cfr-minimization-solver.component';

@NgModule({
  declarations: [
    AppComponent,
    CfrMinimizationSolverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

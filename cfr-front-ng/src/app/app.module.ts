import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegretMatchingSolverComponent } from './regret-matching-solver/regret-matching-solver.component';

@NgModule({
  declarations: [
    AppComponent,
    RegretMatchingSolverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

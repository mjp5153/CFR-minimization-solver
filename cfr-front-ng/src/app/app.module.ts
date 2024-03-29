import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegretMatchingSolverComponent } from './regret-matching-solver/regret-matching-solver.component';
import { CfrSolverComponent } from './cfr-solver/cfr-solver.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { UpdateUtilityDialogComponent } from './update-utility-dialog/update-utility-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { UpdateNameDialogComponent } from './update-name-dialog/update-name-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadGameDialogComponent } from './upload-game-dialog/upload-game-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegretMatchingSolverComponent,
    CfrSolverComponent,
    NotFoundComponent,
    MainComponent,
    UpdateUtilityDialogComponent,
    UpdateNameDialogComponent,
    UploadGameDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

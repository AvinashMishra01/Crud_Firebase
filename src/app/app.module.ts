import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudscreenComponent } from './crudscreen/crudscreen.component';
import { HttpClientModule } from '@angular/common/http';

// firebase connection
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { CrudHttpService } from './crud-http.service';
import { FormsModule } from '@angular/forms';
//material tabel
import { MatTableModule} from '@angular/material/table';
import { NgxSpinnerModule } from "ngx-spinner";
// import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    AppComponent,
    CrudscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatTableModule,
    FormsModule,
    NgxSpinnerModule


  ],
  providers: [CrudHttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }

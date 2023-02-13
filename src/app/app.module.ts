import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { UserregistrationComponent } from './components/userregistration/userregistration.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CdkTableModule } from '@angular/cdk/table';
import { SiminformationComponent } from './components/siminformation/siminformation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogComponent } from './components/dialog/dialog.component';
import { MobilecountrycodeComponent } from './components/mobilecountrycode/mobilecountrycode.component';
import { DialogcountrycodeComponent } from './components/dialogcountrycode/dialogcountrycode.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorpageComponent,
    UserregistrationComponent,
    NavigationComponent,
    DashboardComponent,
    SiminformationComponent,
    DialogComponent,
    MobilecountrycodeComponent,
    DialogcountrycodeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule,
    LayoutModule, MatToolbarModule, MatSidenavModule, MatIconModule,
    MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
    BrowserAnimationsModule, CdkTableModule, MatTableModule, ReactiveFormsModule,
    MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatRadioModule, HttpClientModule, MatPaginatorModule, MatSortModule, NgToastModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

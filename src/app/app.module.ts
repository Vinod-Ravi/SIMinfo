import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CdkTableModule } from '@angular/cdk/table';
import { SiminformationComponent } from './siminformation/siminformation.component';
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
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogComponent } from './dialog/dialog.component';
import { MobilecountrycodeComponent } from './mobilecountrycode/mobilecountrycode.component';
import { DialogcountrycodeComponent } from './dialogcountrycode/dialogcountrycode.component';

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
    MatRadioModule, HttpClientModule, MatPaginatorModule, MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

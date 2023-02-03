import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { LoginComponent } from './login/login.component';
import { MobilecountrycodeComponent } from './mobilecountrycode/mobilecountrycode.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SiminformationComponent } from './siminformation/siminformation.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userregistration', component: UserregistrationComponent },
  { path: 'siminformation', component: SiminformationComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'mobilecountrycode', component: MobilecountrycodeComponent},
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '**', component: ErrorpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

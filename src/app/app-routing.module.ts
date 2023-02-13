import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { LoginComponent } from './components/login/login.component';
import { MobilecountrycodeComponent } from './components/mobilecountrycode/mobilecountrycode.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SiminformationComponent } from './components/siminformation/siminformation.component';
import { UserregistrationComponent } from './components/userregistration/userregistration.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'userregistration', component: UserregistrationComponent, canActivate: [AuthGuard] },
  { path: 'siminformation', component: SiminformationComponent, canActivate: [AuthGuard] },
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard] },
  { path: 'mobilecountrycode', component: MobilecountrycodeComponent, canActivate: [AuthGuard] },
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

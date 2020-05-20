import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './admin/management/management.component';
import { EventsComponent } from './admin/events/events.component';
import { MenuComponent } from './admin/menu/menu.component';
import { HoursComponent } from './admin/hours/hours.component';
import { MesageComponent } from './admin/mesage/mesage.component';
import { ImagesComponent } from './admin/images/images.component';
import { AboutComponent } from './admin/about/about.component';
import { MediaComponent } from './admin/media/media.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'management',
    component: ManagementComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'events', component: EventsComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'hours', component: HoursComponent },
      { path: 'message', component: MesageComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'media', component: MediaComponent }
    ],
    canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

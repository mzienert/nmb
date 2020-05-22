import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LightboxModule } from 'ngx-lightbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { sanitizeHtmlPipe } from './sanitize-html.pipe';

import { EventService } from './services/event.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { MessagesService } from './services/messages.service';
import { ImagesService } from './services/images.service';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { EditorModule } from '@tinymce/tinymce-angular';

import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './admin/management/management.component';
import { ImageComponent } from './image/image.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './admin/events/events.component';
import { MenuComponent } from './admin/menu/menu.component';
import { HoursComponent } from './admin/hours/hours.component';
import { MesageComponent } from './admin/mesage/mesage.component';
import { ImagesComponent } from './admin/images/images.component';
import { MenuViewComponent } from './home/menu-view/menu-view.component';
import { LoadingComponent } from './loading/loading.component';
import { EventViewComponent } from './home/event-view/event-view.component';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { AboutViewComponent } from './home/about-view/about-view.component';
import { ImageViewComponent } from './home/image-view/image-view.component';
import { LocationViewComponent } from './home/location-view/location-view.component';
import { AboutComponent } from './admin/about/about.component';
import { MediaViewComponent } from './home/media-view/media.component';
import { MediaComponent } from './admin/media/media.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ManagementComponent,
    ImageComponent,
    HeaderComponent,
    EventsComponent,
    MenuComponent,
    HoursComponent,
    MesageComponent,
    ImagesComponent,
    MenuViewComponent,
    LoadingComponent,
    sanitizeHtmlPipe,
    EventViewComponent,
    HomeViewComponent,
    AboutViewComponent,
    ImageViewComponent,
    LocationViewComponent,
    AboutComponent,
    MediaViewComponent,
    MediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AmplifyAngularModule,
    ScrollToModule.forRoot(),
    EditorModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule,
    MatCheckboxModule,
    LightboxModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth
        });
      }
    },
    MatDatepickerModule,
    EventService,
    AuthService,
    AuthGuard,
    MessagesService,
    ImagesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageComponent
  ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe} from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';


import { environment } from 'src/environments/environment';
import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';
import { UNIQUE_USER_TOKEN_KEY } from 'src/app/services/auth-service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/services/auth-service/jwt.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UpdateMigrantComponent } from './components/update-migrant/update.migrant.component';
import { ChatMessagesComponent } from './components/chat-messages/chat.messages.component';
import { MessageComponent } from './components/message/message.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { UpdateVolunteerComponent } from './components/update-volunteer/update.volunteer.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryVersionComponent } from './components/country-version/country-version.component';
import { CreateCountryVersionComponent } from './components/create-country-version/create-country-version.component';
import { PostsComponent } from './components/posts/post.component';
import { OnePostComponent } from './components/one-post/one.post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

export function getToken() {
  return localStorage.getItem(UNIQUE_USER_TOKEN_KEY);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UpdateMigrantComponent,
    UpdateVolunteerComponent,
    ChatsComponent,
    MessageComponent,
    ChatMessagesComponent,
    ProfileComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CountriesComponent,
    CountryVersionComponent,
    CreateCountryVersionComponent,
    PostsComponent,
    OnePostComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatTreeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: [environment.tokenDomain]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
    provide: HELPGETSET_API_URL,
    useValue: environment.helpGetSetApi
  },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

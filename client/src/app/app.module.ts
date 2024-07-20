import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { SetListComponent } from './components/set-list/set-list.component';
import { SetPageComponent } from './pages/set-page/set-page.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CollectionPageComponent,
    NotFoundPageComponent,
    CollectionsListComponent,
    SetListComponent,
    SetPageComponent,
    HeaderComponent,
    LoginPageComponent,
    UserProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { SetListComponent } from './components/set-list/set-list.component';
import { SetPageComponent } from './pages/set-page/set-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    CollectionPageComponent,
    NotFoundPageComponent,
    CollectionsListComponent,
    SetListComponent,
    SetPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

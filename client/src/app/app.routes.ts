import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CollectionsRouteActivatorService } from './services/collections-services/collections-route-activator.service';
import { CollectionsDataResolverService } from './services/collections-services/collections-data-resolver.service';
import { SetDataResolverService } from './services/sets-services/set-data-resolver.service';
import { SetPageComponent } from './pages/set-page/set-page.component';
import { SetsRouteActivatorService } from './services/sets-services/sets-route-activator.service';

const routes: Routes = [
  { path: "collections", redirectTo: "/welcome", pathMatch: "full" },
  { path: "collections/:collection", component: CollectionPageComponent, 
    canActivate: [CollectionsRouteActivatorService],
    resolve: {collection: CollectionsDataResolverService}
  },
  { path: "sets/:set", component: SetPageComponent, 
    canActivate: [SetsRouteActivatorService],
    resolve: {set: SetDataResolverService}
  },
  { path: "welcome", component: WelcomePageComponent},
  { path: "404", component: NotFoundPageComponent, pathMatch: 'full' },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

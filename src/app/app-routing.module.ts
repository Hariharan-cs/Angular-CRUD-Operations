import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddProfileComponent } from './add-profile/add-profile.component';


const routes: Routes = [
{
  path:'', component : HomepageComponent,
  children:[ { path: 'profile', component: AddProfileComponent } ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

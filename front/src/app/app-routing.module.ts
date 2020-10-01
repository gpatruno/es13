import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdministrationComponent } from './administration/administration.component';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './article-form/article-form.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'administration', component: AdministrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article', component: ArticleFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

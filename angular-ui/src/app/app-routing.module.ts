import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnologyComponent} from "./technology/technology.component";
import { TechnologyDetailComponent } from "./technology-detail/technology-detail.component";
import { TechnologyNewComponent } from "./technology-new/technology-new.component";
import { DeveloperComponent } from "./developer/developer.component";
import { DeveloperDetailComponent } from "./developer-detail/developer-detail.component";
import { ProjectComponent } from "./project/project.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectNewComponent } from "./project-new/project-new.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'technologies', component: TechnologyComponent },
  { path: 'technologies/:id', component: TechnologyDetailComponent },
  { path: 'technologies#new', component: TechnologyNewComponent },
  { path: 'developers', component: DeveloperComponent },
  { path: 'developers/:id', component: DeveloperDetailComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'projects#new', component: ProjectNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

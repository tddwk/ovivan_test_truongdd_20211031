import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechnologyComponent } from './technology/technology.component';
import { TechnologyDetailComponent } from './technology-detail/technology-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { TechnologyService } from "./technology.service";
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from "@angular/material/tabs";
import { TechnologyNewComponent } from './technology-new/technology-new.component';
import { DeveloperComponent } from './developer/developer.component';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import {MatTableModule} from "@angular/material/table";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TechnologyComponent,
    TechnologyDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TechnologyNewComponent,
    DeveloperComponent,
    DeveloperDetailComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectNewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [TechnologyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

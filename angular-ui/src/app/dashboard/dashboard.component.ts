import { Component, OnInit } from '@angular/core';
import {Technology} from "../technology/technology";
import {Project} from "../project/project";
import {Developer} from "../developer/developer";
import {TechnologyService} from "../technology.service";
import {ProjectService} from "../project.service";
import {DeveloperService} from "../developer.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  technologies: Technology[] = [];
  projects: Project[] = [];
  developers: Developer[] = [];

  constructor(private technologyService: TechnologyService, private projectService: ProjectService, private developerService: DeveloperService) { }

  ngOnInit() {
    this.getTechnologies();
    this.getProjects();
    this.getDevelopers();
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies()
      .subscribe(res => {
        this.technologies = res.body;
        this.technologies = this.technologies.sort(function(a, b) {
          return (b.projects?.length || 0) - (a.projects?.length || 0);
        }).slice(0, 4)
      });
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(res => {
        this.projects = res.body;
        this.projects = this.projects.sort(function(a, b) {
          return (b.developers?.length || 0) - (a.developers?.length || 0);
        }).slice(0, 4)
      });
  }

  getDevelopers(): void {
    this.developerService.getDevelopers()
      .subscribe(res => {
        this.developers = res.body;
        this.developers = this.developers.sort(function(a, b) {
          return (b.projects?.length || 0) - (a.projects?.length || 0);
        }).slice(0, 4)
      });
  }
}

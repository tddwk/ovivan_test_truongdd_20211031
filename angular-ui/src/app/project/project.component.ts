import { Component, OnInit } from '@angular/core';
import { Project} from "./project";
import { ProjectService } from "../project.service";
import { MessageService } from "../message.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  selectedProject?: Project;

  displayedColumns: string[] = ['id', 'name', 'description', 'start_date', 'end_date', 'number_of_technologies', 'number_of_developers', 'action'];

  constructor(private projectService: ProjectService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  goToEdit(project: Project): void {
    this.router.navigateByUrl(`/projects/${project.id}`);
  };

  goToNew(): void {
    this.router.navigate(['/projects#new']);
  };

  delete(project: Project): void {
    if(confirm(`Are you sure to delete project #${project.id}?`)) {
      this.projectService.deleteProject(project.id).subscribe(data => {
        if (!data) {
          // do nothing
        }
        else {
          this.projects = this.projects.filter(h => h !== project); // update ui
        }
      });
    }
  }
}

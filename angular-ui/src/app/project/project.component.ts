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

  perPage: number = 10;
  currentPage: number = 1;
  pageCount: number = 0;

  displayedColumns: string[] = ['id', 'name', 'description', 'start_date', 'end_date', 'number_of_technologies', 'number_of_developers', 'action'];

  constructor(private projectService: ProjectService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(page: number = 1, per_page: number = 10): void {
    this.projectService.getProjects(page, per_page).subscribe(res => {
      this.projects = res.body;
      if (this.pageCount === 0) {
        this.pageCount = Math.ceil(res.headers.get('count') / this.perPage);
      }
    });
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

  goToPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    this.getProjects(this.currentPage);
  };

  goToNext(): void {
    if (this.currentPage < this.pageCount) {
      this.currentPage += 1;
    }
    this.getProjects(this.currentPage);
  };
}

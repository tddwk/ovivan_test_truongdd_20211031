import { Component, OnInit } from '@angular/core';
import { Technology } from "./technology";
import { TechnologyService } from "../technology.service";
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {

  technologies: Technology[] = [];
  selectedTechnology?: Technology;

  displayedColumns: string[] = ['id', 'name', 'number_of_projects', 'action'];

  constructor(private technologyService: TechnologyService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies().subscribe(technologies => this.technologies = technologies);
  }

  goToEdit(technology: Technology): void {
    this.router.navigateByUrl(`/technologies/${technology.id}`);
  };

  goToNew(): void {
    this.router.navigate(['/technologies#new']);
  };

  delete(technology: Technology): void {
    if(confirm(`Are you sure to delete technology #${technology.id}?`)) {
      this.technologyService.deleteTechnology(technology.id).subscribe(data => {
        if (!data) {
          // do nothing
        }
        else {
          this.technologies = this.technologies.filter(h => h !== technology); // update ui
        }
      });
    }
  }
}

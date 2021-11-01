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

  perPage: number = 10;
  currentPage: number = 1;
  pageCount: number = 0;

  displayedColumns: string[] = ['id', 'name', 'number_of_projects', 'action'];

  constructor(private technologyService: TechnologyService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  getTechnologies(page: number = 1, per_page: number = 10): void {
    this.technologyService.getTechnologies(page, per_page).subscribe(res => {
      this.technologies = res.body;
      if (this.pageCount === 0) {
        this.pageCount = Math.ceil(res.headers.get('count') / this.perPage);
      }
    });
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

  goToPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    this.getTechnologies(this.currentPage);
  };

  goToNext(): void {
    if (this.currentPage < this.pageCount) {
      this.currentPage += 1;
    }
    this.getTechnologies(this.currentPage);
  };
}

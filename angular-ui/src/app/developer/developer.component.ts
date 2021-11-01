import { Component, OnInit } from '@angular/core';
import {Developer} from "./developer";
import {DeveloperService} from "../developer.service";
import {MessageService} from "../message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
  developers: Developer[] = [];
  selectedDeveloper?: Developer;

  perPage: number = 10;
  currentPage: number = 1;
  pageCount: number = 1;

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'number_of_projects', 'action'];

  constructor(private developerService: DeveloperService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getDevelopers();
  }

  getDevelopers(page: number = 1, per_page: number = 10): void {
    this.developerService.getDevelopers(page, per_page).subscribe(res => {
      this.developers = res.body;
      if (this.pageCount === 0) {
        this.pageCount = Math.ceil(res.headers.get('count') / this.perPage);
      }
    });
  }

  goToEdit(developer: Developer): void {
    this.router.navigateByUrl(`/developers/${developer.id}`);
  };

  delete(developer: Developer): void {
    if(confirm(`Are you sure to delete developer #${developer.id}?`)) {
      this.developerService.deleteDeveloper(developer.id).subscribe(data => {
        if (!data) {
          // do nothing
        }
        else {
          this.developers = this.developers.filter(h => h !== developer); // update ui
        }
      }, error => {
        // console.log("error", error)
      });
    }

  }

  goToPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    this.getDevelopers(this.currentPage);
  };

  goToNext(): void {
    if (this.currentPage < this.pageCount) {
      this.currentPage += 1;
    }
    this.getDevelopers(this.currentPage);
  };

}

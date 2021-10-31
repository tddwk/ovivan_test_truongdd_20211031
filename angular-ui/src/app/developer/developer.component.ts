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

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'number_of_projects', 'action'];

  constructor(private developerService: DeveloperService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getDevelopers();
  }

  getDevelopers(): void {
    this.developerService.getDevelopers().subscribe(developers => this.developers = developers);
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
}

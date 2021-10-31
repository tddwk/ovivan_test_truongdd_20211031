import { Component, OnInit } from '@angular/core';
import {Developer} from "../developer/developer";
import {ActivatedRoute} from "@angular/router";
import {DeveloperService} from "../developer.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.css']
})
export class DeveloperDetailComponent implements OnInit {

  developer: Developer | undefined;
  bkDeveloper: Developer | undefined;
  submitted = false;

  namePattern = "^[a-zA-Z]+$";

  constructor(private route: ActivatedRoute, private developerService: DeveloperService, private location: Location) { }

  ngOnInit(): void {
    this.getDeveloper();
  }

  getDeveloper(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.developerService.getDeveloper(id)
      .subscribe(developer => {
        this.developer = developer;
        this.bkDeveloper = JSON.parse(JSON.stringify(developer)); // backup
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.developer) {
      this.developerService.updateDeveloper(this.developer)
        .subscribe(data => {
          if (!data) {
            this.developer = JSON.parse(JSON.stringify(this.bkDeveloper)); // rollback
            this.submitted = false;
          }
          else {
            this.bkDeveloper = JSON.parse(JSON.stringify(this.developer)); // update backup
          }
        }, error => {
          // console.log("error", error);
        });
    }
  }

  delete(developer: Developer): void {
    if(confirm(`Are you sure to delete developer #${developer.id}?`)) {
      this.developerService.deleteDeveloper(developer.id)
        .subscribe(data => {
          if (!data) {
            // do nothing
          }
          else {
            this.goBack();
          }
        });
    }
  }

  onFormSubmit() {
    this.submitted = true;
    this.save();
  }

}

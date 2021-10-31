import {Component, Input, OnInit} from '@angular/core';
import { Technology } from "../technology/technology";
import { TechnologyService } from "../technology.service";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-technology-detail',
  templateUrl: './technology-detail.component.html',
  styleUrls: ['./technology-detail.component.css']
})
export class TechnologyDetailComponent implements OnInit {

  technology: Technology | undefined;
  bkTechnology: Technology | undefined;
  submitted = false;

  constructor(private route: ActivatedRoute, private technologyService: TechnologyService, private location: Location) { }

  ngOnInit(): void {
    this.getTechnology();
  }

  getTechnology(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.technologyService.getTechnology(id)
      .subscribe(technology => {
        this.technology = technology;
        this.bkTechnology = JSON.parse(JSON.stringify(technology)); // backup
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.technology) {
      this.technologyService.updateTechnology(this.technology)
        .subscribe(data => {
          if (!data) {
            this.technology = JSON.parse(JSON.stringify(this.bkTechnology)); // rollback
            this.submitted = false;
          }
          else {
            this.bkTechnology = JSON.parse(JSON.stringify(this.technology)); // update backup
          }
        }, error => {
          // console.log("error", error);
        });
    }
  }

  delete(technology: Technology): void {
    if(confirm(`Are you sure to delete technology #${technology.id}?`)) {
      this.technologyService.deleteTechnology(technology.id)
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

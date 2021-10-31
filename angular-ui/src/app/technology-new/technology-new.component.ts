import { Component, OnInit } from '@angular/core';
import {Technology} from "../technology/technology";
import {TechnologyService} from "../technology.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-technology-new',
  templateUrl: './technology-new.component.html',
  styleUrls: ['./technology-new.component.css']
})
export class TechnologyNewComponent implements OnInit {

  technology = new Technology();

  constructor(private technologyService: TechnologyService, private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  onFormSubmit(): void {
    this.technologyService.addTechnology(this.technology)
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

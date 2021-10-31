import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Project} from "../project/project";
import {ProjectService} from "../project.service";
import {Location} from "@angular/common";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNewComponent implements OnInit {

  constructor(private projectService: ProjectService, private location: Location, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.myForm = this.fb.group({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      technologies: this.fb.array([]),
      developers: this.fb.array([])
    })

    this.initFormData();
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  projectData = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    technologies: [
      {
        name: ''
      }
    ],
    developers: [
      {
        first_name: '',
        last_name: ''
      }
    ]
  }

  myForm: FormGroup;

  initFormData() {
    let technologiesControl = <FormArray>this.myForm.controls.technologies;
    this.projectData.technologies.forEach(x => {
      technologiesControl.push(this.fb.group({
        name: [x.name, [RxwebValidators.unique(), RxwebValidators.maxLength({value: 50})]],
      }))
    });
    let developersControl = <FormArray>this.myForm.controls.developers;
    this.projectData.developers.forEach(x => {
      developersControl.push(this.fb.group({
        first_name:[x.first_name, [RxwebValidators.alpha(), RxwebValidators.maxLength({value: 100})]],
        last_name:[x.last_name, [RxwebValidators.alpha(), RxwebValidators.maxLength({value: 100})]],
      }))
    });
  }

  getTechnologies() {
    return (this.myForm.get('technologies') as FormArray).controls;
  }

  addNewTechnology() {
    let control = <FormArray>this.myForm.controls.technologies;
    control.push(
      this.fb.group({
        name: ['', [RxwebValidators.unique(), RxwebValidators.maxLength({value: 50})]],
      })
    )
  }

  deleteTechnology(index: number) {
    let control = <FormArray>this.myForm.controls.technologies;
    control.removeAt(index)
  }

  getDevelopers() {
    return (this.myForm.get('developers') as FormArray).controls;
  }

  addNewDeveloper() {
    let control = <FormArray>this.myForm.controls.developers;
    control.push(
      this.fb.group({
        first_name:['', [RxwebValidators.alpha(), RxwebValidators.maxLength({value: 100})]],
        last_name:['', [RxwebValidators.alpha(), RxwebValidators.maxLength({value: 100})]]
      })
    )
  }

  deleteDeveloper(index: number) {
    let control = <FormArray>this.myForm.controls.developers;
    control.removeAt(index)
  }

  onSubmit() {
    let postData = this.myForm.value;
    postData['technologies_attributes'] = postData['technologies'];
    postData['developers_attributes'] = postData['developers'];
    delete postData['technologies'];
    delete postData['developers'];
    postData = JSON.stringify(postData);

    this.projectService.addProject(postData)
      .subscribe(data => {
        if (!data) {
          // do nothing
        }
        else {
          this.goBack();
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}

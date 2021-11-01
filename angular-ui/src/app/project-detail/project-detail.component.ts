import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Project} from "../project/project";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {Location} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit {

  project: Project | undefined;
  // bkProject: Project | undefined;
  myForm: FormGroup;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private location: Location, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {

    this.myForm = this.fb.group({
      id: [{value: '', disabled: true}],
      name: [{value: ''}, Validators.required],
      description: [{value: ''}, Validators.required],
      start_date: [{value: '', disabled: true}],
      end_date: '',
      technologies: this.fb.array([]),
      developers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getTechnology();
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  getTechnology(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id)
      .subscribe(res => {
        this.project = res;
        // this.bkProject = JSON.parse(JSON.stringify(project)); // backup
        this.initFormData(res);
      });
  }

  delete(project: Project): void {
    if(confirm(`Are you sure to delete project #${project.id}?`)) {
      this.projectService.deleteProject(project.id)
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

  initFormData(project: Project) {
    let technologiesControl = <FormArray>this.myForm.controls.technologies;
    project.technologies.forEach(x => {
      technologiesControl.push(this.fb.group({
        id: [{value: x.id, disabled: true}],
        name: [x.name, [RxwebValidators.unique(), RxwebValidators.maxLength({value: 50})]],
        _destroy: 0
      }))
    });

    let developersControl = <FormArray>this.myForm.controls.developers;
    project.developers.forEach(x => {
      developersControl.push(this.fb.group({
        id: [{value: x.id, disabled: true}],
        first_name:[x.first_name, [RxwebValidators.alpha(), RxwebValidators.maxLength({value: 100})]],
        last_name:[x.last_name, [RxwebValidators.alpha(), RxwebValidators.maxLength({value: 100})]],
        _destroy: 0
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
        id: [{value: '', disabled: true}],
        name: ['', [RxwebValidators.unique(), RxwebValidators.maxLength({value: 50})]]
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
        id: [{value: '', disabled: true}],
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
    let postData = this.myForm.getRawValue();
    postData['technologies_attributes'] = postData['technologies'];
    postData['developers_attributes'] = postData['developers'];
    delete postData['technologies'];
    delete postData['developers'];
    postData = JSON.stringify(postData);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService.updateProject(id, postData)
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

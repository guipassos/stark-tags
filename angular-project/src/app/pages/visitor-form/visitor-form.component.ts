import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {VisitorsService} from '../../services/visitors/visitors.service';
import {VisitorModel} from '../../models/visitor.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Toaster} from 'ngx-toast-notifications';
import {validatorCPF} from '../../shared/utils/validators';

@Component({
  selector: 'ac-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.scss']
})
export class VisitorFormComponent implements OnInit {

  visitorForm: FormGroup;
  isLoading: boolean = false;

  constructor(private visitorsService: VisitorsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toaster: Toaster,) {

    this.visitorForm = this.formBuilder.group({
      id: [Date.now()],
      name: ['', Validators.compose([Validators.required])],
      document: ['', Validators.compose([Validators.required, validatorCPF()])],
      date_of_birth: [''],
      email: [''],
    });

  }

  async ngOnInit() {
    this.isLoading = true;

    let visitorId: string;

    await this.route.params
      .subscribe((params: Params) => visitorId = params['id']);

    if (visitorId) {
      await this.getVisitor(Number(visitorId));
    }
    this.isLoading = false;
  }

  /**
   * Get visitor by id and set to form.
   * @param id The id of visitor.
   * @returns A new void Promise.
   */
  async getVisitor(id: number): Promise<void> {
    await this.visitorsService.getVisitor(id)
      .then((visitor: VisitorModel) => {

        this.visitorForm.patchValue(visitor);
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }

  /**
   * Save the visitor form.
   */
  setVisitor(): void {
    this.visitorsService.setVisitor(this.visitorForm.value)
      .then((msg: string) => {
        this.toaster.open(msg, {type: 'success'});
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }

  /**
   * Check if formControl is invalid.
   * @param controlName The name of formControl.
   * @returns CSS class name when invalid or null on valid.
   */
  checkInvalid(controlName: string): string {
    if (this.visitorForm.controls[controlName].untouched) return null;
    return this.visitorForm.controls[controlName].invalid ? 'is-invalid' : null;
  }

}

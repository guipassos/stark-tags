import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {VisitorsService} from '../../services/visitors/visitors.service';
import {VisitorModel} from '../../models/visitor.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Toaster} from 'ngx-toast-notifications';
import {validatorCPF} from '../../shared/utils/validators';
import {VehicleBrandModel} from '../../models/vehicle-brand.model';
import {VehicleModelModel} from '../../models/vehicle-model.model';
import {VehiclesService} from '../../services/vehicles/vehicles.service';

@Component({
  selector: 'ac-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.scss']
})
export class VisitorFormComponent implements OnInit {

  visitorForm: FormGroup;
  isLoading: boolean = false;
  /*
  vehiclesBrands: VehicleBrandModel[] = [];
  vehiclesModels: VehicleModelModel[] = [];*/

  constructor(private visitorsService: VisitorsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toaster: Toaster,
              /*private vehiclesService: VehiclesService*/) {

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

    /*
    await this.getVehiclesBrands();
    */

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

        /*if (visitor.vehicle_brand) {
          this.getVehiclesModelsByBrandCod(visitor.vehicle_brand);
        }*/

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
   * Get vehicles brands.
   * @returns A new void Promise.
   */
  /*async getVehiclesBrands(): Promise<void> {
    await this.vehiclesService.getVehiclesBrands()
      .then((brands: VehicleBrandModel[]) => {
        this.vehiclesBrands = brands;
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }*/

  /**
   * Get vehicles models by cod brand.
   * @param cod The cod of brand.
   * @returns A new void Promise.
   */
  /*async getVehiclesModelsByBrandCod(cod: string): Promise<void> {
    await this.vehiclesService.getVehiclesModelsByBrandCod(cod)
      .then((models: VehicleModelModel[]) => {
        this.vehiclesModels = models;
      })
      .catch((e: string) => {
        this.toaster.open(e, {type: 'danger'});
      });
  }*/

  /**
   * Reset vehicle model formControls and get vehicles models by cod brand.
   * @param ev The event.
   * @returns A new void Promise.
   */
  /*async changeVehicleBrand(ev: any): Promise<void> {
    this.isLoading = true;
    this.visitorForm.controls.vehicle_model.reset();
    this.visitorForm.controls.vehicle_model_name.reset();
    await this.getVehiclesModelsByBrandCod(ev.value);
    this.isLoading = false;
  }*/

  /**
   * Set a new vehicle name when the vehicle model is changed.
   * @param ev The event.
   */
  /*changeVehicleModel(ev: any): void {
    if (ev && ev.value) {

      const index = this.vehiclesModels.findIndex(item => item.codigo == ev.value);
      if (index > -1) {
        this.visitorForm.controls.vehicle_model_name.setValue(this.vehiclesModels[index].nome);
      }

    } else {
      this.visitorForm.controls.vehicle_model_name.reset();
    }
  }*/

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

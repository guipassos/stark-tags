import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {VisitorsService} from '../../services/visitors/visitors.service';
import {VisitorModel} from '../../models/visitor.model';
import {Toaster} from 'ngx-toast-notifications';

@Component({
  selector: 'ac-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent implements OnInit {

  visitors: VisitorModel[] = [];
  itemSelected: number;
  modalRemoveVisitor: BsModalRef;

  constructor(private visitorsService: VisitorsService,
              private modalService: BsModalService,
              private toaster: Toaster) {
  }

  ngOnInit() {
    this.getVisitors();
  }

  /**
   * Get visitors list.
   * * @returns A new void Promise.
   */
  async getVisitors(): Promise<void> {
    await this.visitorsService.getVisitors().then((visitors: VisitorModel[]) => {
      console.log(visitors);
      this.visitors = visitors;
    });
  }

  /**
   * Remove visitor by id.
   * @param id The id of visitor.
   * @returns A new void Promise.
   */
  async removeVisitor(id: number): Promise<void> {
    await this.visitorsService.removeVisitor(id).then((msg: string) => {
      this.toaster.open(msg, {type: 'success'});
      this.getVisitors();
    }).catch((e: string) => {
      console.error(e);
    });
  }

  /**
   * Get visitors list.
   * * @returns A new void Promise.
   */
  async checkinVisitor(id: number): Promise<void> {
    await this.visitorsService.checkinVisitor(id).then((msg: string) => {
      this.toaster.open(msg, {type: 'success'});
      this.getVisitors();
    }).catch((e: string) => {
      console.error(e);
    });
  }

  /**
   * Open the modal to confirm the action.
   * @param template The ng-template to be loaded into the 'modalService'.
   * @param id The id of visitor.
   */
  alertRemoveVisitor(template: TemplateRef<any>, id: number): void {
    this.itemSelected = id;
    this.modalRemoveVisitor = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Confirms the user action to remove the visitor.
   * @param bool User action.
   * @returns A new void Promise.
   */
  async confirmRemoveVisitor(bool: boolean): Promise<void> {
    this.modalRemoveVisitor.hide();
    if (bool) {
      await this.removeVisitor(this.itemSelected);
    }
    this.itemSelected = null;
  }

}

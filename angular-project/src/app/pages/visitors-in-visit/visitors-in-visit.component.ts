import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {VisitorsService} from '../../services/visitors/visitors.service';
import {Toaster} from 'ngx-toast-notifications';

@Component({
  selector: 'ac-visitors-in-visit',
  templateUrl: './visitors-in-visit.component.html',
  styleUrls: ['./visitors-in-visit.component.scss']
})
export class VisitorsInVisitComponent implements OnInit {

  visitors: any[] = [];
  itemSelected: number;
  modalRemoveVisitor: BsModalRef;

  constructor(private visitorsService: VisitorsService,
              private modalService: BsModalService,
              private toaster: Toaster) {
  }

  ngOnInit() {
    this.getVisitorsInVisit();
  }

  /**
   * Get visitors in visit list.
   * * @returns A new void Promise.
   */
  async getVisitorsInVisit(): Promise<void> {
    await this.visitorsService.getVisitorsInVisit().then((visitors: any[]) => {
      console.log(visitors);
      this.visitors = visitors;
    });
  }

  /**
   * Visitor checkout
   * * @returns A new void Promise.
   */
  async checkoutVisitor(visitorId: number): Promise<void> {
    await this.visitorsService.checkoutVisitor(visitorId).then((msg: string) => {
      this.toaster.open(msg, {type: 'success'});
      this.getVisitorsInVisit();
    }).catch((e: string) => {
      console.error(e);
      this.toaster.open(e, {type: 'danger'});
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

}

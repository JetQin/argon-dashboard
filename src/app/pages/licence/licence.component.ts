import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss']
})
export class LicenceComponent implements OnInit {

  license = [
    {
      licenseName: 'Angular License',
      description: 'This is a payment license',
      status: 'Activated',
      createdBy: 'Jet Qin',
      expiredAt: '2019/10/09'
    },
    {
      licenseName: 'Angular License',
      description: 'This is a payment license',
      status: 'Activated',
      createdBy: 'Jet Qin',
      expiredAt: '2019/10/09'
    }
    ,
    {
      licenseName: 'Angular License',
      description: 'This is a payment license',
      status: 'Activated',
      createdBy: 'Jet Qin',
      expiredAt: '2019/10/09'
    }

  ]
  constructor() { }

  ngOnInit() {
  }

  handleNewLicense() {
    console.log('New License');
  }

}

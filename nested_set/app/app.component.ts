import { Component } from '@angular/core';
import {NodeService} from './node.service';
import {Node} from './node';
import { OnInit } from '@angular/core';




@Component({
  selector: 'my-app',
  template: `<div class="circle center"><span>+</span></div>
              <h2> MyNodes </h2>
              <ul>
                <li *ngFor="let node of nodes">
                  <span> {{node.label}}</span>
                  {{node.label}}
                </li>
              </ul>`,
  styles: [`

    .center {
      margin-left:auto;
      margin-right:auto;
      width:800px;
    }

    .circle {
     width: 50px;
     height: 50px;
     -webkit-border-radius: 25px;
     -moz-border-radius: 25px;
     border-radius: 25px;
     background: blue;
   }

   `],
   providers: [NodeService]
})
export class AppComponent implements OnInit {

  nodes: Node[];
  mode = 'Observable';
  errorMessage: string;

constructor(private nodeService: NodeService) { }

ngOnInit(): void {
  this.getNodes();
 }


 getNodes() {
   this.nodeService.getNodes()
                     .subscribe(
                       n => this.nodes = n,
                       //n => this.nodes.push(n),
                       err =>  this.errorMessage = <any>error);
 }


 }

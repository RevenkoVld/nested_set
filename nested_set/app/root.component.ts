import { Component } from '@angular/core';
import {Node} from './node'


@Component({
  selector: 'my-app',
  template: `<div class="circle center"><span>+</span></div>`,
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

   `]
})
export class RootNodeComponent {

    myself: Node;
    nodes: Node[];

 }

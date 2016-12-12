import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import {Node} from './node'
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class NodeService  {

   private nodesUrl = 'http://localhost:8080/getAll';

   constructor (private http: Http) {}

   getNodes(): Observable<Node[]>{
     return this.http.get(this.nodesUrl)
                     .map(this.mapNodes)
                    
  }


      mapNodes(response:Response): Node[]{
      // The response of the API has a results
      // property with the actual results
      return response.json().results.map(this.toNode)
   }



   toNode(r:any): Node{
     let node = <Node>({
       Id: r.Id,
       Label: r.Label,
       Lft : r.Lft,
       Rgt: r.Rgt,
  });
  console.log('Parsed node:', node);
  return node;
}


private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



 }

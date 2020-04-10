import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, Output } from '@angular/core';


interface lifeCycleEvent{
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-life-cycle-child',
  templateUrl: './life-cycle-child.component.html',
  styleUrls: ['./life-cycle-child.component.css']
})
export class LifeCycleChildComponent implements OnInit, OnDestroy, OnChanges {


  @Input() name: string;
  @Input() age: number;
  @Input() food: string;

  public events: lifeCycleEvent[] = [];
  nextEventId: number = 0;
  @Output() btnDisabled: boolean = true;

  color: string[] = ["accent", "warn", "primary"];

  constructor() {
    console.log(this.name + ' - constructor');
    this.newEvent("constructor");
   }

  ngOnInit(): void {
    console.log(this.name + ' - ngOnInit');
    this.newEvent("ngOnInit");

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.name + ' - changes');
    console.log(changes);
    this.newEvent("ngOnChanges");

  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log(this.name + ' - ngAfterContentInit');
    this.newEvent("ngAfterContentInit");

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.name + ' - ngAfterViewInit');
    this.newEvent("ngAfterViewInit");
    
  }

  ngOnDestroy() {
    console.log(this.name + ' - ngOnDestroy');
    this.newEvent("ngOnDestroy");
  }

  newEvent(name: string){
    let id = this.nextEventId++;
    this.events.push({
      id: id, 
      color: this.color[id % this.color.length], 
      name: name})
      setTimeout(() => {
        let idx = this.events.findIndex((e) => e.id == id);
        if(idx >= 0)
          this.events.splice(idx, 1);
      }, 500 + this.events.length*500);
  }


}

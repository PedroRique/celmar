import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public loadStatus = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $('body').addClass('scroll');

    // if(!localStorage.alreadyLoaded){
    //   $('body').removeClass('scroll');
    //   this.loadStatus = false;
    //   localStorage.alreadyLoaded = true;

    //   setTimeout(() => {
    //     $('body').addClass('scroll');
    //     this.loadStatus = true;
    //   }, 3500)
    // }else{
      // this.loadStatus = true;
    // }

    // this.cd.markForCheck();

    
  }

}

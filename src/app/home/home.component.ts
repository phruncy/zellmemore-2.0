import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

    private faArrowAltCircleRight = faChevronRight;
    
    constructor() { }

  ngOnInit() {
  }
}

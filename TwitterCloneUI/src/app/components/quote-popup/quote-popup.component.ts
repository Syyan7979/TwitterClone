import { Tweet } from './../../interfaces/tweet';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-popup',
  templateUrl: './quote-popup.component.html',
  styleUrls: ['./quote-popup.component.css']
})
export class QuotePopupComponent implements OnInit {

  constructor() { }
  @Input() tweet !: Tweet;

  ngOnInit(): void {
  }

}

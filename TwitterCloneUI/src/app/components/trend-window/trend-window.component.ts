import { Trend } from './../../interfaces/trend';
import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-trend-window',
  templateUrl: './trend-window.component.html',
  styleUrls: ['./trend-window.component.css']
})
export class TrendWindowComponent implements OnInit {

  constructor(private tweetService: TweetService) { }
  trends : Trend[] = []
  totalTrendsReturned : number = 0;
  
  ngOnInit(): void {
    this.getTrends();
  }

  getTrends() : void {
    this.tweetService.getTrends().subscribe(
      res => {
        this.totalTrendsReturned = res.length;
        this.trends = res.splice(0, 10);
      }
    )
  }
}

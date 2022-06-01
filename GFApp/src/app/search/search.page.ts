import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchTerm: string;
  restaurant = [
    {
      "place":"Paris",
      "department":"75"
    },
    {
      "place":"Pau",
      "department":"64"
    },
    {
      "place":"Toulouse",
      "department":"31"
    },
    {
      "place":"Lyon",
      "department":"69"
    },
    {
      "place":"Bordeaux",
      "department":"33"
    },
    {
      "place":"Nice",
      "department":"06"
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

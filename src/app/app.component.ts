import { Component, OnInit } from '@angular/core';

import { BreweryService } from './brewery.service';
import { Brewery } from './brewery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'NML Angular Brewery Filter Example';
  query = '';
  breweries:Brewery[] = [];
    
  constructor( private breweryService: BreweryService ) {
  
  }
  
  /* Load List of Breweries to filter */
  ngOnInit(){
    this.breweryService.loadBreweryList( 'wisconsin' )
    .subscribe( breweries => this.breweries = breweries.sort((a,b) => a.name.localeCompare(b.name)) );
  }
  
  /* Helper method to clear the search results */
  clearQuery(){
    this.query = '';
  }
  
  /**
   * Filter the list of Breweries by Brewery Name with the given query.  
   * Return the entier list if query is empty
   */
  getFilteredBreweries( query ){
    var lowerQuery = query.toLowerCase();
   
    //Returns the complete list if query is empty, Otherwise sort returned list
    return lowerQuery ? 
        this.breweries.filter( item => item.name.toLowerCase().indexOf( lowerQuery ) !== -1 ) : this.breweries;
  }

}

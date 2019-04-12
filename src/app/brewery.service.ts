import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Brewery } from './brewery';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

    constructor( private http: HttpClient  ) { 
    }
    
    /**
     * Load a list of breweries for a given @param state 
     */
    loadBreweryList( state ): Observable<Brewery[]>{
      return this.http.get<Brewery[]>('https://api.openbrewerydb.org/breweries?by_state=' + encodeURI(state) )
      .pipe(
         catchError(this.handleError<Brewery[]>('loadBreweryList',[]))
      );
    }
    
    /* 
     * Inital Test method to make sure the filtering is working
     */
    loadTestList(){
       return ['AAPL', 'AA', 'ABA', 'TXN', 'IBM', 'AAA', 'HOG', 'MSFT'];
    }
    
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
           
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}

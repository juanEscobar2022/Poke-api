import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonFilterService {

  private typeSelectedSubject: BehaviorSubject<string> = new BehaviorSubject<string>('all');
  typeSelected$: Observable<string> = this.typeSelectedSubject.asObservable();

  constructor() { }

  setTypeSelected(type: string) {
    
    this.typeSelectedSubject.next(type);
  }
}

import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Observable } from "rxjs/Observable"
import 'rxjs/Rx';

import { DataState } from "./actions/data.state";
import { DataActions } from "./actions/data.actions";

export interface StoreState {
  data?: DataState,
}

export interface Reducer {
  (state: StoreState): StoreState;
}

@Injectable()
export class StoreService {

  private _dispatching = false;

  private _state: StoreState = {};

  private _changes: BehaviorSubject<StoreState>;


  constructor(public http: Http,
              public data: DataActions) {
    this._changes = new BehaviorSubject<StoreState>(this._state);
    this._initActions();
  }

  private _initActions = (): void => {
    this.data.init(this);
  };

  /**
   * Change state.
   *
   * @param reducer
   * @return {StoreState}
   */
  dispatch = (reducer: Reducer): StoreState => {
    if (!this._dispatching) {
      this._dispatching = true;
      this._state = reducer(this._state);
      this._dispatching = false;
      this._changes.next(this._state);
      // console.log('State dispatched', this._state);
      return this._state;
    }
    else {
      throw new Error('Dispatch in progress');
    }
  };

  /**
   * Get current state.
   *
   * @return {StoreState}
   */
  get state(): StoreState {
    return this._state;
  }

  /**
   * Full state Observable that emits every dispatch.
   *
   * @return {Observable<T>}
   */
  stream = (): Observable<StoreState> => {
    return this._changes.asObservable();
  };

  /**
   * Selected state Observable that emits only selected state dispatches.
   *
   * @param path
   * @param paths
   * @return {Observable<any>}
   */
  select = (path: any, ...paths: string[]): Observable<any> => {
    return this.stream().pluck(...path.split('/'), ...paths).distinctUntilChanged();
  };

  /**
   * Get Http Headers.
   *
   * @return {Headers}
   */
  getHeaders = (): Headers => {
    let headers = new Headers();
    headers.append('X-Auth-Token', '37fd178a35ca427ab0a1d368cf7b9d86');
    return headers;
  };

  /**
   * Get Http.Post Observable.
   *
   * @param url
   * @param data
   * @return {Observable<R>}
   */
  post = (url: string, data: any): Observable<any> => {
    return this.http.post(url, JSON.stringify(data), {headers: this.getHeaders()}).map(res => res.json());
  };

  /**
   * Get Http.Get Observable.
   *
   * @param url
   * @return {Observable<R>}
   */
  get = (url: string): Observable<any> => {
    return this.http.get(url, {headers: this.getHeaders()}).map(res => res.json());
  };

  /**
   * Get Http.Delete Observable.
   *
   * @param url
   * @return {Observable<R>}
   */
  delete = (url: string): Observable<any> => {
    return this.http.delete(url, {headers: this.getHeaders()}).map(res => res.json());
  };

  /**
   * @param item
   * @return {({}&any)|any}
   * @private
   */
  static __copyItem(item) {
    return Object.assign({}, item);
  }

  /**
   * @param collection
   * @return {any[]}
   * @private
   */
  static __copyCollection(collection) {
    return [...collection];
  }

  /**
   * @param collection
   * @param item
   * @param key
   * @return {Uint8Array|U[]|Dict<U>|Float32Array|Uint8ClampedArray|Int16Array|any}
   * @private
   */
  static __setCollectionItem(collection, item, key = 'id') {
    let updated = false;
    let result = collection.map(original => {
      if (original[key] == item[key]) {
        original = this.__copyItem(item);
        updated = true;
      }
      return original;
    });
    if (!updated) {
      result.push(this.__copyItem(item));
    }
    return result;
  }

  /**
   *
   * @param array
   * @param index
   * @param item
   * @return {any[]}
   * @private
   */
  static __setArrayItem(array: any[], index: number, item: any): any[] {
    return [
      ...array.slice(0, index),
      item,
      ...array.slice(index + 1),
    ];
  }

  /**
   * @param collection
   * @param keyValue
   * @param key
   * @return {any}
   * @private
   */
  static __unsetCollectionItem(collection, keyValue, key = 'id') {
    return collection.filter(item => item[key] != keyValue);
  }

  /**
   * @param left
   * @param right
   * @param key
   * @return {any[]}
   * @private
   */
  static __mergeCollections(left, right, key = 'id') {
    let result = StoreService.__copyCollection(left);
    right.forEach(item => {
      result = StoreService.__setCollectionItem(result, item, key);
    });
    return result;
  }

  /**
   *
   * @param object
   * @param index
   * @param value
   * @return {({}&any&{index: any})|any}
   * @private
   */
  static __setObjectField(object, index, value) {
    let impl = {};
    impl[index] = value;
    return Object.assign({}, object, impl);
  }

  static addQueryParamsToUrl(url: string, params): string {
    let result = url + '?';
    for (let param in params) {
      result += param + '=' + params[param] + '&';
    }
    return result;
  }

}
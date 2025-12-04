import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface layoutConfig {
    preset?: string;
    primary?: string;
    surface?: string | undefined | null;
    darkTheme?: boolean;
    menuMode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private configUpdate = new Subject<layoutConfig>();

  configUpdate$ = this.configUpdate.asObservable();

}

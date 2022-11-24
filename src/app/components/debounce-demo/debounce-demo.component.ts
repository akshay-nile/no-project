import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-debounce-demo',
  templateUrl: './debounce-demo.component.html',
  styleUrls: ['./debounce-demo.component.scss']
})
export class DebounceDemoComponent implements AfterViewInit {

  @ViewChild('searchBox') searchBox!: ElementRef;

  searchQuery = '';
  apiCalls = new Array<any>();

  searching = false;
  typing = false;

  debounceTimer = null as any;
  debounceDelay = 720;

  readonly backupKey = this.constructor.name + '.backup';

  constructor(private utilityService: UtilityService, private router: Router) {
    // store backup before routing-out of this component
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.utilityService.states.set(this.backupKey, this);
      }
    });

    // re-store backup after routing-in to this component
    if (this.utilityService.states.has(this.backupKey)) {
      const oldThis = this.utilityService.states.get(this.backupKey);
      this.searchQuery = oldThis.searchQuery;
      this.apiCalls = oldThis.apiCalls;
      this.utilityService.states.delete(this.backupKey);
    }
  }

  ngAfterViewInit(): void {
    this.searchBox.nativeElement.value = this.searchQuery;
    this.searchBox.nativeElement.focus();
  }

  debouncedSearch(query: string): void {
    this.typing = true;
    this.searchQuery = query;
    // debouncing logic below
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer); // clear previously set timer
    }
    this.debounceTimer = setTimeout(() => { // start a new timer
      this.searchApiService(this.searchQuery); // call actual api after 720ms
      this.debounceTimer = null;
      this.typing = false;
    }, this.debounceDelay);
  }

  searchApiService(query: string): void {
    this.searching = true;
    // to mimic api call's delay
    const delay = 1000 + Math.round(Math.random() * 1000);
    const apiCall = '/search?query=' + query.replace(/\s/gi, '%20');
    setTimeout(() => {
      this.apiCalls.unshift({ query: apiCall, delay: delay });
      this.searching = false;
    }, delay);
  }

}

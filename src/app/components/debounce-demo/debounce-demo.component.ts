import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-debounce-demo',
  templateUrl: './debounce-demo.component.html',
  styleUrls: ['./debounce-demo.component.scss']
})
export class DebounceDemoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('searchBox') searchBox!: ElementRef;

  searchQuery = '';
  apiCalls = new Array<any>();

  searching = false;
  typing = false;

  debounceTimer = null as any;
  debounceDelay = 720;

  backupKey = 'DebounceDemoComponent';
  properties = ['apiCalls', 'searchQuery'];

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    if (this.utilityService.stateExists(this)) {
      this.utilityService.restoreAndClearState(this);
    }
  }

  ngOnDestroy(): void {
    this.utilityService.storeState(this);
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
      clearTimeout(this.debounceTimer); // clear previously set timer if running
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrl: './content-header.component.css',
})
export class ContentHeaderComponent {
  title: string = 'Dashboard';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.title = this.getTitle(this.activatedRoute);
      });
  }
  private getTitle(route: ActivatedRoute): string {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['title'] || 'Dashboard';
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  
import { PageService } from 'src/app/services/page.service';  

@Component({  
  selector: 'app-sidebar',  
  templateUrl: './sidebar.component.html',  
  styleUrls: ['./sidebar.component.css']  
})  
export class SidebarComponent implements OnInit {  

  pageActive!: string;  

  constructor(private pageService: PageService, private cdr: ChangeDetectorRef) { }  

  ngOnInit(): void {  
    this.pageService.$dataPageActive.subscribe(data => {  
      this.pageActive = data;  
      this.cdr.detectChanges(); 
    });  
  }  
}
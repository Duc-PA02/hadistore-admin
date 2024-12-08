import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { Product } from 'src/app/common/Product';
import { PageService } from 'src/app/services/page.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-soldest',
  templateUrl: './soldest.component.html',
  styleUrls: ['./soldest.component.css']
})
export class SoldestComponent implements OnInit {

  listData!: MatTableDataSource<Product>;
  products!: Product[];
  productsLength!: number;
  columns: string[] = ['image', 'productId', 'name', 'sold', 'category'];
  
  labels: string[] = [];
  data: number[] = [];
  myChartBar !: Chart;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pageService: PageService, private productService: ProductService) { }

  ngOnInit(): void {
    this.pageService.setPageActive('soldest');
    this.getProduct();
    Chart.register(...registerables);
  }

  getProduct() {
    this.productService.getBestSeller().subscribe(
      data => {
        this.products = data as Product[];
        
        // Check if we received any products
        if (!this.products || this.products.length === 0) {
          console.warn('No products received from API');
          return;
        }
  
        // Set up the table data
        this.listData = new MatTableDataSource(this.products);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
  
        // Clear existing arrays
        this.labels = [];
        this.data = [];
  
        // Safely process only available products
        const maxProducts = Math.min(10, this.products.length);
        
        // First group (0-2)
        for (let i = 0; i < Math.min(3, maxProducts); i++) {
          if (this.products[i]) {
            this.labels.push(this.products[i].name);
            this.data.push(this.products[i].sold);
          }
        }
  
        // Second group (3-5)
        for (let i = 3; i < Math.min(6, maxProducts); i++) {
          if (this.products[i]) {
            this.labels.push(this.products[i].name);
            this.data.push(this.products[i].sold);
          }
        }
  
        // Third group (6-9)
        for (let i = Math.min(9, maxProducts - 1); i >= 6; i--) {
          if (this.products[i]) {
            this.labels.push(this.products[i].name);
            this.data.push(this.products[i].sold);
          }
        }
  
        // Only create chart if we have data
        if (this.labels.length > 0 && this.data.length > 0) {
          this.loadChartBar();
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadChartBar() {
    this.myChartBar = new Chart('chart', {
      type: 'polarArea',
      data: {
        labels: this.labels,
        datasets: [{
          // label: '# of Votes',
          data: this.data,
          // borderColor: 'rgb(75, 192, 192)',
          // pointBorderColor: 'rgba(54, 162, 235, 0.2)',
          // backgroundColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(201, 203, 207, 0.6)',
            'rgba(0, 162, 71, 0.6)',
            'rgba(82, 0, 36, 0.6)',
            'rgba(82, 164, 36, 0.6)',
            'rgba(255, 158, 146, 0.6)',
            'rgba(123, 39, 56, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)',
            'rgba(0, 162, 71, 1)',
            'rgba(82, 0, 36, 1)',
            'rgba(82, 164, 36, 1)',
            'rgba(255, 158, 146, 1)',
            'rgba(123, 39, 56, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

}

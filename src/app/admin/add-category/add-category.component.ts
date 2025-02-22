import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  postForm: FormGroup;

  @Output()
  saveFinish: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: NgbModal, private categoryService: CategoryService, private toastr: ToastrService) {
    this.postForm = new FormGroup({
      'categoryName': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });    
  }

  ngOnInit(): void {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  save() {
    if(this.postForm.valid) {
      this.categoryService.post(this.postForm.value).subscribe(data=>{
        this.modalService.dismissAll();
        this.toastr.success('Thêm thành công!', 'Hệ thống');
        this.saveFinish.emit('done');
      })
    } else {
      this.toastr.error('Thêm thất bại!', 'Hệ thống');
    }
    this.postForm.reset();
  }

}

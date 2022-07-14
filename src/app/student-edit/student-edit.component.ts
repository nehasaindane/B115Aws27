import { Component, OnInit } from '@angular/core';
import { StudentService } from './../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  // declare variables
  id: number;
  student: Student;

  // inject service and acivated Route param
  constructor(private service: StudentService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // read id sent by all component as /edit/id
    // tslint:disable-next-line: no-string-literal
    this.id = this.activatedRoute.snapshot.params['id'];
    // make service call to get student object
    this.service.getOneStudent(this.id).subscribe(
      data => {
      this.student = data;
      console.log(this.student);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  updateStudent() {
    this.service.updateStudent(this.id, this.student)
    .subscribe( data => {
      console.log(data);
      this.router.navigate(['all']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      id: 0,
      name: '',
      lastname: '',
      age: 0,
      profession: '',
    });
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      if (this.userId !== null) {
        this.userService.getUser(this.userId).subscribe((result) => {
          this.userForm.patchValue({
            d: result[0].id,
            name: result[0].name,
            lastname: result[0].lastname,
            age: result[0].age,
            profession: result[0].profession,
          });
        });
      }
    });
    
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length + 1);
    this.userService.postUser(this.userForm.value).subscribe((result) => {
      console.log(`Usuário ${result.name} foi cadastrado com sucesso`);
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    });
  }

  updateUser(){
    this.userService.putUser(this.userId, this.userForm.value).subscribe(result => {
      console.log('usuario update', result);
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }

  actionButton() {
    if(this.userId !== null){
      this.updateUser();
    }else {
      this.createUser();
    }
  }
}

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loguinForm:FormGroup = this.fb.group({
    loguin:['',[Validators.required]],
    password:['',Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  login():void{
    const credenciais = this.loguinForm.value
    this.authService.signIn(credenciais)
    .subscribe(
      ()=>{
        this.snackBar.open('Logado com sucesso','ok',{
          duration:300
        })
        this.router.navigateByUrl('/funcionarios')
      }

    )
  }

}

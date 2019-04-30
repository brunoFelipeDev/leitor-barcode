import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent implements OnInit {

  cnpj = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logar() {
    if (this.cnpj == '99999999999')
      this.router.navigate(['leitor/' + this.cnpj]);
  }

}

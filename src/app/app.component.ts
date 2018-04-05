import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  onglets = [
  	{
	  	nom : 'Accueil',
		lien : '/'
	},
	{
		nom : 'La carte',
		lien : 'menu'
	},
	{
		nom : 'Contact',
		lien : 'contact'
	},
    {
      nom: 'Panier',
      lien: 'cart'
    }
	];
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
        items: MenuItem[] | undefined;

        ngOnInit(): void {
            this.items = [
                        {
                            label: 'Accueil',
                            icon: 'pi pi-home',
                            routerLink: ['/']
                        },
                        {
                            label: 'personnes',
                            icon: 'pi pi-star',
                            routerLink: ['/liste-personne']
                        }

                    ]
        }
}

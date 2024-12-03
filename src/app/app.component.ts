import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CollectionComponent } from './features/collection/collection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CollectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Anime-Tier-List';
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Импорт русской локали для moment.js
import 'moment/locale/ru';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lk7-front');
}

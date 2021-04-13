import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gifService: GifsService) {}

  get gifList(): string[] {
    return this.gifService.historial;
  }

  pedirGif(gif: string) {
    this.gifService.buscarGifs(gif);
  }
}

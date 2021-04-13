import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
  // Cuando tiene este parametro no es necesario ponerlo en Providers en el modulo principal
  // automaticamente lo tomara como global y estara disponible desde el root de la aplicacion.
})
export class GifsService {
  private apiKey: string = 'o3r6HUTXJ8H9TBvHGo36iSM9SQH6FSQH';
  private _historial: string[] = [];
  //TODO: cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];
  private busquedaApi: string = 'https://api.giphy.com/v1/gifs';

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    const estado = localStorage.getItem('historial');
    const resultado = localStorage.getItem('resultados');
    if (estado) {
      this._historial = JSON.parse(estado);

      console.log(this._historial);
    }
    if (resultado) {
      this.resultados = JSON.parse(resultado);
    }
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);

      this._historial = this._historial.slice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '9');

    this.http
      .get<SearchGIFResponse>(`${this.busquedaApi}/search`, { params: params })
      .subscribe((resp) => {
        console.log(resp.data);

        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

    console.log(this._historial);
  }
}

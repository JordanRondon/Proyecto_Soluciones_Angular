import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../Model/Usuario-model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httClient: HttpClient) { }
  getUsuario(id: string):Observable<UsuarioModel[]>{
    return this.httClient.get<UsuarioModel[]>('http://localhost:8080/api/v1/usuario'+'/list/'+id).pipe(map(res =>res));
  }
}

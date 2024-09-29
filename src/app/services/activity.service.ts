import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Activity } from '@interfaces/activity.interface';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  // Obtener una actividad aleatoria
  getRandomActivity(): Observable<Activity> {
    console.log(this.baseUrl);

    return this.http.get<Activity>(`/api/random`).pipe(
      tap((activity) =>
        console.log(`Actividad aleatoria: ${activity.activity}`)
      ),
      catchError(this.handleError)
    );
  }

  // Filtrar actividades por tipo o participantes
  filterActivities(
    type?: string,
    participants?: number
  ): Observable<Activity[]> {
    let params: { [key: string]: string | number } = {};

    if (type) params['type'] = type;
    if (participants) params['participants'] = participants;

    return this.http
      .get<Activity[]>(`/api/filter`, { params })
      .pipe(catchError(this.handleError));
  }

  // Obtener actividad por clave
  getActivityByKey(key: string): Observable<Activity> {
    return this.http
      .get<Activity>(`/api/activity/${key}`)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage =
      'Alguna cosa ha fallat; si us plau, intenta-ho més tard.';

    if (error.status === 0) {
      console.error('Error de xarxa o CORS: ', error);
    } else if (error.status === 429) {
      console.error(
        'Has arribat al límit de sol·licituds. Si us plau, espera una estona.'
      );
      errorMessage =
        'Has arribat al límit de sol·licituds. Si us plau, espera una estona.';
    } else {
      console.error(`Error ${error.status}: ${error.message}`);
    }

    return throwError(() => new Error(errorMessage));
  }
}

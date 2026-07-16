import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private http = inject(HttpClient);
  private config: any = null;

  loadConfig(): Promise<any> {
    console.log('loadConfig');
    // Получаем конфигурацию и сохраняем ее
    return firstValueFrom(
      this.http.get('./assets/config.json').pipe(
        tap(data => this.config = data)
      )
    );
  }

  getValue(key: string, defaultValue?: any): any {
console.log('getValue - ', this.config);
    return this.config[key] || defaultValue;
//        hostBackend: "http://10.0.0.204:8080/pa-web"
//        return 'http://10.0.0.204:8080/pa-web';
  };

}

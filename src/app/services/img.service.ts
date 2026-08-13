import {Injectable} from "@angular/core";
import { ConfigService } from './application/config.service';

/*
Использовать :
  protected imgS = inject(ImgService);

 */
@Injectable({
  providedIn: 'root'
})
export class ImgService {

  constructor(private configS: ConfigService) {
  }

  public getImgSrcDoc(id: number | null | undefined): string {
    return `${this.configS.getValue('hostBackend')}/img/doc/${id}.png`;
  }
  /**
   * В случае если изображение на сервере не найдено то грузим локальное изображение
   * @param event
   */
  public errorHandlerIMG(event: any, type: string): string {
    return `${this.configS.getValue('hostBackend')}/img/${type}/not.png`;
  }

}



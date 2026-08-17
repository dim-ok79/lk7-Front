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
/* TODO: не работает на 22
  public errorHandlerIMG(event: any, type: string): string {
    console.log('!!!!!! errorHandlerIMG =', type);
    console.log('!!!!!! URL =', `${this.configS.getValue('hostBackend')}/img/${type}/not.png`);
//    (event.target as HTMLImageElement).src = `${this.configS.getValue('hostBackend')}/img/${type}/not.png`;
    return `${this.configS.getValue('hostBackend')}/img/${type}/not.png`;
  }
*/
  public errorHandlerIMG(event: any, type: string){
    event.target.src = `${this.configS.getValue('hostBackend')}/img/${type}/not.png`
  }
}



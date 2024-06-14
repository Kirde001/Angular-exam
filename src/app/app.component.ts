import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public variantNumber: number = 10;

  constructor(
    private readonly _router: Router
  ) {
  }

  /**
   * Маршрутизация в приложении
   *
   * @param {string} page - название страницы
   */
  public appNavigate(page: string): void {
    this._router.navigate([page]);
  }

  /**
   * Метод загрузки архива с исходным кодом для экзамена
   */
  public downloadCodeByExamVariant(): void {
    window.open(`https://gubkin.space/techprog-exam/exam-variant-${this.variantNumber}-material.zip`, '_blank', 'noopener');
  }
}

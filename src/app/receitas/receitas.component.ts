import { Component } from "@angular/core";
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: "app-receitas",
  template: "<ion-router-outlet></ion-router-outlet>",
})
export class ReceitasComponent {
  constructor() {}
}

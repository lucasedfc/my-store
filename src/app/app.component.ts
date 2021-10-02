import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name: string = 'lucasedfc';
  age: number = 31;
  img: string = 'https://source.unsplash.com/random';
  btnDisabled = true;

  person = {
    name: 'lucasedfc',
    age: 31,
    avatar: 'https://i.pravatar.cc/100'
  }

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  addAge() {
    this.person.age += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }
}

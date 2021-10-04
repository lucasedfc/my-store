import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  box = {
    width: 100,
    height: 100,
    background: 'red',
  };

  widthImg = 10;
  name: string = 'lucasedfc';
  age: number = 31;
  img: string = 'https://source.unsplash.com/random';
  btnDisabled = true;

  person = {
    name: 'lucasedfc',
    age: 31,
    avatar: 'https://i.pravatar.cc/100',
  };

  names: string[] = ['michael', 'john', 'pam', 'david', 'angela'];
  newName = '';

  products: Product[] = [
    {
      name: 'The best toy',
      price: 565,
      image: './assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicycle',
      price: 356,
      image: './assets/images/bike.jpg',
    },
    {
      name: 'Album Collection',
      price: 34,
      image: './assets/images/album.jpg',
    },
    {
      name: 'My Books',
      price: 23,
      image: './assets/images/books.jpg',
    },
    {
      name: 'Dog House',
      price: 34,
      image: './assets/images/house.jpg',
    },
    {
      name: 'GLasses',
      price: 3434,
      image: './assets/images/glasses.jpg',
    },
  ];

  register = {
    name: '',
    email: '',
    password: '',
  };

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

  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }

  delName(index: number) {
    this.names.splice(index, 1);
  }

  onRegister() {
    console.log(this.register);

  }
}

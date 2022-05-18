const { Observable } = require("rxjs");
const { filter } = require("rxjs/operators");

const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("value 3");
    }, 3000);
  });
};

const doSomething$ = () => {
  return new Observable((observer) => {
    observer.next("value 1 $");
    observer.next("value 2 $");
    observer.next("value 3 $");
    observer.next(null);
    setTimeout(() => {
      observer.next("value 4 $");
    }, 3000);
    setTimeout(() => {
      observer.next(null);
    }, 3000);
    setTimeout(() => {
      observer.next("value 5 $");
    }, 3000);
  });
};

(async () => {
  const res = await doSomething();
  console.log(res);
})();

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe((res) => {
    console.log(res);
  });
})();

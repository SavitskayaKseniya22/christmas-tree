import 'normalize.css';
import './style.scss';
import './lib/header/header';
import './lib/footer/footer';
import './pages/main-page/main-page';
import './pages/toys-page/toys-page';
import './pages/game-page/game-page';

const routes: Record<
  string,
  {
    content: string;
    title: string;
    description: string;
  }
> = {
  '404': {
    content: `<main>404</main>`,
    title: '404',
    description: 'Page not found',
  },
  '/': {
    content: `<main is="main-page-custom"></main>`,
    title: 'Christmas tree',
    description: 'Christmas tree',
  },
  game: {
    content: `<main is="game-page-custom"></main>`,
    title: 'Game',
    description: 'Decorate the tree',
  },
  toys: {
    content: `<main is="toys-page-custom"></main>`,
    title: 'Toys',
    description: 'Choose some toys',
  },
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class App {
  static rerender(): void {
    const main = document.querySelector('main');

    if (main != null) {
      const location =
        window.location.hash.length === 0
          ? '/'
          : window.location.hash.replace('#', '');

      const activeRoute = location in routes ? routes[location] : routes['404'];

      main.outerHTML = activeRoute.content;

      document.title = activeRoute.title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', activeRoute.description);
    } else {
      this.render();
    }
  }

  static render(): void {
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<header is="header-custom"></header>
       <main is="main-page-custom"></main>
       <footer is="footer-custom"></footer>
      `
    );

    window.addEventListener(
      'hashchange',
      (e) => {
        App.rerender();
      },
      false
    );
    if (window.location.hash !== '') {
      App.rerender();
    }
  }
}

App.render();

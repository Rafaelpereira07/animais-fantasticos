import debounce from './debounce.js';

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  // Pega a ditância de cada item
  // em relação ao topo do site
  getDistance() {
    this.distace = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowMetade),
      };
    });
  }

  // Verifica a distância em cada objeto
  // em relação ao scroll do site
  checkDistance() {
    this.distace.forEach((item) => {
      if (window.scrollY > item.offset) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // Remove o event de Scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}

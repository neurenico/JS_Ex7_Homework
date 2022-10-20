class Pokemon {
    constructor(num, url) {
        this.url = url;
        this.num = num;

        this.content = document.querySelector('.content');
        this.site = document.querySelector('.site');

        this.item = document.createElement('div');
        this.item.className = 'content__item';
        this.content.append(this.item);

        this.imgBox = document.createElement('div');
        this.imgBox.className = 'content__img-box';
        this.item.append(this.imgBox);

        this.img = document.createElement('img');
        this.img.className = 'content__img';
        
        this.p = document.createElement('p');
        this.p.className = 'content__name';

        this.modalWrapper = document.createElement('div');
        this.modalWrapper.className = 'modal-wrapper';
        this.modalWrapper.setAttribute("style", "display: block");

        this.modalClose = document.createElement('button');
        this.modalClose.className = 'modal__close';
        this.modalClose.innerHTML = 'x';

        this.promise(this.url);

        this.item.addEventListener('click', () => this.promiseModal(url));
        this.modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        });
        this.modalWrapper.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        });
    }

    async promise(url) {
        this.response = await fetch(url);
        this.json = await this.response.json();

        this.promiseInPet(this.json);
    } 

    async promiseInPet(json) {
        this.response = await fetch(json.results[this.num].url);
        this.json = await this.response.json();
        
        this.putName();
        this.putImg();
    }

    putName() {
        this.p.innerHTML = this.json.name;
        this.item.append(this.p);
    }

    putImg() {
        this.img.setAttribute("src", this.json.sprites.other.dream_world.front_default);
        this.imgBox.append(this.img);
        if(!this.json.sprites.other.dream_world.front_default) this.img.setAttribute("src", "./img/297638030146211.png");
    }

    async promiseModal(url) {
        this.response = await fetch(url);
        this.json = await this.response.json();

        this.promiseForModal(this.json);
    }

    async promiseForModal(json) {
        this.response = await fetch(json.results[this.num].url);
        this.json = await this.response.json();

        this.createModal();
    }

    createModal() {
        this.site.append(this.modalWrapper);
        this.modalWrapper.setAttribute("style", "display: block");

        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modalWrapper.append(this.modal);

        this.modalName = document.createElement('h3');
        this.modalName.className = 'modal__name';
        this.modalName.innerHTML = this.json.name;
        this.modal.append(this.modalName);

        this.modalImgBox = document.createElement('div');
        this.modalImgBox.className = 'modal__img-box';
        this.modal.append(this.modalImgBox);

        this.modalImg = document.createElement('img');
        this.modalImg.className = 'modal__img';
        this.modalImg.setAttribute("src", this.json.sprites.other.dream_world.front_default);
        if(!this.json.sprites.other.dream_world.front_default) this.modalImg.setAttribute("src", "./img/297638030146211.png");
        this.modalImgBox.append(this.modalImg);

        this.titleAbilities = document.createElement('h4');
        this.titleAbilities.className = 'modal__title-abilities';
        this.titleAbilities.innerHTML = 'Abilities';
        this.modal.append(this.titleAbilities);

        this.abilities = document.createElement('div');
        this.abilities.className = 'modal__abilities';
        this.modal.append(this.abilities);
        
        this.modal.append(this.modalClose);

        for (let i of this.json.abilities) {
            this.ability = document.createElement('p');
            this.ability.className = 'modal__ability';
            this.ability.innerHTML = i.ability.name;
            this.abilities.append(this.ability);
        }
    }

    closeModal() {
        this.modalWrapper.setAttribute("style", "display: none");
    }
}

class List {
    constructor() {
        this.url = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

        this.content = document.querySelector('.content');
        this.nextBtn = document.querySelector('.btn-next');
        this.backBtn = document.querySelector('.btn-back');

        this.promise(this.url);
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.promise(this.json.next);
        });           
        this.backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.promise(this.json.previous);
        });           
    }

    async promise(url) {
        this.response = await fetch(url);
        this.json = await this.response.json();
        this.createList(url);
    }

    createList(url) {
        this.content.innerHTML = '';
        this.json.previous === null ? this.backBtn.setAttribute("disabled", "disabled") : this.backBtn.removeAttribute("disabled", "disabled"); 
        this.json.next === null ? this.nextBtn.setAttribute("disabled", "disabled") : this.nextBtn.removeAttribute("disabled", "disabled"); 
        for (let i = 0; i < this.json.results.length; i++) { new Pokemon(i, url);}
    }
}

let b = new List();







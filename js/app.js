
let mouseCursor = document.querySelector(".cursor");
let navItem = document.querySelectorAll('.nav-item');

window.addEventListener('mousemove', (e) => {
    console.log(e.pageX);
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
});

navItem.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCursor.classList.add('link-grow');
        link.classList.add('hovered-link');
    });
    link.addEventListener('mouseleave', () => {
        mouseCursor.classList.remove('link-grow');
        link.classList.remove('hovered-link');
    });
});

// Type writer
class TypeWriter {
    constructor(txtElement,words,wait=300) {
        this.txtElement = txtElement;
        this.words = words;
        this.wordIndex = 0;
        this.txt = '';
        this.wait = parseInt(wait, 10);
        this.isDeleting= false;
        this.type();
    }

    type() {
        const currentIndex = this.wordIndex % this.words.length;
        const fullWord = this.words[currentIndex];

        if(this.isDeleting) {
            //remove char
            this.txt = fullWord.substring(0, this.txt.length - 1);
        } else {
            //add char
            this.txt = fullWord.substring(0, this.txt.length + 1);
        }

        // output text into the element
        this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

        // type speed
        let typeSpeed = 100;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullWord) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}
//Initialize the app
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.mytxt');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement,words,wait);
}




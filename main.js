class Typewriter {
    constructor(txtElement,words,wait=1000){
        this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,7);
    this.type();
    this.isDeleting = false;
    }

    type(){
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
    
        if(this.isDeleting){
            this.txt = fullTxt.substring(0, this.txt.length-1);
    
        }else{
            this.txt = fullTxt.substring(0, this.txt.length+1);
        }
    
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
        let typespeed = 150;
    
        if(this.isDeleting){
            typespeed /=2;
        }
    
        if(!this.isDeleting && this.txt === fullTxt){
    
            typespeed = this.wait;
            this.isDeleting = true;
    
        }else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            this.wordIndex++;
            typespeed = 500;
        }
        setTimeout(()=> this.type(),typespeed);
    }
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // init typewriter
    new Typewriter(txtElement,words,wait)
}

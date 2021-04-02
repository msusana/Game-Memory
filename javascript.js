class Game{
    constructor(cards){
        this.cards = cards
        this.emojis = []
        this.ths = document.querySelectorAll('th');
        this.modal = document.querySelector('.modal-content');
    }

    verification(img1, img2){
        if(img1.getAttribute('data-icon') === img2.getAttribute('data-icon')){ 
            this.caseCard(img1, img2)
            this.showModal()

        }else {
            setTimeout(() => {
                
                this.resetCard(img1,img2)
            }, 500);
        }
        this.emojis = []
        
    }

    initGame(){
        this.initEventListener();
        this.cards =  this.cards.sort(() => Math.random() - 0.5)
        
        for (let i = 0; i <  this.cards.length; i++) {
            this.ths[i].setAttribute('data-icon', this.cards[i])
            
        }
        
    }
    initEventListener(){
        
        this.ths.forEach((th)=>{
            th.addEventListener('click',function(event){
                if(event.target.getAttribute('id')=== 'img'){
                        game.play(event.target)
                }
                
            })
        })
        
        
    }

    play(th){
       
        this.emojis.push(th)
        th.innerHTML = th.getAttribute('data-icon') 
        th.style.pointerEvents = 'none'
        
        if( this.emojis.length === 2){
            if( this.emojis[0] &&  this.emojis[1]){
                game.verification( this.emojis[0], this.emojis[1]);
            }
        }
    }

    caseCard(th1, th2){
        th1.id='select'
        th2.id='select'

    }

    resetCard(th1, th2){
        th1.innerHTML = '?'
        th2.innerHTML = '?'
        th1.style.pointerEvents = 'auto'
        th2.style.pointerEvents = 'auto'
    }

    restartGame(){
        this.ths.forEach(th => {
            th.id = 'img'
            th.innerHTML = '?'
        });
    }
    
    showModal(){
        this.selected = document.querySelectorAll('#select')
     if( this.selected.length === this.cards.length){
        this.modal.style.display="block" 
     }    
 }
  

    }
 

var cardsFacile = [
    '&#128525;','&#128525;',
	'&#128561;','&#128561;',
	'&#128564;','&#128564;',
	'&#128520;','&#128520;',
	'&#128545;','&#128545;',
	'&#129313;','&#129313;',   
];

var cardsMoyen = [
    '&#128525;','&#128525;',
	'&#128561;','&#128561;',
	'&#128564;','&#128564;',
	'&#128520;','&#128520;',
	'&#128545;','&#128545;',
	'&#129313;','&#129313;',
    '&#128519', '&#128519',
    '&#128523', '&#128523',
    '&#128526', '&#128526',
    '&#128531', '&#128531',
    '&#128587', '&#128587',
    '&#128540', '&#128540',   
];

var cardsDifficile = [
    '&#128525;','&#128525;','&#128561;','&#128561;','&#128564;','&#128564;',
	'&#128520;','&#128520;','&#128545;','&#128545;','&#129313;','&#129313;', 
	'&#128519', '&#128519', '&#128523', '&#128523','&#128526', '&#128526',
	'&#128531', '&#128531', '&#128548', '&#128548', '&#128570', '&#128570',
	'&#128585', '&#128585', '&#128587', '&#128587','&#128540', '&#128540',     
];

var cardsBuilding = [
    '🏢' , '🏢', '🏚️', '🏚️', '🏠', '🏠', '🏣', '🏣', '🏤', '🏤','🏥', '🏥', '🏦', '🏦', 
    '🏨', '🏨', '🏪', '🏪', '🏫', '🏫', '🏬', '🏬', '🏭', '🏭', '🏯', '🏯', '🏰', '🏰',
    '⛪', '⛪', '🏘️', '🏘️', '🏛️', '🏛️', '🏗️', '🏗️'   
]

var cardsAnimal = [
    '😺', '😺', '🐵', '🐵', '🐒', '🐒', '🦍', '🦍', '🐕', '🐕', '🐩', '🐩', '🐺', '🐺',
    '🦊', '🦊', '🦝', '🦝', '🦁', '🦁', '🐴', '🐴', '🦄', '🦄'
]

/* mes variables */
const time = document.querySelector(".temp");
let game;
let minutes = 0;
let secundes = 0; 
let temps;
const jeux = document.querySelector('.jeux');
const icon = document.querySelector('.emogis');
const over = document.querySelector('.over');
const button = document.querySelector('.button');
const table = document.querySelector('.game');
let start = document.querySelector('.text');
let difficile = document.querySelector('#cardsDifficile');
let facile = document.querySelector('#cardsFacile');
let moyen = document.querySelector('#cardsMoyen');
let building = document.querySelector ('#cardsBuilding')
let animal = document.querySelector ('#cardsAnimal')
let startGames = document.querySelectorAll('#button');
let difficileDiv = document.querySelector('.difficile');
let facileDiv = document.querySelector('.facile');
let moyenDiv = document.querySelector('.moyen');
let buildingDiv = document.querySelector ('.building');
let animalDiv = document.querySelector ('.animal');
let modalClose = document.getElementsByClassName("close");
const rules = document.querySelector('.rules');

var emogis = [];
let img1;
let img2;

startGames.forEach((startGame)=>{
    startGame.addEventListener('click',function(event){
        numero = event.target.getAttribute('id')
           difficulteCase(numero) 
           
          
        })
        
    })

function difficulteCase(numero){
    let difficulte; 
        switch(numero){
            case 'cardsDifficile':
                difficulte = cardsDifficile;
                break; 
        
            case 'cardsMoyen':
                difficulte = cardsMoyen;
                break; 
            
            case 'cardsFacile':
                difficulte = cardsFacile;
                break; 
            
            case 'cardsBuilding':
                difficulte = cardsBuilding;
                break; 
            
            case 'cardsAnimal':
                difficulte = cardsAnimal;
                break; 
        }
        rules.style.display = "block"
        genera_tabla(difficulte)
        depart(difficulte, numero) 
}

function depart(iconos, niveau){
    game = new Game(iconos)
    game.initGame()
    minutes = 0
    secundes = 0
    afficherGame(niveau);
    temp(); 

    if (verificationRestart()){
        game.restartGame()
        cacheOver()  
    }
    
}

function afficherGame(niveau){
    if(getComputedStyle(jeux).display != "block"){
            jeux.style.display ="block"
            icon.style.display = "none"
            difficileDiv.style.display="none"
            facileDiv.style.display="none"
            moyenDiv.style.display="none"
            buildingDiv.style.display="none"
            animalDiv.style.display = "none"
            button.style.display = "none"

            switch(niveau){
                case 'cardsDifficile':
                    difficile.innerHTML='restart the game'
                    break; 
                
                case 'cardsMoyen':
                    moyen.innerHTML='restart the game'
                    break; 
                
                case 'cardsFacile':
                    facile.innerHTML='restart the game'
                    break; 
                
                case 'cardsBuilding':
                    building.innerHTML='restart the game'
                    break; 

                case 'cardsAnimal':
                    animal.innerHTML='restart the game'
                    break; 
                
            }
            
        }
}

function cacheOver(){
     time.style.display = "block"
    over.style.display = "none"
}

function temp(){
	 temps = setInterval(function() {
		secundes++;
			if (secundes === 60) {
				minutes++;
				secundes = 0;
			}
        if (minutes === 5){
            gameover(temps) 
        }
		time.innerHTML = "<div class='tempsActuel'><p> Temps: " + minutes + " mins " + secundes + " sec </p> </div>" ;
	}, 1000);  
}

function verificationRestart(){
    if(difficile.innerText ==='restart the game'){
        return true
        }
            else if(moyen.innerText ==='restart the game'){
                return true

                } else if(facile.innerText ==='restart the game'){
                    return true

                        }else if(building.innerText ==='restart the game'){
                            return true 

                        }else if(animal.innerText ==='restart the game'){
                            return true 
                            
                            }else{
                                return false
            
        } 
}


function displayButtom(){
    
    if(difficile.innerText ==='restart the game'){
    difficileDiv.style.display = 'block'
    }
        else if(moyen.innerText ==='restart the game'){
            moyenDiv.style.display ='block'
    }   
            else if(building.innerText ==='restart the game'){
                buildingDiv.style.display ='block'

                }else if(animal.innerText ==='restart the game'){
                    animalDiv.style.display ='block'

                }else{
                    facileDiv.style.display ='block'
                
        
    }
}

function gameover(temps){
    jeux.style.display ="none"
    over.style.display = "block"
    time.style.display = "none"
    displayButtom()
    minutes = 0
    secundes = 0
    clearInterval(temps) 
}

function genera_tabla(numero) {
     
    table.innerHTML= "";
      var file = document.createElement("tr");
        file.classList.add('row-reverse', 'd-flex' ,'flex-wrap','justify-content-center')
      for (var j = 0; j < numero.length; j++) {
        
        var celda = document.createElement("th");
        var textoCelda = document.createTextNode("?");
        celda.classList.add('col-12','col-sm-6', 'col-md-4', 'col-lg-2')
        celda.appendChild(textoCelda);
        file.appendChild(celda);
        celda.setAttribute("id", "img");
      }
      table.appendChild(file);
  }





 



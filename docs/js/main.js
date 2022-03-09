var sprite = document.querySelector(".sprite")
var spriteAliado1 = document.querySelector(".aliado-1")
var enemySprite1 = document.querySelector(".enemy-1")
var enemySprite2 = document.querySelector(".enemy-2")
var x = 0;
var screenWidth = screen.width;
class Personaje{
	constructor(nombre, life, x, obj, mov) {
	    this.nombre = nombre;
	    this.life = life;
	    this.vivo = true;
	    this.x = x;
	    this.obj = obj;
	    this.mov = mov;
	    this.status = -1;
	    this.barraLife= this.obj.firstElementChild;
	}
	animar(clase) {
		if(this.vivo){
			this.obj.classList.add(clase)
			setTimeout(() => {
				this.obj.classList.remove(clase)
			}, 500);
		}	
 	}
 	rotar(num){
 		if(this.vivo){
	 		this.obj.style =  `
				transform: scaleX(${num});
			`;
			if(!(this.x<=0 && num == -1) && !(this.x>=screenWidth && num==1)){
				this.x = (num > 0)?this.x+this.mov:this.x-this.mov; 
				this.status = num;
			}
			this.status = num;
			this.obj.style.left = `${this.x}px`;
		}
	}
	ataque(arrayEnemi, damage){
		if(this.vivo){
			arrayEnemi.forEach((enemy)=>{
				let distancia = enemy.x - this.x;
				if (((distancia >= 0 && distancia <= 35) && this.status == 1) || (distancia <= 0 && distancia >= -35) && this.status == -1) {
					enemy.life -= damage;	
					if (enemy.life <= 0) {
						enemy.obj.classList.add("muerte");
						setTimeout(() => {
							enemy.obj.classList.add("desaparecer");
						}, 500);
						enemy.vivo = false

					}else{
						enemy.barraLife.style= `width: ${enemy.life}%`;
						enemy.animar("recibir-daño")
					}
				}
			})
		}
	}
	activarBot(array){
		const animarEnemigo = setInterval(() =>{
			let objetivo = array.find(e => e.vivo)
		
			if(this.life <= 0 || (!objetivo)){
				clearInterval(animarEnemigo)
			}else{
				console.log(objetivo)
				let distancia = objetivo.x - this.x;
				if(distancia < -30 && this.status ){
					this.animar("correr-izquierda")
					this.rotar(-1)
				}else if(distancia > 30){
					this.animar("correr-derecha")
					this.rotar(1)
				}else{
					console.log(this.nombre + "_ataque")
					if(Math.random() > 0.5){
						this.animar("ataque-basico");
						this.ataque(array, 8)	
					}else{
						this.animar("ataque-especial");	
						this.ataque(array, 15)	
					}
				}
			}
			
		}, 1100);
	}
}

const you = new Personaje("Yo",100, 0, sprite, 40)
const aliado = new Personaje("Aliado", 100, 120, spriteAliado1, 60)
var equipoVerde = [you, aliado]

const enemy = new Personaje("enemigo 1", 100, screenWidth - 120, enemySprite1, 30)
const enemy2 = new Personaje("enemigo 2", 100, screenWidth - 200, enemySprite2, 50)
var equipoRed = [enemy, enemy2]


	enemy.activarBot(equipoVerde)
	enemy2.activarBot(equipoVerde)
	aliado.activarBot(equipoRed)





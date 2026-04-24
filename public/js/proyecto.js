
//LOGICA DE LOS BOTONES DE CANTIDAD DE PRODUCTO:
let cantidad=0

const botonSubir = document.getElementById('b-mas');
const botonBajar = document.getElementById('b-menos');
const mostrar = document.getElementById('cantidad');

botonSubir.addEventListener('click', () =>{
    cantidad++;
    mostrar.textContent=cantidad;
});

botonBajar.addEventListener('click',() =>{
    if (cantidad > 0){
        cantidad--;
        mostrar.textContent=cantidad;
    }
});

let cantidad2 = 0

const botonSubir2 = document.getElementById('b-mas-2');
const botonBajar2 = document.getElementById('b-menos-2');
const mostrar2 = document.getElementById('cantidad-2')

botonSubir2.addEventListener('click',() =>{
    cantidad2++;
    mostrar2.textContent=cantidad2;
});

botonBajar2.addEventListener('click',() => {
    if (cantidad2 > 0){
        cantidad2--;
        mostrar2.textContent=cantidad2;
    }
});

let cantidad3 = 0

const botonSubir3=document.getElementById('b-mas-3');
const botonBajar3=document.getElementById('b-menos-3');
const mostrar3=document.getElementById('cantidad-3');

botonSubir3.addEventListener('click',() => {
    cantidad3++;
    mostrar3.textContent=cantidad3;
});

botonBajar3.addEventListener('click',() =>{
    if(cantidad3 > 0){
        cantidad3--;
        mostrar3.textContent=cantidad3;
    }
});

let cantidad4 = 0

const botonSubir4=document.getElementById('b-mas-4');
const botonBajar4=document.getElementById('b-menos-4');
const mostrar4=document.getElementById('cantidad-4');

botonSubir4.addEventListener('click',() =>{
    cantidad4++;
    mostrar4.textContent=cantidad4;
});

botonBajar4.addEventListener('click',() =>{
    if(cantidad4 > 0){
        cantidad4--;
        mostrar4.textContent=cantidad4;
    }
});

let cantidad5=0

const botonSubir5=document.getElementById('b-mas-5');
const botonBajar5=document.getElementById('b-menos-5');
const mostrar5=document.getElementById('cantidad-5');

botonSubir5.addEventListener('click',() =>{
    cantidad5++;
    mostrar5.textContent=cantidad5
});

botonBajar5.addEventListener('click',() =>{
    if(cantidad5 > 0){
        cantidad5--;
        mostrar5.textContent=cantidad5;
    }
});

let cantidad6=0

const botonSubir6=document.getElementById('b-mas-6');
const botonBajar6=document.getElementById('b-menos-6');
const mostrar6=document.getElementById('cantidad-6');

botonSubir6.addEventListener('click',() =>{
    cantidad6++;
    mostrar6.textContent=cantidad6;
});

botonBajar6.addEventListener('click',()=>{
    if(cantidad6 > 0){
        cantidad6--;
        mostrar6.textContent=cantidad6;
    }
});

let cantidad7=0

const botonSubir7=document.getElementById('b-mas-7');
const botonBajar7=document.getElementById('b-menos-7');
const mostrar7=document.getElementById('cantidad-7');

botonSubir7.addEventListener('click',() =>{
    cantidad7++;
    mostrar7.textContent=cantidad7;
});

botonBajar7.addEventListener('click',() =>{
    if(cantidad7 > 0){
        cantidad7--;
        mostrar7.textContent=cantidad7;
    }
});

let cantidad8=0

const botonSubir8=document.getElementById('b-mas-8');
const botonBajar8=document.getElementById('b-menos-8');
const mostrar8=document.getElementById('cantidad-8');

botonSubir8.addEventListener('click',()=>{
    cantidad8++;
    mostrar8.textContent=cantidad8;
});

botonBajar8.addEventListener('click',()=>{
    if(cantidad8 > 0){
        cantidad8--;
        mostrar8.textContent=cantidad8;
    }
}); 

let cantidad9=0

const botonSubir9=document.getElementById('b-mas-9');
const botonBajar9=document.getElementById('b-menos-9');
const mostrar9=document.getElementById('cantidad-9');

botonSubir9.addEventListener('click',()=>{
    cantidad9++;
    mostrar9.textContent=cantidad9;
});

botonBajar9.addEventListener('click',()=>{
    if(cantidad9 > 0){
        cantidad9--;
        mostrar9.textContent=cantidad9;
    }
});


let cantidad10=0

const botonSubir10=document.getElementById('b-mas-10');
const botonBajar10=document.getElementById('b-menos-10');
const mostrar10=document.getElementById('cantidad-10');

botonSubir10.addEventListener('click',()=>{
    cantidad10++;
    mostrar10.textContent=cantidad10;
});

botonBajar10.addEventListener('click',()=>{
    if(cantidad10 > 0){
        cantidad10--;
        mostrar10.textContent=cantidad10;
    }
});

let cantidad11=0

const botonSubir11=document.getElementById('b-mas-11');
const botonBajar11=document.getElementById('b-menos-11');
const mostrar11=document.getElementById('cantidad-11');

botonSubir11.addEventListener('click',()=>{
    cantidad11++;
    mostrar11.textContent=cantidad11;
});

botonBajar11.addEventListener('click',()=>{
    if(cantidad11 > 0){
        cantidad11--;
        mostrar11.textContent=cantidad11;
    }
});


let cantidad12=0

const botonSubir12=document.getElementById('b-mas-12');
const botonBajar12=document.getElementById('b-menos-12');
const mostrar12=document.getElementById('cantidad-12');

botonSubir12.addEventListener('click',()=>{
    cantidad12++;
    mostrar12.textContent=cantidad12;
});

botonBajar12.addEventListener('click',()=>{
    if(cantidad12 > 0){
        cantidad12--;
        mostrar12.textContent=cantidad12;
    }
});

//LOGICA DE REGISTER_LOGIN USUARIO
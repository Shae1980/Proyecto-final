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

const urlApi= 'https://mindicador.cl/api/'
const btnBuscar = document.querySelector('#buscar')
const inputCant = document.querySelector('#cant')
const total = document.querySelector('#resultado')
let grafico =document.querySelector('#grafico')
let myChart

//habilito código en botón buscar
btnBuscar.addEventListener('click', ()=>{
    const moneda=document.querySelector('#monedas').value;
    obtenerDatosMoneda (moneda)
})

//obtiene valores de api
const getDatos = async (url) =>{
    try {
        const response= await fetch(url)
        return await response.json()
    } catch (error) {alert('Problema al ejecutar API')}
}

//calcula con valores de api y devuelve al dom el cálculo
const obtenerDatosMoneda = async(mon) =>{
    try {
        const valores = await getDatos(`${urlApi}${mon}`)
        const datosFecha = valores.serie.splice(0,10);
        total.innerHTML= `${(valores.serie[0].valor*inputCant.value).toLocaleString()} ${valores.unidad_medida}` 
        buscarDatosGrafico(datosFecha)        
    } catch (error) {alert('Problema al calcular resultado')}
} 

//obtiene todos los valores a graficar
const buscarDatosGrafico = (datosFecha)=>{
    const fechas = datosFecha.map(dato => dato.fecha)
    const montos = datosFecha.map(dato => dato.valor)
    graficar(montos,fechas)
} 

//grafica usando el chart
const graficar =(valores, fechas)=>{
    if (myChart) myChart.destroy()
    myChart = new Chart(grafico,{
        type:'line',
        data: {
            labels: fechas,
            datasets: [
                {
                    label: `Valores últimos 10 días`,
                    data: valores,
                    backgroundColor: "rgba(60, 153, 143)",
                    borderWidth: 2, 
                }
            ]
        }
    })
}

//funcion normaliza fecha
const fechaArg = (fecha) => {
    let dia;
    let mes;
    let año;

    const fechaSinHora = fecha.split('T'); //result: [ '2024-06-24', '14:09:41.813Z' ]
    const fechaCompleta = fechaSinHora[0].split('-'); //result: [ '2024', '06', '24' ]

    dia = fechaCompleta[2];
    mes = fechaCompleta[1];
    año = fechaCompleta[0];

    return dia+"-"+mes+"-"+año;
};
//console.log("f:", fechaArg('2024-06-27T14:22:35.861Z'));
export {
    fechaArg,
}



/*

function fechaArg(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    const year = date.getUTCFullYear();
    
    return `${day}/${month}/${year}`;
}



*/
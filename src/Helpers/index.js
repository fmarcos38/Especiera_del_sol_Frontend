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

export {
    fechaArg,
}
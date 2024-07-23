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

//funcion transforma números a num dinero
function formatMoney(amount) {
    if (amount == null) {
        return '0.00'; // Valor por defecto si amount es null o undefined
    }
    return amount.toLocaleString('de-DE'/* , { minimumFractionDigits: 2, maximumFractionDigits: 2 } */);
}

//misma q la de arriba pero le añade coma
/* function formatMoneyComa(amount) {
    return amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
} */
//funcion pasa de la fecha --> Mon Jul 15 2024 11:36:50 GMT-0300 (hora estándar de Argentina)
//a la fecha así --> 15/07/2024
function formatDate(dateString) {
    const date = new Date(dateString);

    // Obtener el día, mes y año de la fecha
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexed
    const year = date.getFullYear();

    // Formatear día y mes para que siempre tengan dos dígitos
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Retornar la fecha en el formato deseado
    return `${formattedDay}/${formattedMonth}/${year}`;
}


export {
    fechaArg,
    formatMoney,
    formatDate,
}
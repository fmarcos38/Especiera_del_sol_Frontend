//obtengo data user log
const userLogData = () => {
    const data = JSON.parse(localStorage.getItem('userData'));
    return data;
};

//logout
const logout =() =>{
    localStorage.removeItem("userData");
}

//creo numRemito en el localStarage en 1 --> luego se va a ir incrementando
const numRemito = 0;
localStorage.setItem("numRemito", numRemito);

//obtengo el numRemito
const numRemitoActual = () => {
    return Number(localStorage.getItem("numRemito"));
};


export {
    userLogData,
    logout,
    numRemitoActual,
}
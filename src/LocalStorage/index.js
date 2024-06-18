//obtengo data user log
const userLogData = () => {
    const data = JSON.parse(localStorage.getItem('userData'));
    return data;
};

//logout
const logout =() =>{
    localStorage.removeItem("user");
}

export {
    userLogData,
    logout
}
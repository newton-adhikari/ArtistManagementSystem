const getCurrentDateTime = () => {
    const currentDate = new Date();

    const formattedDate = currentDate.toISOString(); 

    return formattedDate.split(/[T|Z]/).join(" ");
}

module.exports = { getCurrentDateTime };


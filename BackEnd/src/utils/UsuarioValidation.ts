export function cpfValidation(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
        return false;

    let soma = 0;
    for(let i=0; i<9; i++)
        soma += parseInt(cpf.charAt(i)) * (10-i);

    let resto = 11 - (soma % 11);
    if(resto === 10 || resto === 1)
        resto = 0;
    if(resto !== parseInt(cpf.charAt(9)))
        return false;

    soma = 0;
    for(let i=0; i<10; i++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);

    resto = 11 - (soma % 11);
    if(resto === 10 || resto === 11)
        resto = 0;
    if(resto !== parseInt(cpf.charAt(10)))
        return false;

    return true;
}

export function emailValidation(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
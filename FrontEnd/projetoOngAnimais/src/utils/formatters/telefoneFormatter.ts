export const telefoneFormatter = (telefone: string): string => {
    const telLimpo = String(telefone).replace(/\D/g, '');

    const length = telLimpo.length;

    if(length > 10)
        return telLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    
    if(length > 6)
        return telLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

    return telLimpo;
}
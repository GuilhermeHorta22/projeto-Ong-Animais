export const cpfFormatter = (cpf: string): string => {
    const cpfLimpo = String(cpf).replace(/\D/g, '');

    const cpfMaximo = cpfLimpo.substring(0, 11);

    return cpfMaximo
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
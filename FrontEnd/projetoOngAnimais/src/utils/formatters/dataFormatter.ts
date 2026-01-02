export const dataFormatter = (dataString: string): string => {
    const data = new Date(dataString);

    return data.toLocaleDateString('pt-BR');
}
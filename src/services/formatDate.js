

export function formatDateWithNameMes(date){
    let meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    date = new Date(date);
    // date = date.toLocaleDateString('pt-br');
    return `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
}
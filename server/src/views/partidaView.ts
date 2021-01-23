import Partida from '../models/partida';

export default {

    render(partida: Partida): object{
        return {
            Id: partida.id,
            Divisao: partida.divisao.nome,
            Time1: partida.time1.nome,
            Time2: partida.time2.nome,
            dataHora: partida.dataHora
        }
    },

    renderMany(partidas: Partida[]){
        return partidas.map(partida => this.render(partida));
    }
}
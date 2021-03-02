import Divisao from '../models/divisao';

export default {

    render(divisao: Divisao){
        return {
            Id: divisao.id,
            Nome: divisao.nome,
            Times: divisao.times.map(time => time.nome),
            Partidas: divisao.partidas.map(partida => partida.id)
        }
    },

    renderMany(divisaos: Divisao[]){
        return divisaos.map(divisao => this.render(divisao));
    }
}
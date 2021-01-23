import Time from '../models/time';

export default {

    render(time: Time){

        return {
            Id: time.id,
            Nome: time.nome,
            Divisao: time.divisao.nome,
            Lider: time.lider.nick,
            Logo: time.logo,
            Jogadores: time.jogadores.map(jogador => jogador.nick),
        }
    },

    renderMany(times: Time[]){
        return times.map(time => this.render(time));
    }
}
import Time from '../models/time';

const url = 'http://localhost:3333/uploads/';

export default {

    render(time: Time){

        let divisao;
        if(time.divisao === null){
            divisao = '';
        }else {
            divisao = time.divisao.nome;
        }

        return {
            id: time.id,
            nome: time.nome,
            lider: time.lider.nick,
            divisao,
            logo: `${url}${time.logo}`,
            jogadores: time.jogadores.map(jogador => {
                const jogadorObjeto = {
                    nick: jogador.nick,
                    avatar: `${url}${jogador.avatar}`
                }
                return jogadorObjeto;
            }),
        }
    },

    renderMany(times: Time[]){
        return times.map(time => this.render(time));
    }
}
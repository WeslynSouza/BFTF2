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
            lider: {
                nick: time.lider.nick,
                avatar: time.lider.avatar !== '' ? `${url}${time.lider.avatar}` : ''
            },
            divisao,
            logo: time.logo !== '' ? `${url}${time.logo}`: '',
            jogadores: time.jogadores.map(jogador => {
                const jogadorObjeto = {
                    nick: jogador.nick,
                    avatar: time.lider.avatar !== '' ? `${url}${time.lider.avatar}` : ''
                }
                return jogadorObjeto;
            }),
        }
    },

    renderMany(times: Time[]){
        return times.map(time => this.render(time));
    }
}
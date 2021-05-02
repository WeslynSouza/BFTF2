import Time from '../models/time';

const url = 'http://localhost:3333/uploads/';

export default {

    render(time: Time){

        let divisao;
        if(time.divisao.id === 1){
            divisao = '';
        }else {
            divisao = time.divisao.nome;
        }

        return {
            id: time.id,
            nome: time.nome,
            lider: {
                steamId: time.lider.steamId,
                nick: time.lider.nick,
                avatar: time.lider.avatar !== '' ? `${url}${time.lider.avatar}` : ''
            },
            divisao,
            logo: time.logo !== '' ? `${url}${time.logo}`: '',
            jogadores: time.jogadores.map(jogador => {
                const jogadorObjeto = {
                    steamId: time.lider.steamId,
                    nick: jogador.nick,
                    avatar: time.lider.avatar !== '' ? `${url}${time.lider.avatar}` : ''
                }
                return jogadorObjeto;
            }),
            ativo: time.ativo
        }
    },

    renderMany(times: Time[]){
        return times.map(time => this.render(time));
    }
}
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

        const lider = {
            id: time.lider.id,
            nick: time.lider.nick,
            avatar: time.lider.avatar !== '' ? `${url}${time.lider.avatar}` : ''
        }

        const viceLider = {
            id: time.viceLider?.id || '',
            nick: time.viceLider?.nick || '',
            avatar: time.viceLider?.avatar !== undefined ? `${url}${time.viceLider?.avatar}` : ''
        }

        const jogadores = time.jogadores.map(jogador => {
            const jogadorObjeto = {
                id: jogador.id,
                nick: jogador.nick,
                avatar: jogador.avatar !== '' ? `${url}${jogador.avatar}` : ''
            }
            return jogadorObjeto;
        });

        
        console.log(jogadores);

        const liderIndice = jogadores.findIndex(jogadores => jogadores.id == lider.id);
        jogadores.splice(liderIndice, 1);

        if(lider.id != viceLider.id){
            const viceLiderIndice = jogadores.findIndex(jogadores => jogadores.id == viceLider.id);
            jogadores.splice(viceLiderIndice, 1);
        }

        return {
            id: time.id,
            nome: time.nome,
            lider: lider,
            viceLider: time.viceLider != undefined ? viceLider : "",
            divisao,
            logo: time.logo !== '' ? `${url}${time.logo}`: '',
            jogadores: lider.id != viceLider.id ? [ lider, viceLider ].concat(jogadores) : [ lider ].concat(jogadores),
            ativo: time.ativo
        }
    },

    renderMany(times: Time[]){
        return times.map(time => this.render(time));
    }
}
import Usuario from '../models/usuario';

export default {

    render(usuario: Usuario){
        const url = 'http://localhost:3333/uploads/';
        let time;

        if(!usuario.time){
            time = '';
        } else {
            time = {nome: usuario.time.nome, logo: `${url}${usuario.time.logo}`}
        }

        return {
            steamId: usuario.steamId,
            nick: usuario.nick,
            avatar: usuario.avatar !== '' ? `${url}${usuario.avatar}` : '',
            time,
            elegivel: usuario.elegivel,
            classes: usuario.classes.map(classe => {
                return { id: classe.id ,nome: classe.nome }
            }),
            posts: usuario.posts.map(post => {
                return {
                    titulo: post.titulo
                }
            })
        }
    },

    renderMany(usuarios: Usuario[]){
        return usuarios.map(usuario => this.render(usuario));
    }
}
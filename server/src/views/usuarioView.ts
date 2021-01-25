import Time from '../models/time';
import Usuario from '../models/usuario';

export default {
    render(usuario: Usuario){
        return {
            SteamId: usuario.steamId,
            Nick: usuario.nick,
            Avatar: usuario.avatar,
            Classes: usuario.classes.map(classe => classe.nome),
            Posts: usuario.posts.map(post => {
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
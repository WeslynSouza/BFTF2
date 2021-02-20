import Post from '../models/post';
import ImagemView from './imagemView';

export default {

    render(post: Post){
        return {
            Id: post.id,
            Autor: post.autor.nick,
            Titulo: post.titulo,
            Conteudo: post.conteudo,
            Imagens: ImagemView.renderMany(post.imagens)
        }
    },

    renderMany(posts: Post[]){
        return posts.map(post => this.render(post));
    }
}
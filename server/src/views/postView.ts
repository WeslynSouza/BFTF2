import Post from '../models/post';
import ImagemView from './imagemView';

export default {

    render(post: Post){
        return {
            id: post.id,
            autor: post.autor.nick,
            titulo: post.titulo,
            conteudo: post.conteudo,
            imagens: ImagemView.renderMany(post.imagens)
        }
    },

    renderMany(posts: Post[]){
        return posts.map(post => this.render(post));
    }
}
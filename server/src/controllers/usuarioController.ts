import { Request, Response } from 'express';
import { getRepository, Like, Not } from 'typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import * as yup from 'yup';
import Classe from '../models/classe';
import Time from '../models/time';

import Usuario from '../models/usuario';
import UsuarioView from '../views/usuarioView';
import User_atividade from '../models/user_atividade';

export default {

    async index(req: Request, res: Response) {

        const usuarioRepository = getRepository(Usuario);

        try {
            const usuarios = await usuarioRepository.find({
                where: { id: Not(1) },
                relations: ['time', 'classes', 'posts', 'atividades']
            });
    
            return res.status(200).json(UsuarioView.renderMany(usuarios));
        } catch {
            return res.status(400).send("Nenhum jogador foi encontrado!");
        }
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const usuarioRepository = getRepository(Usuario);

        try {
            const usuario = await usuarioRepository.findOneOrFail( id, {
                where: { id: Not(1) },
                relations: ['time', 'classes', 'posts', 'atividades']
            });
    
            return res.status(200).json(UsuarioView.render(usuario));
        } catch {
            return res.status(400).send("Jogador não encontrado!");
        }
    },

    async showMany(req: Request, res: Response) {

        const { nick } = req.params;

        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.find({
           where:{ id: Not(1), nick: Like(`${nick}%`) },
            relations: ['time', 'classes', 'posts', 'atividades']
        });

        return res.status(200).json(UsuarioView.renderMany(usuario));
    },

    async create(req: Request, res: Response){

        const senhaRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

        const {
            nick,
            senha,
            confirmarSenha
        } = req.body;

        if(!senha.match(senhaRegex)){
            return res.status(400).send( 
                'Senha precisa ter uma letra maiúscula, uma letra minúscula, um número, um caractere especial(@#$%) e tamanho entre 6-20.'
            )
        }

        const salt = genSaltSync();
        const senhaHash = hashSync(senha, salt);
        if(!compareSync(String(confirmarSenha), senhaHash)){
            return res.status(400).send('As senhas não conferem.')
        }
        
        const usuarioRepository = getRepository(Usuario);
        const timeRepository = getRepository(Time);
        
        try {
            await usuarioRepository.findOneOrFail(nick);

            return res.status(400).send("Esse usuário já está cadastrado no sistema!");
        } catch {

            const timePadrao = await timeRepository.findOneOrFail(1);
    
            const requestImages = req.files as Express.Multer.File[];
            let avatar = '';
            if(requestImages.length > 0) {
                avatar = requestImages[0].filename;
            }

            const dataDeCriacao = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

            const atividades = [{
                tipo: 1,
                data: dataDeCriacao,
            }]
            
            const data = {
                nick,
                //steamId: '',
                senha: senhaHash,
                classes: [],
                avatar,
                acesso: 0,
                elegivel: 0,
                time: timePadrao,
                atividades
            }
    
            const schema = yup.object().shape({
                nick: yup.string().required(),
                steamId: yup.string(),
                senha: yup.string().required(),
                classes: yup.array(),
                avatar: yup.string(),
                acesso: yup.number(),
                elegivel: yup.number(),
                time: yup.object().required(),
                atividades: yup.array()
            })
    
            await schema.validate(data, {
                abortEarly: true,
            });
    
            try {
                const usuario = usuarioRepository.create(data);
    
                await usuarioRepository.save(usuario);
        
                return res.status(201).send('O usuário foi cadastrado com sucesso!');
            } catch {
                return res.status(400).send("Não foi possível realizar o cadastro!");
            }
        }
    },

    async login(req: Request, res: Response) {

        const nick = req.body.nick || '';
        const senha = req.body.senha || '';

        const usuarioRepository = getRepository(Usuario);

        try {
            const usuario =  await usuarioRepository.findOne({
                where: { nick },
                relations: [ 'time', 'posts', 'classes' ]
            })

            if(usuario && compareSync(senha, usuario.senha)){
                return res.status(200).json(UsuarioView.render(usuario));
            }else {
                return res.status(400).send('Usuário/Senha inválidos!');
            } 
        } catch {
            return res.status(400).send("Não foi possível realizar o login!");
        }
    },

    async update(req: Request, res: Response) {

        const { id } = req.params;

        const {
            nick,
            steamId,
            acesso,
            avatar,
            classes,
            elegivel
        } = req.body;

        const usuarioRepository = getRepository(Usuario);
        const classeRepository = getRepository(Classe);

        try {
            const usuario = await usuarioRepository.findOneOrFail( id, {
                where: { id: Not(1) },
                relations: ['time', 'classes', 'posts']
            });

            const classesAtualizadas: Array<Classe> = [];

            if(classes) {
                for (const i in classes) {
                    if (Object.prototype.hasOwnProperty.call(classes, i)) {    
                        classesAtualizadas.push( await classeRepository.findOneOrFail(Number(classes[i])))
                    }
                }
            }

            let newAvatar = usuario.avatar;
            const requestImages = req.files as Express.Multer.File[];
            if(avatar == ''){
                newAvatar = '';
            }
            if(requestImages.length !== 0){
                newAvatar = requestImages[0].filename;
            }

            const data = {
                id: Number(id),
                nick: nick || usuario.nick,
                steamId,
                senha: usuario.senha,
                acesso: acesso || usuario.acesso,
                avatar: newAvatar,
                classes: classesAtualizadas.length == 0 ? usuario.classes : classesAtualizadas,
                elegivel: elegivel == '' ? usuario.elegivel : elegivel,
                time: usuario.time
            }

            const schema = yup.object().shape({
                id: yup.number().required(),
                nick: yup.string().required(),
                steamId: yup.string(),
                senha: yup.string().required(),
                classes: yup.array(),
                avatar: yup.string(),
                acesso: yup.number(),
                elegivel: yup.number(),
                time: yup.object().required(),
            });

            await schema.validate(data, {
                abortEarly: true,
            });

            const newUsuario = usuarioRepository.create(data);

            await usuarioRepository.save(newUsuario);
    
            return res.status(201).send('O usuário foi alterado com sucesso!');
        } catch {
            return res.status(400).send("Não foi possível realizar a alteração!");
        }
    },

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        const usuarioRepository = getRepository(Usuario);

        try {
            const usuario = await usuarioRepository.findOneOrFail( id, {
                where: { id: Not(1) },
            });

            await usuarioRepository.remove(usuario);

            return res.status(200).send('O usuário foi excluído com sucesso!');
        } catch {
            return res.status(400).send("Não foi possível realizar a exclusão!");
        }
    },

    async entrarNoTime(req: Request, res: Response) {
        const { id, idTime } = req.params;
        
        const usuarioRepository = getRepository(Usuario);
        const timeRepository = getRepository(Time);

        try {
            const usuario = await usuarioRepository.findOneOrFail(id, {
                relations: ['time', 'classes', 'posts', 'atividades']
            });

            if(usuario.time.id !== 1){
                return res.status(400).send("O usuario faz parte de um time!");
            }
            
            const time = await timeRepository.findOneOrFail(idTime, {
                where: { id: Not(1) },
                relations: ['lider', 'divisao', 'jogadores']
            });

            if(time.jogadores.length == 1){
                try {
                    const dataTime: Time = {
                        id: time.id,
                        nome: time.nome,
                        logo: time.logo,
                        lider: time.lider,
                        viceLider: usuario,
                        jogadores: time.jogadores,
                        divisao: time.divisao,
                        ativo: time.ativo,
                    }
    
                    const newTime = timeRepository.create(dataTime);
    
                    await timeRepository.save(newTime);
                } catch {
                    return res.status(400).send("Deu erro aqui!")
                }

            }

            const dataAtividade = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

            const novaAtividade: User_atividade = {
                usuario,
                tipo: 2,
                data: dataAtividade,
                nomeTime: time.nome,
            }

            const { nick, steamId, senha, classes, avatar, acesso, elegivel, posts, atividades } = usuario;

            let data: Usuario

            if(steamId == null) {
                data = {
                    id: Number(id),
                    nick,
                    senha,
                    classes,
                    avatar,
                    acesso,
                    time,
                    elegivel,
                    posts,
                    atividades: atividades.concat([novaAtividade])
                }
            } else {
                data = {
                    id: Number(id),
                    nick,
                    steamId,
                    senha,
                    classes,
                    avatar,
                    acesso,
                    time,
                    elegivel,
                    posts,
                    atividades: atividades.concat([novaAtividade])
                }
            }

            const schema = yup.object().shape({
                id: yup.number().required(),
                nick: yup.string().required(),
                steamId: yup.string(),
                senha: yup.string().required(),
                classes: yup.array(),
                avatar: yup.string(),
                acesso: yup.number(),
                elegivel: yup.number(),
                time: yup.object().required(),
                posts: yup.array(),
                atividades: yup.array(),
            });

            await schema.validate(data, {
                abortEarly: true,
            });

            const newUsuario = usuarioRepository.create(data);

            await usuarioRepository.save(newUsuario);
    
            return res.status(201).send(`O jogador ${nick} foi adicionado ao time ${time.nome}.`);
        } catch {
            return res.status(400).send("Não foi possível adicionar o jogador ao time!")
        }
    },

    async deixarTime(req: Request, res: Response){
        const { id } = req.params;

        const usuarioRepository = getRepository(Usuario);
        const timeRepository = getRepository(Time);

        try {
            const usuario = await usuarioRepository.findOneOrFail(id, {
                where: { id: Not(1)},
                relations: ['time', 'classes', 'posts', 'atividades' ]
            });

            const antigoTime = await timeRepository.findOneOrFail(usuario.time.id, {
                where: { id: Not(1) },
                relations: ['lider', 'viceLider', 'divisao', 'jogadores']
            })

            const timePadrao = await timeRepository.findOneOrFail(1);

            const dataAtividade = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

            const novaAtividade: User_atividade = {
                usuario,
                tipo: 3,
                data: dataAtividade,
                nomeTime: antigoTime.nome
            }
            const { nick, steamId, senha, classes, avatar, acesso, elegivel, posts, atividades } = usuario;

            let dataUsuario: Usuario;

            if(steamId == null){
                dataUsuario = {
                    id: Number(id),
                    nick,
                    senha,
                    classes,
                    avatar,
                    acesso,
                    time: timePadrao,
                    elegivel,
                    posts,
                    atividades: atividades.concat([novaAtividade])
                }
            } else {
                dataUsuario = {
                    id: Number(id),
                    nick,
                    steamId,
                    senha,
                    classes,
                    avatar,
                    acesso,
                    time: timePadrao,
                    elegivel,
                    posts,
                    atividades: atividades.concat([novaAtividade])
                }
            }

            const schema = yup.object().shape({
                id: yup.number().required(),
                nick: yup.string().required(),
                steamId: yup.string(),
                senha: yup.string().required(),
                classes: yup.array(),
                avatar: yup.string(),
                acesso: yup.number(),
                elegivel: yup.number(),
                time: yup.object().required(),
                posts: yup.array(),
                atividades: yup.array()
            });

            await schema.validate(dataUsuario, {
                abortEarly: true,
            });

            const newUsuario = usuarioRepository.create(dataUsuario);

            if(antigoTime.jogadores.length == 1){
                
                await usuarioRepository.save(newUsuario);

                await timeRepository.remove(antigoTime);
            }else if(usuario.id == antigoTime.lider.id && antigoTime.viceLider != undefined){

                const liderIndice = antigoTime.jogadores.findIndex(jogadores => jogadores.id == antigoTime.lider.id);
                antigoTime.jogadores.splice(liderIndice, 1);
                const viceLiderIndice = antigoTime.jogadores.findIndex(jogadores => jogadores.id == antigoTime.viceLider?.id);
                antigoTime.jogadores.splice(viceLiderIndice, 1);
                
                const dataTime: Time = {
                    id: antigoTime.id,
                    nome: antigoTime.nome,
                    logo: antigoTime.logo,
                    lider: antigoTime.viceLider,
                    viceLider: antigoTime.jogadores.length == 2 ? antigoTime.viceLider : antigoTime.jogadores[0],
                    divisao: antigoTime.divisao,
                    ativo: antigoTime.ativo,
                    jogadores: antigoTime.jogadores
                };

                const newTime = timeRepository.create(dataTime);
                await timeRepository.save(newTime);

                await usuarioRepository.save(newUsuario);
            }
            await usuarioRepository.save(newUsuario);
        
            return res.status(200).send(`O jogador ${nick} foi removido do time!`);
        } catch {
            return res.status(400).send("Não foi possível remover o jogador!");
        }
    }
}
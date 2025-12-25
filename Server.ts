import { app } from "./app"
import * as z from "zod"
import Usuario, * as User from "./src/Usuario"
import Tarefa from "./src/Tarefa"
import { StatusTarefa } from "./src/enum/EnumStatusTarefa"
import { DificuldadeTarefa } from "./src/enum/EnumDificuldadeTarefa"


const porta = 3000
app.listen(porta, () => console.log("O servidor esta rodando"))


app.get("/usuarios", (req, res) => {
    res.send(User.listaUsuarios)
})

app.post("/usuarios/criarUsuario", (req, res) => {

    const reqEsquema = z.object(
        {
            nomeUsuario: z.string(),
            emailUsuario: z.email(),
            senhaUsuario: z.string().min(8),
            profissaoUsuario: z.string().optional()
        }
    )

    const requisicao = reqEsquema.safeParse(req.body)

    if (!requisicao.success) {
        return res.status(400).json({
            erro: "dados invalidos!",
            detalhes: requisicao.error
        })
    }

    const { nomeUsuario, emailUsuario, senhaUsuario, profissaoUsuario } = requisicao.data

    const novoUsuario = new Usuario(
        nomeUsuario,
        emailUsuario,
        senhaUsuario,
        profissaoUsuario
    )

    User.listaUsuarios.push(novoUsuario)

    res.send("Usuario adicionado com sucesso")

})


app.post("/usuarios/deletarUsuario", (req, res) => {

    const reqEsquema = z.object({
        emailUsuarioProcurado: z.email(),
        senhaUsuarioProcurado: z.string()
    })

    const requisicao = reqEsquema.safeParse(req.body)

    if (!requisicao.success) {
        return res.status(400).json({
            erro: "dados invalidos!",
            descricao: requisicao.error
        })
    }

    const { emailUsuarioProcurado, senhaUsuarioProcurado } = requisicao.data

    const indexUsurioExcluido = User.listaUsuarios.findIndex(usuario => usuario.emailUsuario == emailUsuarioProcurado && usuario.compararSenha(senhaUsuarioProcurado))


    if (indexUsurioExcluido != -1) {

        User.listaUsuarios.splice(indexUsurioExcluido, 1)

        res.status(200).send("Usuario removido com sucesso!")

    } else {
        res.status(400).send("Email não encontrado " + emailUsuarioProcurado)
    }

})


const reqEsquema = z.object({
    idUsuario: z.int(),
    nomeTarefa: z.string().max(50),
    descricaoTarefa: z.string(),
    statusTarefa: z.string<StatusTarefa>(),
    dificuldadeTarefa: z.string<DificuldadeTarefa>()

})

app.post("/usuario/criarTarefa", (req, res) => {

    const requisicao = reqEsquema.safeParse(req.body)

    if (!requisicao.success) {
        return res.json({
            erro: "Dados invalido!",
            descricao: requisicao.error
        })
    }

    const { idUsuario, nomeTarefa, descricaoTarefa, statusTarefa, dificuldadeTarefa } = requisicao.data

    const usuarioRequerido = User.listaUsuarios.find(usuario => usuario.compararId(idUsuario))

    if (usuarioRequerido !== undefined) {
        usuarioRequerido.tarefasUsuario.push(new Tarefa(
            nomeTarefa,
            descricaoTarefa,
            statusTarefa,
            dificuldadeTarefa
        ))

        return res.send("tarefa adicionada com sucesso")

    } else {
        return res.send("Esse id não existe")
    }

})
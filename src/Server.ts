import { app } from "./App"
import * as z from "zod"

//? Importação das classes usadas
import User, * as U from "../src/User"
import Task from "./Task"

//? Iportação dos Enums usados
import { StatusTask } from "./enum/EnumTaskState"
import { DifficultTask } from "./enum/EnumTaskDifficult"


const port = 3000
app.listen(port, () => console.log("The server is running"))

//? Método para pegar todas os usuarios
app.get("/users", (req, res) => {
    res.send(U.Users)
})

//? Método para criar usuario
app.post("/users/resgister-user", (req, res) => {

    const reqSchema = z.object(
        {
            name: z.string(),
            email: z.email(),
            password: z.string().min(8),
        }
    )

    const request = reqSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).json({
            erro: "Invalid data",
            description: request.error
        })
    }

    const { name, email, password } = request.data

    const isInUseEmail = U.Users.find(userAlreadyRegistered => userAlreadyRegistered.email === email) instanceof User

    if (isInUseEmail) {
        return res.status(401).send("E-mail already in use")
    }

    const newUser = new User(
        name,
        email,
        password
    )

    U.Users.push(newUser)

    res.send("User successfully registered")

})

//? Método para deletar usuarios
app.post("/users/delete-user", (req, res) => {

    const reqSchema = z.object({
        emailWanted: z.email(),
        passwordWanted: z.string()
    })

    const request = reqSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).json({
            erro: "Invalid data",
            description: request.error
        })
    }

    const { emailWanted, passwordWanted } = request.data

    const deletedUserIndex = U.Users.findIndex(user => user.email == emailWanted && user.comparePassword(passwordWanted))


    if (deletedUserIndex != -1) {

        U.Users.splice(deletedUserIndex, 1)

        res.status(200).send("User successfully deleted ")

    } else {
        res.status(400).send("Not found e-mail " + emailWanted)
    }

})


//? Método para criar uma tarefa
app.post("/usuario/create-task", (req, res) => {
    const reqSchema = z.object({
        id: z.number().int(),
        taskName: z.string().max(50),
        taskDescription: z.string(),
        taskState: z.union([z.literal(0), z.literal(1), z.literal(2)]),
        taskDifficulty: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    })

    const request = reqSchema.safeParse(req.body)

    if (!request.success) {
        return res.json({
            erro: "Invalid data!",
            descricao: request.error
        })
    }

    const { id, taskName, taskDescription, taskState, taskDifficulty } = request.data

    const difficultyMap = {
        0: DifficultTask.Undefined,
        1: DifficultTask.Ease,
        2: DifficultTask.Medium,
        3: DifficultTask.Hard
    }
    const taskDifficultyConverted = difficultyMap[taskDifficulty as keyof typeof difficultyMap] ?? DifficultTask.Undefined

    const stateMap = {
        0: StatusTask.Pending,
        1: StatusTask.InProgress,
        2: StatusTask.Finished
    }
    const taskStateConverted = stateMap[taskState as keyof typeof stateMap] ?? StatusTask.Pending


    const userWanted = U.Users.find(user => user.compareId(id))

    if (userWanted !== undefined) {
        userWanted.userTasks.push(new Task(
            userWanted.userTasks.length + 1,
            taskName,
            taskDescription,
            taskStateConverted,
            taskDifficultyConverted
        ))

        return res.send("Task added successfully")

    } else {
        return res.send("Not found id!")
    }

})
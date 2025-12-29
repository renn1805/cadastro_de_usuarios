import { app } from "./app"
import * as z from "zod"

import User, * as U from "../src/User"
import Task from "./Task"

import { TaskStatus } from "./enum/TaskStatus"
import { TaskDifficulty } from "./enum/TaskDifficulty"


const port = 3000
app.listen(port, () => console.log("The server is running"))

app.get("/users", (req, res) => {
    return res.status(200).send(U.Users)
})

app.post("/users", (req, res) => {

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
            error: "Invalid data",
            description: request.error
        })
    }

    const { name, email, password } = request.data

    const isEmailAlreadyUsed = U.Users.find(user => user.email === email) instanceof User

    if (isEmailAlreadyUsed) {
        return res.status(400).send("E-mail already in use!")
    }

    const newUser = new User(
        name,
        email,
        password
    )

    U.Users.push(newUser)

    //? status 201 serve para mostrar que algo foi criado com sucesso
    res.status(201)

})

app.post("/users/delete", (req, res) => {

    const reqSchema = z.object({
        email: z.email(),
        password: z.string()
    })

    const request = reqSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).json({
            error: "Invalid data",
            description: request.error
        })
    }

    const { email, password } = request.data

    const userIndex = U.Users.findIndex(user => user.email == email && user.comparePassword(password))
    const wasUserFound = userIndex === -1

    if (wasUserFound) {
        return res.status(404).send("Not found e-mail!")
    }

    U.Users.splice(userIndex, 1)

    //? status 204 mostra que a operação deu certo mas sem retorno, muito usado para operações de deletar
    res.status(204).send("User successfully deleted!")

})

app.post("/users/task", (req, res) => {

    const reqSchema = z.object({
        id: z.number().int(),
        title: z.string().max(50),
        description: z.string(),
        status: z.union([z.literal(0), z.literal(1), z.literal(2)]),
        difficulty: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    })

    const request = reqSchema.safeParse(req.body)

    if (!request.success) {
        return res.status(400).json({
            error: "Invalid data!",
            description: request.error
        })
    }

    const { id, title, description, status, difficulty } = request.data

    const difficultyMap = {
        0: TaskDifficulty.Undefined,
        1: TaskDifficulty.Easy,
        2: TaskDifficulty.Medium,
        3: TaskDifficulty.Hard
    }
    const difficultyConverted = difficultyMap[difficulty as keyof typeof difficultyMap] ?? TaskDifficulty.Undefined

    const stateMap = {
        0: TaskStatus.Pending,
        1: TaskStatus.InProgress,
        2: TaskStatus.Finished
    }
    const taskStateConverted = stateMap[status as keyof typeof stateMap] ?? TaskStatus.Pending

    const userWanted = U.Users.find(user => user.compareId(id))
    const wasUserFound = userWanted !== undefined

    if (wasUserFound) {

        userWanted.userTasks.push(new Task(
            userWanted.userTasks.length + 1,
            title,
            description,
            taskStateConverted,
            difficultyConverted
        ))

        return res.status(201)

    } else {
        return res.status(404).send("Not found id!")
    }
})
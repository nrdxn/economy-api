import { NestFactory } from "@nestjs/core"
import { AppModule } from "@App/app.module"
import { WebSocketServer } from "ws"

async function start() {
    const app = await NestFactory.create(
        AppModule, 
        {
            cors: true
        }
    )
  
    await app.setGlobalPrefix('api')
    await app.listen(4200)

    const wss = new WebSocketServer(
        { 
            port: 4530
        }
    )
    wss.on('listening', () => console.log('listening'))
    wss.on('connection', 
        (ws) => 
            {
                ws.on('message', 
                    (data) => wss.clients.forEach((c) => c.send(data))
                )
                ws.send('connect')
            }
    )
    wss.on('error', (err) => console.log(err))
}

start()
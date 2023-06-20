import express from "express";
import http from "http";
import { Server } from "socket.io";
import { join } from "path";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
	res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () =>
	console.log(`✅ Server running: http://localhost:${PORT}`);

server.listen(PORT, handleListening);

io.on("connection", (socket) => socketController(socket, io));

package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Data struct {
	Type        string
	Name        string
	Content     string
	PlayerCount int
}

type Player struct {
	Name       string
	Connection *websocket.Conn
	Lives      int
	mu         sync.Mutex
}

type Room struct {
	Players          map[string]*Player
	PlayerCount      int
	MaxPlayers       int
	WaitingTime      time.Duration
	CountdownTime    time.Duration
	CountdownStarted bool
	GameStarted      bool
	playersMutex     sync.Mutex
}

var (
	upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
	room     = &Room{
		Players:       make(map[string]*Player),
		PlayerCount:   0,
		MaxPlayers:    4,
		WaitingTime:   20 * time.Second,
		CountdownTime: 10 * time.Second,
	}
	broadcast = make(chan Data)
)

func CloseConn(Conn *websocket.Conn) {
	if Conn == nil {
		log.Println("Connection is already closed or nil")
		return
	}
	err := Conn.Close()
	if err != nil {
		if websocket.IsUnexpectedCloseError(err) {
			log.Println("Error closing connection: ", err)
		}
	}
}

func handleJoin(Conn *websocket.Conn, name string) {
	room.playersMutex.Lock()
	defer room.playersMutex.Unlock()
	if room.GameStarted {
		Conn.WriteJSON(Data{Type: "gameStarted", Content: "the game has already started please retry later"})
		return
	}
	if _, found := room.Players[name]; !found {
		player := &Player{
			Name:       name,
			Connection: Conn,
			Lives:      3,
		}
		room.Players[name] = player
		room.PlayerCount++

		broadcast <- Data{
			Type:        "playerJoin",
			Content:     name + " joined the game ",
			PlayerCount: room.PlayerCount,
		}
		startWaitingTime()
	} else {
		Conn.WriteJSON(Data{Type: "InvalidName", Content: "This pseudo is already used, please choose another one"})
		return
	}
}

// 	room.playersMutex.Lock()
// 	defer room.playersMutex.Unlock()
// 	if room.GameStarted {
// 		player := room.Players[name]
// 		player.mu.Lock()
// 		Conn.WriteJSON(Data{Type: "gameStarted", Content: "the game has already started please retry later"})
// 		player.mu.Unlock()
// 		CloseConn(Conn)
// 		return
// 	}
// 	if _, found := room.Players[name]; !found {
// 		player := &Player{
// 			Name:       name,
// 			Connection: Conn,
// 			Lives:      3,
// 		}
// 		room.Players[name] = player
// 		room.PlayerCount++
// 		fmt.Println("icic", room.PlayerCount)
// 		fmt.Println("player", player)
// 		fmt.Println("room ", room)
// 		broadcast <- Data{
// 			Type:        "playerJoin",
// 			Content:     name + " joined the game ",
// 			PlayerCount: room.PlayerCount,
// 		}
// 	} else {
// 		Conn.WriteJSON(Data{Type: "InvalidName", Content: "This pseudo is already used, please choose another one"})
// 		CloseConn(Conn)
// 		return
// 	}
// }

func broadcastPlayerMsg(msg Data) {
	for _, player := range room.Players {
		player.mu.Lock()
		player.Connection.WriteJSON(Data{Type: msg.Type, Name: player.Name, Content: msg.Content, PlayerCount: room.PlayerCount})
		player.mu.Unlock()
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	Conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading the HTTP connection to WebSocket: ", err)
		return
	}
	defer CloseConn(Conn)

	for {
		var data Data
		err := Conn.ReadJSON(&data)
		if err != nil {
			if websocket.IsCloseError(err, websocket.CloseGoingAway) {
				handlePlayerDisconnect(Conn)
				break
			}
			handlePlayerDisconnect(Conn)
			continue
		}
		switch data.Type {
		case "join":
			handleJoin(Conn, data.Name)
		case "playerJoin":
			{
				broadcast <- Data{
					Type:    "playerJoin",
					Content: data.Name + "join the game ",
				}
			}
		case "Msg":
			{
				broadcast <- Data{
					Type:    "Msg",
					Name:    data.Name,
					Content: data.Content,
				}
			}
		case "Action":
			{
				broadcast <- Data{
					Type:    "Action",
					Name:    data.Name,
					Content: data.Content,
				}
			}
		default:
			Conn.WriteJSON(Data{Type: "error", Content: "Invalid Data format"})
		}
	}
}

func handlePlayerDisconnect(Conn *websocket.Conn) {
	room.playersMutex.Lock()
	defer room.playersMutex.Unlock()
	for _, player := range room.Players {
		if player.Connection == Conn {
			removePlayer(player)
			return
		}
	}
}

func removePlayer(Player *Player) {
	delete(room.Players, Player.Name)
	room.PlayerCount--
	broadcast <- Data{
		Type:        "playerLeave",
		Name:        Player.Name,
		Content:     "has left the room",
		PlayerCount: room.PlayerCount,
	}
}

func startWaitingTime() {
	if room.PlayerCount == room.MaxPlayers {
		room.GameStarted = true
		broadcast <- Data{
			Type: "startCountDown",
		}
	} else if room.PlayerCount >= 2 {
		time.AfterFunc(room.WaitingTime, func() {
			room.GameStarted = true
			broadcast <- Data{
				Type: "startCountDown",
			}
		})
	}
}

func main() {
	http.HandleFunc("/", handleConnections)

	go func() {
		for {
			msg := <-broadcast
			broadcastPlayerMsg(msg)
			fmt.Println("room", room)
		}
	}()

	fmt.Println("Server is running on port: 8989...")
	log.Fatal(http.ListenAndServe(":8989", nil))
}

package main

import (
	"crypto/rand"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

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
			Content:     takePlayersNames(room.Players),
			PlayerCount: room.PlayerCount,
		}
		startWaitingTime()
	} else {
		Conn.WriteJSON(Data{Type: "InvalidName", Content: "This pseudo is already used, please choose another one"})
		return
	}
}

func takePlayersNames(players map[string]*Player) string {
	var names string
	for name := range players {
		names += name + "*"
	}
	return names
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func broadcastPlayerMsg(msg Data) {
	for name, player := range room.Players {
		fmt.Println("name", name)
		player.mu.Lock()
		player.Connection.WriteJSON(Data{Type: msg.Type, Name: player.Name, Content: msg.Content, PlayerCount: room.PlayerCount})
		player.mu.Unlock()
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func Matrix() [][]rune {
	matrix := [][]rune{
		{'m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm', ' ', 'm'},
		{'m', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'm'},
		{'m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm'},
	}

	for x, row := range matrix {
		for y, col := range row {
			if col == ' ' && Corner(x, y) == "none" {
				matrix[x][y] = randomize()
			}
		}
	}

	return matrix
}

//---------------------------------------------------------------------------------------

func Corner(x, y int) string {
	switch true {
	// Will be usefull for players to spawn
	case (x == 1 && y == 1):
		return "top_left"
	case (x == 1 && y == 13):
		return "top_right"
	case (x == 13 && y == 1):
		return "bottom_left"
	case (x == 13 && y == 13):
		return "bottom_right"

	// Neighbors to let enough space to players.
	case (x == 1 && y == 2) ||
		(x == 2 && y == 1) ||
		(x == 1 && y == 12) ||
		(x == 2 && y == 13) ||
		(x == 13 && y == 2) ||
		(x == 12 && y == 1) ||
		(x == 13 && y == 12) ||
		(x == 12 && y == 13):
		return "neighbors"

	default:
		return "none"
	}
}

//---------------------------------------------------------------------------------------

func randomize() rune {
	max := big.NewInt(100)
	randInt, err := rand.Int(rand.Reader, max)
	if err != nil {
		fmt.Println("Error generating random number:", err)
		return 'b'
	}

	switch true {
	case randInt.Int64() < 50:
		return 'b'

		// 10% chance to spawn a power up.
	case randInt.Int64()%5 == 0:
		switch true {
		case randInt.Int64()%2 == 0:
			return 'x'
		case randInt.Int64()%3 == 0:
			return 'y'
		default:
			return 'z'
		}
	}
}

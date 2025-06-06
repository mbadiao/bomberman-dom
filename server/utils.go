package main

import (
	"bomberman-dom/server/utils"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func handleJoin(Conn *websocket.Conn, name string) {
	room.playersMutex.Lock()
	defer room.playersMutex.Unlock()

	var alertData = Data{Type: "alert"}

	if room.GameStarted {
		alertData.Content = "Game already started."
	}

	if !utils.Valid(name) {
		alertData.Content = "Only accept lowercase letters."
	}

	// Check if the player's name has already been taken
	// before allowing him to play.
	if _, found := room.Players[name]; found {
		alertData.Content = "Pseudo already taken."
	}

	if alertData.Content != "" {
		Conn.WriteJSON(alertData)
		return
	}

	player := &Player{
		Name:       name,
		Connection: Conn,
		Lives:      3,
	}

	room.Players[name] = player

	broadcast <- Data{
		Type:        "playerJoin",
		Name:        name,
		Content:     takePlayersNames(room.Players),
		PlayerCount: room.PlayerCount,
	}

	room.PlayerCount++

	startWaitingTime()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func takePlayersNames(players map[string]*Player) string { // REVIEW: Function name seems confusing...
	var names string

	for name := range players {
		names += name + "*"
	}

	return names
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func startWaitingTime() {
	if countdownStarted {
		return
	}

	if room.PlayerCount >= room.MaxPlayers {
		startCountdown()
	} else if room.PlayerCount >= 2 {
		time.AfterFunc(room.WaitingTime, func() {
			room.playersMutex.Lock()
			defer room.playersMutex.Unlock()
			if !room.GameStarted && room.PlayerCount >= 2 {
				startCountdown()
			}
		})
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func startCountdown() {
	if countdownStarted {
		return
	}
	countdownStarted = true
	room.GameStarted = true
	broadcast <- Data{
		Type: "startCountDown",
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func broadcastPlayerMsg(msg Data) { // REVIEW: Function name could be more concise... // TODO: broadcastMsg() {}
	for _, player := range room.Players {
		if msg.Type == "GameOver" && msg.Name == player.Name {
			send(msg, player)

		}
		if msg.Type != "GameOver" {
			send(msg, player)
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func send(msg Data, player *Player) {
	player.mu.Lock()
	player.Connection.WriteJSON(Data{ // FIX: Handle Error...
		Type:        msg.Type,
		Name:        msg.Name,
		Content:     msg.Content,
		PlayerCount: room.PlayerCount,
		Map:         msg.Map,
	})
	player.mu.Unlock()
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

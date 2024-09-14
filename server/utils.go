package main

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
	for _, player := range room.Players {
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

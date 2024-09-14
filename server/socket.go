package main

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

package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

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
	map = Matrix()
)

///////////////////////////////////////////////////////////////////////////////////////////////////

func main() {
	http.HandleFunc("/", handleConnections)
	go func() {
		for {
			msg := <-broadcast
			broadcastPlayerMsg(msg)
			fmt.Println("room", room.Players)
		}
	}()

	fmt.Println("Server is running on port: 8989...")
	log.Fatal(http.ListenAndServe(":8989", nil))
}

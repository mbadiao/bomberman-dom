package main

import (
	"bomberman-dom/server/utils"
	"fmt"
	"log"
	"net/http"
	"time"

	// "bomberman-dom/utils"

	"github.com/gorilla/websocket"
)

var ( // REVIEW: All global variables should be in UPPERCASE...
	upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
	room     = &Room{
		Players:       make(map[string]*Player),
		PlayerCount:   0,
		MaxPlayers:    4,
		WaitingTime:   20 * time.Second,
		CountdownTime: 10 * time.Second,
	}
	broadcast             = make(chan Data)
	MAP                   = utils.Matrix()
	countdownStarted bool = false
)

///////////////////////////////////////////////////////////////////////////////////////////////////

func main() {
	http.HandleFunc("/", handleConnections)

	go func() {
		for {
			msg := <-broadcast
			broadcastPlayerMsg(msg)
			fmt.Println("room", room.Players) // DEBUG: Check Player List...
		}
	}()

	utils.OpenLink("http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

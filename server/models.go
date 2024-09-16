package main

import (
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Map struct {
	matrix [][]rune
}

type Data struct {
    Type    string `json:"type"`
	Name    string `json:"name"`
    Content string `json:"content"`
	PlayerCount int `json:"playerCount"`
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

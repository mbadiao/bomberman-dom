package main

import (
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Data struct {
	Type        string   `json:"type"`
	Name        string   `json:"name"`
	Content     string   `json:"content"` // REVIEW: Could be an interface...
	PlayerCount int      `json:"playerCount"`
	Map         [][]rune `json:"map"`
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

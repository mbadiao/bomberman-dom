package main

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

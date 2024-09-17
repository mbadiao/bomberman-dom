package utils

import (
	"fmt"
	"os/exec"
	"runtime"
)
func Open_Local_Host(URL string) {
	var cmd *exec.Cmd
	
	// Set Up Command
	switch runtime.GOOS {
	case "linux":
		cmd = exec.Command("xdg-open", URL)
	case "windows":
		cmd = exec.Command("start", URL)
	case "darwin":
		cmd = exec.Command("open", URL)
	default:
		return
	}

	// Start Command
	if err := cmd.Start(); err != nil {
		fmt.Println("Failed to auto launch localhost\n", err, "\nClick the link to open localhost")
		fmt.Println("Server started on port http://localhost:8989")
	}
}

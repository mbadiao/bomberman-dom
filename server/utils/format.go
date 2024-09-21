package utils

func Valid(name string) bool {
	for _, r := range name {
		if r < 'a' || r > 'z' {
			return false
		}
	}

	return true
}
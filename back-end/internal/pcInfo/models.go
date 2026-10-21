package pcInfo

type DatetimeResponseBody struct {
	Date string `json:"date"`
	Time string `json:"time"`
}

type MemoryResponseBody struct {
	TotalGB float64 `json:"totalGB"`
	UsadoGB float64 `json:"usadoGB"`
}

type CpuResponyBody struct {
	Heartz float64 `json:"heartz"`
	Usado  float64 `json:"usado"`
	Cores  int     `json:"cores"`
}

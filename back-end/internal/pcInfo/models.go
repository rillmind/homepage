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

type DiskResponseBody struct {
	Total       uint64  `json:"total"`
	Used        uint64  `json:"used"`
	Free        uint64  `json:"free"`
	UsedPercent float64 `json:"usedPercent"`
}

type UptimeResponseBody struct {
	Uptime uint64 `json:"uptime"`
}

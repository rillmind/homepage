package pcInfo

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/host"
	"github.com/shirou/gopsutil/v4/mem"
)

const GB = 1024 * 1024 * 1024

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /datetime/info/", h.GetDatetimeInfo)
	mux.HandleFunc("GET /memory/info/", h.GetMemoryInfo)
	mux.HandleFunc("GET /cpu/info/", h.GetCpuInfo)
	mux.HandleFunc("GET /disk/info/", h.GetDiskInfo)
	mux.HandleFunc("GET /uptime/info/", h.GetUptimeInfo)
}

func (h *Handler) GetDatetimeInfo(w http.ResponseWriter, req *http.Request) {
	now := time.Now()

	rb := DatetimeResponseBody{
		Date: now.Format("02/01/2006"),
		Time: now.Format("15:04"),
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

func (h *Handler) GetMemoryInfo(w http.ResponseWriter, req *http.Request) {
	v, err := mem.VirtualMemory()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rb := MemoryResponseBody{
		TotalGB: float64(v.Total) / GB,
		UsadoGB: float64(v.Total-v.Available) / GB,
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

func (h *Handler) GetCpuInfo(w http.ResponseWriter, req *http.Request) {
	info, err := cpu.Info()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	percent, err := cpu.Percent(time.Second, false)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	cores, err := cpu.Counts(true)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	rb := CpuResponyBody{
		Heartz: info[0].Mhz,
		Usado:  percent[0],
		Cores:  cores,
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

func (h *Handler) GetDiskInfo(w http.ResponseWriter, req *http.Request) {
	disco, err := disk.Usage("/")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	rb := DiskResponseBody{
		uint64(disco.Total / GB),
		uint64(disco.Used / GB),
		uint64(disco.Free / GB),
		disco.UsedPercent,
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

func (h *Handler) GetUptimeInfo(w http.ResponseWriter, req *http.Request) {
	uptime, err := host.Uptime()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	rb := UptimeResponseBody{
		uptime,
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

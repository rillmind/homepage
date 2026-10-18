package pcInfo

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/shirou/gopsutil/v4/mem"
)

const GB = 1024 * 1024 * 1024

type DatetimeResponseBody struct {
	Date string `json:"date"`
	Time string `json:"time"`
}

type MemoryResponseBody struct {
	TotalGB float64 `json:"totalGB"`
	UsadoGB float64 `json:"usadoGB"`
}

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /datetime/info/", h.GetDatetimeInfo)
	mux.HandleFunc("GET /memory/info/", h.GetMemoryInfo)
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

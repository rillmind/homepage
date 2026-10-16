package memory

import (
	"encoding/json"
	"net/http"

	"github.com/shirou/gopsutil/v4/mem"
)

const GB = 1024 * 1024 * 1024

type ResponseBody struct {
	TotalGB float64 `json:"totalGB"`
	UsadoGB float64 `json:"usadoGB"`
}

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /memory/info/", h.GetInfo)
}

func (h *Handler) GetInfo(w http.ResponseWriter, req *http.Request) {
	v, err := mem.VirtualMemory()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rb := ResponseBody{
		TotalGB: float64(v.Total) / GB,
		UsadoGB: float64(v.Total-v.Available) / GB,
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

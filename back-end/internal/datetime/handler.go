package datetime

import (
	"encoding/json"
	"net/http"
	"time"
)

type ResponseBody struct {
	Date string `json:"date"`
	Time string `json:"time"`
}

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /datetime/info/", h.GetInfo)
}

func (h *Handler) GetInfo(w http.ResponseWriter, req *http.Request) {
	now := time.Now()

	rb := ResponseBody{
		Date: now.Format("02/01/2006"),
		Time: now.Format("15:04"),
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rb)
}

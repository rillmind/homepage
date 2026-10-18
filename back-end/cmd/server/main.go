package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/rillmind/homepage/back-end/internal/pcInfo"
)

func main() {
	mux := http.NewServeMux()

	mh := pcInfo.NewHandler()
	mh.RegisterRoutes(mux)

	server := &http.Server{
		Addr:         ":2306",
		Handler:      mux,
		ReadTimeout:  time.Second * 5,
		WriteTimeout: time.Second * 10,
	}

	fn := func() {
		log.Printf("Servidor rodando em http://localhost%s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Erro no servidor: %v", err)
		}
	}

	// Roda o servidor numa goroutine, porque ListenAndServe bloqueia
	// e a main precisa continuar livre para esperar o sinal de desligamento.
	go fn()

	// Canal que recebe os sinais do sistema operacional. O buffer de 1 garante
	// que o sinal não se perca se chegar antes de alguém estar lendo o canal.
	stop := make(chan os.Signal, 1)
	// Redireciona SIGINT (Ctrl+C) e SIGTERM (kill, make stop) para o canal,
	// em vez de deixar o Go encerrar o processo imediatamente.
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	// Bloqueia a main aqui até um desses sinais chegar.
	<-stop

	// Contexto com prazo de 5 segundos para o desligamento: depois disso,
	// o Shutdown desiste de esperar as requisições em andamento.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	// Libera os recursos do contexto quando a main terminar.
	defer cancel()

	log.Println("Desligando servidor...")
	// Graceful shutdown: para de aceitar conexões novas e espera as requisições
	// ativas terminarem (ou o prazo do ctx estourar). Isso faz o ListenAndServe
	// retornar http.ErrServerClosed, que a goroutine acima ignora de propósito.
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Erro ao desligar servidor: %v", err)
	}
}

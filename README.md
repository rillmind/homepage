<div align="center">

# homepage

Página inicial para o meu servidor caseiro: uma tela só com o estado da máquina,
atalhos e informações do dia a dia, acessível de qualquer dispositivo da rede.

[![Go](https://img.shields.io/badge/Go-1.26-00ADD8?style=flat-square&logo=go&logoColor=white)](https://go.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Bun](https://img.shields.io/badge/Bun-runtime-000000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)
[![Catppuccin](https://img.shields.io/badge/tema-Catppuccin-cba6f7?style=flat-square)](https://catppuccin.com)

</div>

## A ideia

Quem tem um servidor em casa acaba com uma dúzia de abas abertas: um painel para ver
uso de memória, outro para ver se o serviço X está de pé, o IP anotado em algum canto.
O objetivo deste projeto é juntar isso numa homepage simples, que eu possa deixar
como página inicial do navegador.

O back-end roda no próprio servidor e lê as informações direto do sistema. O front
consulta essas informações a cada segundo e mostra tudo numa barra no topo e em
blocos na página.

Não é um produto pronto nem pretende competir com Homarr, Dashy e afins. É um projeto
pessoal, feito do jeito que eu quero usar e também para estudar Go e React.

## O que já funciona

- Uso de memória RAM em tempo real (total, usado e porcentagem)
- Data e hora vindas do servidor
- Barra de navegação com o layout base

Ainda estão fixos no código e vão virar dados reais: IP, uptime, indicador de ping,
busca rápida e configurações.

## Como funciona

```
┌──────────────┐   fetch a cada 1s   ┌───────────────────┐   gopsutil   ┌─────────┐
│  front-end   │ ──────────────────► │  back-end (Go)    │ ───────────► │ sistema │
│  React/Vite  │ ◄────────────────── │  :2306            │              └─────────┘
└──────────────┘        JSON         └───────────────────┘
```

Cada informação tem um handler próprio em `back-end/internal/` e um hook
correspondente no front (`useRam`, `useDatetime`). Adicionar um dado novo é,
basicamente, criar os dois e registrar a rota em `cmd/server/main.go`.

### Endpoints

| Método | Rota              | Resposta                                  |
| ------ | ----------------- | ----------------------------------------- |
| GET    | `/memory/info/`   | `{"totalGB": 15.29, "usadoGB": 6.64}`     |
| GET    | `/datetime/info/` | `{"date": "16/10/2026", "time": "02:43"}` |

## Rodando

Precisa de [Go 1.26+](https://go.dev/dl/) e [Bun](https://bun.sh).

```sh
git clone https://github.com/rillmind/homepage.git
cd homepage

make -C front-end install   # dependências do front
make run                    # sobe back e front em segundo plano
```

O back fica em `http://localhost:2306` e o front no endereço que o Vite mostrar
(por padrão `http://localhost:5173`; o log fica em `front-end/dev.log`).

Para parar ou reiniciar:

```sh
make stop
make restart
```

Também dá para controlar cada parte separadamente com `make run-back`,
`make stop-front` etc.

## Estrutura

```
homepage/
├── Makefile              orquestra back e front
├── back-end/
│   ├── cmd/server/       ponto de entrada do servidor HTTP
│   └── internal/
│       ├── memory/       uso de RAM
│       └── datetime/     data e hora
└── front-end/
    ├── assets/fonts/     JetBrains Mono Nerd Font
    └── src/
        ├── components/
        │   ├── Nav/      barra superior + useDatetime
        │   └── Memory/   bloco de memória + useRam
        └── Catppuccin.css
```

## Próximos passos

- [ ] Uptime e IP reais vindos do back-end
- [ ] Uso de CPU, disco e temperatura
- [ ] Status dos serviços que rodam no servidor
- [ ] Busca rápida funcionando
- [ ] Configurar a URL do back-end por variável de ambiente

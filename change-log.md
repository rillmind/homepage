# Changelog

Histórico das mudanças do projeto, commit a commit, do mais recente para o mais antigo.
As mensagens seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

## 2026-10-16

### `296e6fc` docs: adiciona README com a ideia do projeto e como rodar

README na raiz explicando a motivação do projeto, o que já funciona, como o front
conversa com o back, os endpoints disponíveis, como rodar com `make`, a estrutura
de pastas e os próximos passos.

- `README.md`

### `871ff8f` fix(front-end): carrega a fonte JetBrains Mono com @font-face

A fonte não estava carregando por três motivos:

- o `global.css` apontava para `JetBrainsMonoNerdFont-Regular.ttf`, que não existe no projeto;
- o caminho era `./assets/fonts/`, relativo a `src/`, mas as fontes ficam em `front-end/assets/fonts/`;
- o `src:` estava declarado dentro do seletor `*`, onde não tem efeito.

Agora as variantes Medium (peso 400) e Bold (peso 700) são registradas com `@font-face`
e `font-display: swap`, com `monospace` como fallback.

- `front-end/src/global.css`

### `ee52eb1` build: adiciona Makefile raiz para orquestrar back-end e front-end

Makefile na raiz que delega para os Makefiles de cada parte, permitindo controlar tudo
de um lugar só: `install`, `run`, `stop` e `restart`, além das variantes por parte
(`run-back`, `stop-front`, `restart-back` etc.).

- `Makefile`

### `78e284f` build(front-end): adiciona Makefile para controlar o servidor de dev

- `install` instala as dependências com Bun.
- `run` sobe o `bun dev` em segundo plano com `setsid`, redireciona a saída para
  `dev.log` e salva o PID em `.dev.pid`.
- `stop` encerra o grupo de processos inteiro a partir do PID salvo, o que derruba
  também os processos filhos do Vite.
- `restart` executa `stop` e `run`.

- `front-end/Makefile`

### `74e8404` feat(front-end): exibe uso de memória RAM

- Hook `useRam`: consulta `GET /memory/info/` a cada segundo (intervalo configurável)
  e devolve `{ totalGB, usadoGB }`, ou `null` enquanto carrega ou se o servidor estiver fora.
- Componente `Memory`: mostra o uso em GB e em porcentagem, com uma mensagem de
  carregamento enquanto os dados não chegam.
- `App` passa a renderizar o `Memory` abaixo da barra de navegação.

- `front-end/src/components/Memory/useRam.tsx`
- `front-end/src/components/Memory/Memory.tsx`
- `front-end/src/App.tsx`

### `502c48f` feat(front-end): adiciona barra de navegação com data e hora

- Hook `useDatetime`: consulta `GET /datetime/info/` a cada segundo e devolve
  `{ date, time }`, ou `null` enquanto carrega ou se o servidor estiver fora.
- Componente `Nav`: barra superior com logo, nome, status (ping, IP e uptime),
  data e hora, busca rápida, configurações e perfil. Por enquanto só a data e a hora
  vêm do back-end; IP e uptime ainda são fixos.
- Estilos da barra em `Nav.css`.
- `App` passa a renderizar o `Nav` e a importar o `global.css`.

- `front-end/src/components/Nav/useDatetime.tsx`
- `front-end/src/components/Nav/Nav.tsx`
- `front-end/src/components/Nav/Nav.css`
- `front-end/src/App.tsx`

### `255e6c4` style(front-end): adiciona tema Catppuccin e fonte JetBrains Mono

- Paleta Catppuccin como variáveis CSS (`--ctp-*`).
- Fontes JetBrains Mono Nerd Font nas variantes Medium e Bold.
- `global.css` importando o tema e aplicando a fonte; importado em `main.tsx`.

- `front-end/src/Catppuccin.css`
- `front-end/src/global.css`
- `front-end/src/main.tsx`
- `front-end/assets/fonts/JetBrainsMonoNerdFont-Medium.ttf`
- `front-end/assets/fonts/JetBrainsMonoNerdFont-Bold.ttf`

### `2e4ae56` chore(front-end): cria projeto React + Vite + TypeScript

Base do front gerada a partir do template do Vite:

- React 19 com o React Compiler habilitado via Babel.
- TypeScript, com configs separadas para o app e para o Node.
- Oxlint para lint, com as regras de hooks do React.
- Bun como gerenciador de pacotes (`bun.lock`).
- `index.css` com reset e variáveis base de cor; `App.tsx` ainda vazio.
- `.gitignore` do template, mais o `.dev.pid` usado pelo Makefile.

### `e0e8797` build(back-end): adiciona Makefile com alvos build, run e stop

- `install` baixa as dependências do Go.
- `build` compila o servidor para `bin/main`.
- `run` compila e sobe o binário em segundo plano.
- `stop` encerra o servidor com `SIGTERM`.
- `restart` executa `stop` e `run`.

- `back-end/Makefile`

### `253e648` feat(back-end): adiciona endpoint de data e hora

- Handler `datetime` com a rota `GET /datetime/info/`, que retorna a data no formato
  `dd/mm/aaaa` e a hora no formato `hh:mm`, ambas do relógio do servidor.
- Rota registrada no `main.go`.

- `back-end/internal/datetime/handler.go`
- `back-end/cmd/server/main.go`

### `c667f4b` feat(back-end): adiciona servidor HTTP com endpoint de memória

Primeiro commit do projeto.

- Servidor HTTP na porta `2306` usando o `ServeMux` da biblioteca padrão, com timeouts
  de leitura (5s) e escrita (10s).
- Graceful shutdown: ao receber `SIGINT` ou `SIGTERM`, o servidor espera até 5s para
  terminar as requisições em andamento antes de desligar.
- Handler `memory` com a rota `GET /memory/info/`, que usa o
  [gopsutil](https://github.com/shirou/gopsutil) para ler a memória do sistema e
  retorna `totalGB` e `usadoGB` (total menos disponível).
- Header `Access-Control-Allow-Origin: *` para o front conseguir consumir a API.
- `bin/` no `.gitignore`.

- `back-end/cmd/server/main.go`
- `back-end/internal/memory/handler.go`
- `back-end/go.mod`, `back-end/go.sum`
- `back-end/.gitignore`

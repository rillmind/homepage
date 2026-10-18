# Changelog

Histórico das mudanças do projeto, commit a commit, do mais recente para o mais antigo.
As mensagens seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

## 2026-10-17

### `commit atual` docs: atualiza o changelog com os commits de 2026-10-17

- Entradas para os commits de `d282131` a `eadcee5`.
- A entrada mais recente do changelog passa a se chamar "commit atual", sem hash,
  porque um commit não consegue conter o próprio hash. Na atualização seguinte ela
  ganha o hash real.

- `change-log.md`

### `eadcee5` feat(front-end): adiciona layout principal com sidebar e monitor

- Componente `Main` coloca a `Sidebar` ao lado do conteúdo (`display: flex`) e guarda
  o item selecionado em `useState`, repassando `selected` e `onSelect` por props.
- O conteúdo fica num `<main>` com o `Monitor` e espaço reservado para a área de serviços.
- `App` passa a renderizar `Nav` e `Main`; o import duplicado de `global.css` sai,
  porque o `main.tsx` já o importa.
- Remove o componente `Memory` antigo, substituído pelo card dentro do `Monitor`.

- `front-end/src/components/Main/Main.tsx`, `front-end/src/components/Main/Main.css`
- `front-end/src/App.tsx`
- `front-end/src/components/Memory/` (removido)

### `713431a` feat(front-end): adiciona painel Monitor com card de memória

- `Monitor`: grid com 5 colunas para cards de monitoramento; por enquanto só o de memória
  está ativo.
- Card `Memory`: mostra o uso em GB, o total e a porcentagem, com uma barra de progresso.
  Usa o hook `useRam`, que saiu de `components/Memory/` e veio para dentro do `Monitor`.
- `ProgressBar`: barra reutilizável que recebe `value` e `max`, limita o preenchimento
  entre 0% e 100% e anima a mudança de largura.
- As props `value` e `max` do `ProgressBar` ainda não têm tipo, então o `tsc` acusa
  `any` implícito.

- `front-end/src/components/Monitor/Monitor.tsx`, `Monitor.css`
- `front-end/src/components/Monitor/Memory/Memory.tsx`, `Memory.css`, `useRam.tsx`
- `front-end/src/components/Monitor/ProgressBar/ProgressBar.tsx`, `ProgressBar.css`

### `55b75c1` feat(front-end): adiciona componente Sidebar com item selecionado

- Lista de navegação com Overview, Network e Server Logs.
- Recebe `selected` e `onSelect` por props: destaca o item ativo com a cor `mauve`
  e avisa o componente pai quando outro item é clicado.
- Efeito de hover com transição de cor.

- `front-end/src/components/Sidebar/Sidebar.tsx`, `Sidebar.css`

### `1ab6532` feat(front-end): redesenha a barra de navegação

- Troca os ids por classes e o `<main>` por uma `div.navbarContainer`, liberando a
  tag `<main>` para o conteúdo da página.
- Adiciona ícones de relógio e lupa, campo de busca rápida e avatar de perfil.
- Remove as variáveis de cor locais e passa a usar as do Catppuccin; medidas em `rem`.

- `front-end/src/components/Nav/Nav.tsx`, `Nav.css`

### `8163b36` style(front-end): aplica o tema Mocha pela classe no html e usa box-sizing border-box

- O Mocha deixa de valer no `:root` e passa a vir da classe `mocha` no `<html>`.
  O exemplo de estilo do `body` sai do `Catppuccin.css`.
- `box-sizing: border-box` em todos os elementos (incluindo `::before` e `::after`):
  padding e borda passam a contar dentro da largura e da altura definidas.
- Fonte base de 20px e cor de fundo no `:root`.

- `front-end/index.html`
- `front-end/src/Catppuccin.css`, `front-end/src/global.css`, `front-end/src/index.css`

### `6e4fc7e` docs(back-end): comenta o graceful shutdown no main.go

Comentários explicando a goroutine do servidor, o canal de sinais, o `signal.Notify`,
o prazo de 5s do contexto e por que o `Shutdown` faz o `ListenAndServe` retornar
`http.ErrServerClosed`.

- `back-end/cmd/server/main.go`

### `3c6b5e3` refactor(back-end): unifica os handlers de memória e data/hora no pacote pcInfo

- Os pacotes `memory` e `datetime` viram um único handler `pcInfo`, que registra as
  mesmas rotas `GET /memory/info/` e `GET /datetime/info/`. A API não muda.
- `main.go` registra só o handler `pcInfo`.

- `back-end/internal/pcInfo/handler.go`
- `back-end/internal/memory/` e `back-end/internal/datetime/` (removidos)
- `back-end/cmd/server/main.go`

### `5671c8b` build: adiciona alvos de logs e roda o back-end desacoplado do terminal

- `logs`, `logs-back` e `logs-front` acompanham os logs com `tail -f`. O Ctrl+C encerra
  só o `tail` e a aplicação continua rodando, porque ela está em outra sessão (`setsid`).
- O back-end passa a subir com `setsid` e gravar a saída em `server.log`, que entra no
  `.gitignore`.

- `Makefile`, `back-end/Makefile`, `front-end/Makefile`
- `back-end/.gitignore`

### `7cf3d83` build: adiciona alvo start como alias de run

- `Makefile`

## 2026-10-16

### `d282131` docs: adiciona changelog com o histórico de cada commit

Este arquivo, com uma entrada por commit desde o início do projeto.

- `change-log.md`

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

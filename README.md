
# CHALLENGE FURIA - TELEGRAM BOT

*Bot programado para ser um fan service aonde se possa consultar partidas, line-up e notícias do time de CS da FURIA*


![Logo](https://yt3.googleusercontent.com/_QDHD8FYiV_Xhk4pdtzme9OOtbg6LMCOcSz3-Sv0AVUbSccWbtQJlIbk2sIEiBbQsIgwn64onQ=s900-c-k-c0x00ffffff-no-rj)


## Demonstração

![Logo](https://cdn.discordapp.com/attachments/1059966298324467773/1368772824780640266/image.png?ex=68197087&is=68181f07&hm=b2be441df8d22da20650bab80d6f5800ed37a390ee8ba512fb388138c81811a6&)


## Funcionalidades

- Listar próximos jogos do time de CS da FURIA
- Resultado dos ultímos jogos do time de CS da FURIA
- Listar a LINE-UP atual do time de CS da FURIA
- Mostra as últimas nóticas do tweeter da FURIA relacionadas ao CS


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`TOKEN` = "Coloque seu TOKEN do telegram"

`PANDA_TOKEN` = "Coloque seu TOKEN da PandaScore"

`TWITTER_TOKEN` = "Coloque seu TOKEN da X API"


## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:guialves50/furia-challange-telegrambot.git
```

Entre no diretório do projeto

```bash
  cd telegrambot
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Stack utilizada

**Back-end:** 
- Node, 
- TypeScript, 
- Grammy


## Dependências
- PandaScore API
- X API
## Limitações

Duas funcionalidades (Resultados e Notícias) são dependentes de API externas para que elas funcionem (Resultados: PandaScore | Notícias: X API) devido o protótipo usar a versão gratuita destas API's algumas informações estão mockadas no projeto ou tem limitações, como por exemplo, a resposta da X API é a cada 15 minutos, caso seja feito outra requisição nesse intervalo ele devolve status code 429


## Autores

- [@guialves50](https://github.com/guialves50)

import { InlineKeyboard } from "grammy";

// Simula dados vindos de um banco ou API
const categorias = ["Próximos jogos da FURIA", "Resultados & estatísticas", "Perfil dos jogadores", "Notícias", "Alertas e notificações"];

export function buildCategoryMenu(): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  categorias.forEach((categoria) => {
    keyboard.text(categoria, `cat:${categoria}`).row();
  });

  return keyboard;
}

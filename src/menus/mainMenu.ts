import { InlineKeyboard } from "grammy";

const categorias = ["Próximos jogos da FURIA", "Resultados", "Perfil dos jogadores", "Notícias"];

export function buildCategoryMenu(): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  categorias.forEach((categoria) => {
    keyboard.text(categoria, `cat:${categoria}`).row();
  });

  return keyboard;
}

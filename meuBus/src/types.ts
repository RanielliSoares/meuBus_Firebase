export type RootStackParamList = {
  Splash: undefined;
  Home: { cidade: string }; // Home agora aceita o parâmetro cidade
  ValidatCidade: undefined; // Nova tela ValidatCidade
  Linhas: { cidadeId: string };
};

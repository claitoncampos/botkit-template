//
// Feature para permitir o bot interagir com os usuários
// bot: Olá, eu sou o S.A.M, seu assistente pessoal
// bot: Em que posso ajudar?
// user: Terá algumas opções para interação com o bot
//
module.exports = function (controller) {

    controller.hears(['activities'], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            var question = "Here are a few proposed DevNet activities:";
            question += "<br/> `1)` Verificar o status da rede (**rede**)";
            question += "<br/> `2)` Total de pessoas conectadas no Wi-Fi (**wifi**)";
            question += "<br/> `3)` Temperatuda da loja (**loja**)";
            question += "<br/> `4)` Iluminacao da loja (**iluminacao**)";
            question += "\n\O que voce gostaria de fazer?<br/>_(Digite um numero, escreva a **palavra chave** ou" +
                "apenas escreva cancel)_";
            convo.ask(question, [
                {
                    pattern: "1|rede|status",
                    callback: function (response, convo) {
                        convo.say("Um momento por favor, estou coletando todas as informacoes");
                        convo.next();
                    },
                }
                , {
                    pattern: "2|wifi|pessoas",
                    callback: function (response, convo) {
                        convo.say("Informacoes sobre a saude da rede wi-fi e quantidade de pessoas conectadas");
                        convo.next();
                    },
                }
                , {
                    pattern: "3|temperatura",
                    callback: function (response, convo) {
                        convo.say("Esta eh a temperatura atual");
                        convo.next();
                    },
                }
                , {
                    pattern: "cancel|cancelar|stop",
                    callback: function (response, convo) {
                        convo.say("Ok, cancelando...");
                        convo.next();
                    },
                }
                , {
                    default: true,
                    callback: function (response, convo) {
                        convo.gotoThread('bad_response');
                    }
                }
            ]);

            // Bad response
            convo.addMessage({
                text: "Desculpe, Eu nao entendi.",
                action: 'default',
            }, 'bad_response');
        });
    });
};

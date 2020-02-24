//
// Feature para permitir o bot interagir com os usuários
// bot: Olá, eu sou o S.A.M, seu assistente pessoal
// bot: Em que posso ajudar?
// user: Terá algumas opções para interação com o bot
//
module.exports = function (controller) {

    controller.hears( 'sam', 'Sam', 'bom dia', 'ola', 'Ola', 'Bom dia', 'direct_message', function (bot, message) {

        bot.startConversation(message, function ( (err, convo)) {

            var question = "O que você gostaria de verificar?";
            question += "<br/> `1)` Verificar o status da rede (**rede**)";
            question += "<br/> `2)` Total de pessoas conectadas no Wi-Fi (**wifi**)";
            question += "<br/> `3)` Temperatuda da loja (**loja**)";
            question += "<br/> `4)` Iluminacao (**iluminacao**)";
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
            ])

        })

    } )

}
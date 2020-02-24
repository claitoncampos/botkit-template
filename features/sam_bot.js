//
// Feature para permitir o bot interagir com os usuários
// bot: Olá, eu sou o S.A.M, seu assistente pessoal
// bot: Em que posso ajudar?
// user: Terá algumas opções para interação com o bot
//

const { BotkitConversation } = require( 'botkit' );

module.exports = function (controller) {

    controller.hears( [ 'Ola','ola','OLA','ei','bom dia','sam','Sam','SAM' ], 'message,direct_message', async ( bot,message ) => {

        await bot.reply( message,'Ola!' );
//        await bot.reply( message, { markdown: 'Try `help` to see available commands' } );
      });

    const convo = new BotkitConversation( 'sam_chat', controller );

    convo.say( 'Ola, eu sou o S.A.M, seu assistente pessoal' );

}
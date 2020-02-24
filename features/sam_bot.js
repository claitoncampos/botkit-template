//
// Feature para permitir o bot interagir com os usuários
// bot: Olá, eu sou o S.A.M, seu assistente pessoal
// bot: Em que posso ajudar?
// user: Terá algumas opções para interação com o bot
//

    const { BotkitConversation } = require( 'botkit' );

    module.exports = function( controller ) {

        const convo = new BotkitConversation( 'sam_chat', controller );

        convo.say( 'Ola, eu sou o S.A.M, seu assistente pessoal' );
        convo.ask(
            'Em que posso lhe ajudar?',
            async( answer, convo, bot ) => {},
            'stated_sam'
        );
        convo.say( `Cool, I like {{ vars.stated_sam }} too!` );

        controller.addDialog( convo );

        controller.hears( 'sam', 'message,direct_message', async( bot, message ) => {

            await bot.beginDialog( 'sam_chat' );
        });

        controller.commandHelp.push( { command: 'sam', text: 'Pick a favorite sam (Botkit conversations)' } );

    }
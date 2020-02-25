//
// Feature para permitir o bot interagir com os usuários
// bot: Olá, eu sou o S.A.M, seu assistente pessoal
// bot: Em que posso ajudar?
// user: Terá algumas opções para interação com o bot
//
const { BotkitConversation } = require( 'botkit' );

module.exports = function ( controller) {

    const convo = new BotkitConversation( 'sam_chat', controller);

    convo.say( 'Ola, eu sou o S.A.M, seu assistente pessoal' );
    convo.ask( 'O que voce gostaria de verificar?',
        async (answer, convo, bot) => {},
        'stated_sam'
    );

    let question = 'Tenho algumas opcoes para lhe apresentar:\n';
    question += ' 1. Verificar o status da rede wi-fi (rede)\n';
    question += ' 2. Verificar quantidade de pessoas logadas na rede wi-fi (pessoas)\n';
    question += ' 3. Verificar a temperatura da loja (temperatura)\n';
    question += ' 4. Verificar a iluminacao da loja (iluminacao)\n';
    question += ' Para verificar qualquer das opcoes, digite o numero ou a palavra entre parenteses ou stop';

    convo.ask( question, [
        {
            pattern: '1|rede|status',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'menu_1');
            }
        },
    ]);

    // Menu option 1)
    convo.addMessage({
        text: 'Ok, um momento enquanto coleto todas as informacoes necessarias',
        action: 'default'
    }, 'menu_1');
};


    controller.addDialog( convo );

    controller.hears( 'sam', 'message,direct_message', async (bot, message) => {

        await bot.beginDialog( 'sam_chat' );
    });

    controller.commandHelp.push( { command: 'sam', text: 'Pick a Favorite sam (Botkit conversations)' } );

};
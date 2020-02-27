//
// Feature para permitir o bot interagir com os usuários
// bot: Olá, eu sou o S.A.M, seu assistente pessoal
// bot: Em que posso ajudar?
// user: Terá algumas opções para interação com o bot (ainda a ser definido)
//
const { BotkitConversation } = require( 'botkit' );

module.exports = function ( controller) {

    const convo = new BotkitConversation( 'sam_chat', controller);

    convo.say( 'Ola, eu sou o S.A.M, seu assistente pessoal' );

    let question = 'O que voce gostaria de verificar?:\n';
    question += '  1. Verificar se a rede wi-fi esta ativa: (rede)\n';
    question += '  2. Verificar a quantidade de pessoas logadas na rede wi-fi: (pessoas)\n';
    question += '  3. Verificar a temperatuda da loja: (temperatura)\n';
    question += '  4. Verificar o status da iluminacao: (iluminacao)\n';
    question += '(Digite um numero, (palavra) ou "stop")';

    convo.ask( question, [
        {
            pattern: '1|rede',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'menu_1' );
            }
        },
        {
            pattern: '2|pessoas',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'menu_2' );
            }
        },
        {
            pattern: '3|temperatura',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'menu_3' );
            }
        },
        {
            pattern: '4|iluminacao',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'menu_4' );
            }
        },
        {
            pattern: 'cancel|stop|cancelar',
            handler: async (response, convo, bot) => {
                await convo.gotoThread( 'action_cancel' );
            }
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await bot.say( 'Nao entendi...  \nTente novamente!' );
                await convo.repeat();
            },
        }
    ]);

    // Menu option 1)
    convo.addMessage({
        text: 'Ok, por favor aguarde enquanto verifico o status da rede',
        action: 'default'
    }, 'menu_1');

    // Menu option 2)
    convo.addMessage({
        text: 'Coletando o numero de pessoas logadas atualmente na rede wi-fi',
        action: 'default'
    }, 'menu_2');

    // Menu option 3)
    convo.addMessage({
        text: 'Verificando se a temperatura atual da loja',
        action: 'default'
    }, 'menu_3');

    // Menu option 4)
    convo.addMessage({
        text: 'Verificando o status da iluminacao da loja',
        action: 'default'
    }, 'menu_4');

    // Cancel
    convo.addMessage({
        text: 'Tudo bem, cancelando...',
        action: 'complete',
    }, 'action_cancel');


    controller.addDialog( convo );

    controller.hears( 'sam', 'message,direct_message', async (bot, message) => {

        await bot.beginDialog( 'sam_chat' );
    });


    controller.commandHelp.push( { command: 'sam', text: 'Pick a Favorite sam (Botkit conversations)' } );

};
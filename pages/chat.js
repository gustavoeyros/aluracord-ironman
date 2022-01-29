import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [ListaMensagem, setListaMensagem] = React.useState([]);
    /*
    - Usuário digita na textarea
    - Aperta enter para mandar a mensagem
    - Adicionar o texto na listagem 
    //Dev
    [X] Campo para digitar
    [] OnChange para mensagem e um if para o ENTER
    [] Lista de mensagens

    */
   function handleNovaMensagem(novaMensagem){
       const mensagem = {
            id: ListaMensagem.length +1,
            de: 'gustavoeyros',
            texto: novaMensagem,

       };
       setListaMensagem([
           mensagem,
           ...ListaMensagem, 
           
        ]);
       setMensagem('');
   }
   function botaoOk(event){
       if(event.type==='click'){
        event.preventDefault();
        handleNovaMensagem(mensagem)
       }
   }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: `url(/background.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensagens={[]} /> */}
                    <MessageList mensagens={ListaMensagem} />
                  {/*   {ListaMensagem.map((mensagemAtual)=>{
                        console.log(mensagemAtual);
                        return (
                            <li key={mensagemAtual.id}>
                            {mensagemAtual.de} : {mensagem.texto}
                            </li>
                        )
                    })} */}
                  
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        
                        <TextField
                        
                            value = {mensagem}
                            onChange={(event)=>{
                                const valor= event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event)=>{
                                if(event.key === "Enter"){
                                    event.preventDefault();
                                   handleNovaMensagem(mensagem)
                                }
                               
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals['000'],
                            }}
                        />
                            <Button
                    type='submit'
                    onClick= {botaoOk}
                    label='OK'
                    width='100%'
                    styleSheet={{
                        border: '0',
                        resize: 'none',
                        borderRadius: '5px',
                        padding: '6px 8px',
                        marginBottom: '12px'
                    }}
                    buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary[100],
                    mainColorLight: appConfig.theme.colors.primary[200],
                    mainColorStrong: appConfig.theme.colors.primary[900],
                    }}
                />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem)=>{
                return (
                    
            <Text
           key={mensagem.id}
            tag="li"
            styleSheet={{
               
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                }
            }}
        >
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: '8px',
                }}
            >
                <Image
                    styleSheet={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '8px',
                    }}
                    src={`https://github.com/gustavoeyros.png`}
                />
               
                
                <Text tag="strong">
                    {mensagem.de}
                </Text>
                <Text
                    styleSheet={{
                        marginTop: '4px',
                        fontSize: '10px',
                        marginLeft: '8px',
                        color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                >
                    {(new Date().toLocaleDateString())}
                </Text>
            </Box>
                    {mensagem.texto}
               
        </Text>
        
                );
            })}

            
        </Box>
    )
}
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import {useRouter} from 'next/router';
import {ButtonSendSticker} from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ3MjkxMSwiZXhwIjoxOTU5MDQ4OTExfQ.ainsdp8VmTA1zh1RLBSI06Hlud38-liCRc2j4ut_0Yw';
const SUPABASE_URL= 'https://jdzxnbgdijhmwtcusohb.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function mensagemTempoReal(adicionaMensagem){
   return supabaseClient.from('mensagens').on('INSERT', (respostaLive)=>{
      adicionaMensagem(respostaLive.new);
    }).subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [ListaMensagem, setListaMensagem] = React.useState([]);
    React.useEffect(()=>{
        const dadosSupabase = supabaseClient.from('mensagens').select('*').order('id', {ascending: false}).then(({data})=>{
            setListaMensagem(data)
        });
        mensagemTempoReal((novaMensagem)=>{
            setListaMensagem((valorAtualDaLista)=>{
                return [
                    novaMensagem, 
                    ...valorAtualDaLista,
                ]
            }); 
        });
    }, [])
  
   function handleNovaMensagem(novaMensagem){
       const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,

       };
       supabaseClient.from('mensagens').insert([mensagem]).then(({data})=>{
        
       }) 

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
                        backgroundColor: appConfig.theme.colors.neutrals[200],
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
                 <ButtonSendSticker
                 onStickerClick={((sticker)=>{
                     console.log('Sticker no bd', sticker);
                     handleNovaMensagem(':sticker:'+sticker)
                 })} />
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
                    styleSheet={{
                        color: 'white',
                        backgroundColor: 'transparent',
                        hover: {backgroundColor: 'blue'}
                    }}
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
   // console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
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
                    src={`https://github.com/${mensagem.de}.png`}
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
            {mensagem.texto.startsWith(':sticker:') ? (
                 <Image src={mensagem.texto.replace(':sticker:', '')}/>
            ): (mensagem.texto)}
                    
                  
               
        </Text>
        
                );
            })}

            
        </Box>
    )
}
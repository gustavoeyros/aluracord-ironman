import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';

function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }

function Title(props){
    const Tag = props.tag || 'h1';
    return (
        <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
        ${Tag} {
          color: white;
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
      </>
    )
}

//Componente React
/* function HomePage() {
    //JSX
    return (
    <div>
        <GlobalStyle/>
        <Title tag="h2">Boas-vindas de volta!</Title>
        <h2>Discord - Alura</h2>
        <style jsx>{`
      h1 {
        color: red;
      }
    `}</style>
    </div>
    )
  }
  export default HomePage */

  export default function PaginaInicial() {
    //const username = 'gustavoeyros';
    const [username, setUsername]= React.useState('');
    const roteamento = useRouter();
    const foto = 'https://thumbs2.imgbox.com/ab/51/ijNw6Rfx_t.jpg';
    const [DadosGithub, setDadosGithub] = React.useState('');
    React.useEffect(() => {
      fetch(`https://api.github.com/users/${username}`).then((RespostaDoServidor) =>{
        return RespostaDoServidor.json();
      }).then((RespostaConvertida) =>{
        console.log('RespostaConvertida', RespostaConvertida)
        setDadosGithub(RespostaConvertida);
      })
    }, [username]);
  
    return (
      <>
      
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary['000'],
            backgroundImage: 'url(/background.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals['200'],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit = {function(infosDoEvento){
                infosDoEvento.preventDefault();
                console.log('Testando')
                roteamento.push(`/chat?username=${username}`);
              
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas-vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
              
            
               <TextField
                value={username}
                onChange={function (event){
                  //local do valor
                  const valor = event.target.value;
                  //trocar o valor da variavel através do React
                  setUsername(valor);
                }}
                fullWidth
                placeholder= 'Coloque seu usuário do GitHub'
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals['000'],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[900],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              /> 
              <Button
                type='submit'
                label='Entrar'
                disabled = {username.length <3}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[100],
                  mainColorLight: appConfig.theme.colors.primary[200],
                  mainColorStrong: appConfig.theme.colors.primary[900],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
            
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                const foto = "url(/perfil.jpg)"
                   src = {
                    username.length>2 ? `https://github.com/${username}.png` : foto
                   }
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['000'],
                  backgroundColor: appConfig.theme.colors.neutrals[200],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                
               {username}
                
              </Text>
               <br></br>
              <Text
                variant="body3"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['000'],
                  backgroundColor: appConfig.theme.colors.neutrals[200],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username.length>2 ? [DadosGithub.location] : ''}
             
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
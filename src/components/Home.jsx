import { useState } from "react"
import { FaGithub, FaLinkedin, FaInstagram} from 'react-icons/fa';

import './index.css'



function Home() {
    const [url,SetUrl] = useState()
    const [shorturl,SetShortUrl] = useState()
    const [copied, setCopied] = useState(false);


    const HandleSubmit = (event) =>{
        event.preventDefault() // Para evitar que a pagina recarregue
        console.log(url)

        const longUrl = url

            fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`)
            .then(response => response.json())
            .then(data => {
                if (data.shorturl) {
                console.log('Link encurtado:', data.shorturl);
                SetShortUrl(data.shorturl)
                } else {
                console.error('Erro ao encurtar o link:', data.error);
                }
            })
            .catch(error => {
                console.error('Erro ao encurtar o link:', error);
            });

    }

   
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shorturl)
            .then(() => {
                console.log('Link copiado para a área de transferência');
                setCopied(true);
            })
            .catch(error => {
                console.error('Erro ao copiar o link:', error);
            });
    }


  return(

    <div className="card">
        <div className="textBox">
            <h2>Bem-vindo ao nosso Encurtador de Links!</h2>
            <h3>Encurte seus URLs facilmente</h3>
            <p>Com nosso encurtador de links, você pode transformar URLs longas em links curtos e fáceis de compartilhar. Basta inserir o URL longo na caixa de texto, clicar em "Enviar", e nós cuidaremos do resto. Compartilhe seus links de forma rápida e conveniente com o nosso serviço de encurtamento de URL.</p>
        </div>
        
        <div className="formBox">
            <form onSubmit={HandleSubmit}> 
                <div className="formInput">
                    <input type="text" name="url" className="form-control" placeholder="Insira a Url" 
                    onChange={ e => SetUrl(e.target.value)}/>
                </div>
                <button className="btn-send">Enviar</button>
            </form>
            <div>
            {shorturl && (
                    <div className="linkBox">
                        Seu link encurtado: <a href={shorturl} target="_blank" rel="noopener noreferrer">{shorturl}</a>
                        <button className="btn-copie" onClick={copyToClipboard}> {copied ? 'Copiado!' : 'Copiar Link'} </button>
                    </div>
                )}
            </div>
        </div>


        <footer className="footerBox">
                <div>
                        
                        <ul className="social-icons">
                            <li><FaGithub style={{ height:"40px", width:"40px"}}/> <a href="https://github.com/rasta-slaine" target="_blank" rel="noopener noreferrer"> GitHub</a></li>
                            <li><FaLinkedin style={{ height:"40px", width:"40px"}}/> <a href="https://www.linkedin.com/in/nathan-das-chagas-santos-862179185/" target="_blank" rel="noopener noreferrer"> LinkedIn</a></li>
                            <li> <FaInstagram style={{ height:"40px", width:"40px"}}/><a href="https://www.instagram.com/nathanslaine/" target="_blank" rel="noopener noreferrer"> Instagram</a></li>
                            {/* Adicione outros links para suas redes sociais aqui */}
                        </ul>
                 </div>
                 <div className="footerbox2">
                        <div className="footerText">
                                <p>Desenvolvido por Nathan Das Chagas Santos - © 2024</p>
                        </div>
                 </div>
             
        </footer>
        
    </div>

  )

} 



export default Home

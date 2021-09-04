import React, { Fragment } from 'react';
import './historia.css';

import ContainerPages from '../components/containerPages/containerPages';

class Historia extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="Nossa História"  img="historia/historia.png" />
        );
    }

    renderMain(){
        return(
            <div className='container-historia'>
                <p className='paragrafo-historia'>No começo do ano de 2001 o governo que assumia a Prefeitura de Tucano anulou com uma canetada um concurso público realizado pouco tempo atrás, no fim da anterior gestão. O golpe, que tinha a clara intenção de abrir espaço para o emprego de apoiadores no recente pleito, afetou majoritariamente professores, que foram imediatamente impedidos de trabalhar e tiveram seus contracheques zerados. No entanto, apesar do contexto quase coronelista em que ainda nos encontrávamos à época, com negação de direitos e abusos de poder político absolutamente normalizados, estes servidores municipais não ficaram calados.</p>

                <p className='paragrafo-historia'>Foram às ruas e ocuparam a prefeitura. Sem salários, bateram de porta em porta até conseguir a quantia necessária para financiar a instituição legal de um Sindicato. Mais tarde, conseguiram na justiça uma liminar que lhes garantiu o direito de comparecer a seus postos de trabalho. Impossibilitados até de tomar o transporte escolar, pegaram carona em trator para chegar às escolas longínquas onde estavam alotados. A partir de então, embora continuassem proibidos de trabalhar, podiam cumprir sua carga horária e assim voltar a reivindicar com pleno direito seus vencimentos.</p>

                <p className='paragrafo-historia'>A mobilização, no entanto, era algo sem precedentes em nossa cidade e gerou reações não só por parte do poder público. Se muitos outros funcionários públicos podiam entender perfeitamente a luta destes colegas, a maioria preferiu não endossar ou até mesmo se posicionar contra as manifestações por medo de represália política. Em um cenário em que cada trabalhador tinha que lidar por conta própria com um empregador do porte da gestão pública, não havia maneira de expressar interesses próprios. Era o velho “manda quem pode, obedece quem tem juízo”.</p>

                <p className='paragrafo-historia'>Foi neste contexto de luta que, em 24 de março desse mesmo ano, fundou-se o Sindicato dos Trabalhadores no Serviço Público Municipal de Tucano - SINDSMUT. Um sindicato que começou com a luta de uma minoria e hoje, 20 anos depois, é um dos mais ativos e combativos da região, contando com mais de mil servidores afiliados e chegando a representar todas as áreas do funcionalismo público municipal. E é por esta adesão do povo de Tucano à organização sindical que a situação do trabalhador hoje em nossa cidade, embora longe de ideal, já seja muito melhor do que naquele ano de 2001.</p>

                <p>“Sindicato forte se faz com participação popular”</p>
            </div>
        );
    }

}

export default Historia;
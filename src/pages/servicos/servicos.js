import React, { Fragment } from 'react';
import './servicos.css';

import ContainerPages from '../components/containerPages/containerPages';

class Servicos extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="Serviços" />
        );
    }

    renderMain(){
        return(
            <Fragment>
                <p>Confira na lista abaixo todos os convênios e parcerias que o Sindipetro Bahia oferece para os seus associados:</p>
                <p><em>Os interessados devem se dirigir à secretaria do Sindipetro Bahia (Rua Boulevard América, 55, Jardim Baiano) para solicitar uma carta de autorização de desconto. </em><em>O pagamento é de responsabilidade direta dos associados ou funcionários,&nbsp;titular ou dependente, não cabendo ao sindicato qualquer responsabilidade financeira sobre os serviços solicitados e/ou realizados.</em></p>
                <p>&nbsp;</p>
                <h5><strong>CONVÊNIOS</strong></h5>
                <p><strong>FTC – Faculdade de Tecnologia e Ciências</strong> – Desc. 10% a 30%<br/> Praça da Inglaterra, 02, Comércio – Salvador/BA<br/> Tel.: 0800 056 6666</p>
                <p><strong>Faculdade São Salvador</strong> – Desc. 30% na mensalidade<br/> Rua Professor Guiomar Florence, 191, Parque Bela Vista – Salvador/BA<br/> Tel.: (71) 2101-2300</p>
                <p><strong>Faculdade São Tomaz de Aquino</strong>&nbsp;– Desc. 30% na mensalidade<br/> Rua Professor Guiomar Florence, 191, Parque Bela Vista – Salvador-BA<br/> Tel.: (71) 2104-3333</p>
                <p><strong>Faculdade Santo Antônio</strong> – Desc. 30% na mensalidade<br/> Rua Conselheiro Junqueira, n/n Lagoa da Mata – Alagoinhas/BA<br/> Tel.: (75) 3421-4733</p>
                <p><strong>Fundação Visconde Cairu</strong> – Desc. 20 à 30%<br/> Rua do Salete, 50, Barris – Salvador/BA<br/> Tel: (71) 2108-8505</p>
                <p><strong>Faculdade Estácio de Sá</strong> – Valores do desconto conforme tabela na faculdade<br/> <span class="LrzXr">Rua Xingu, 179, Stiep – Salvador/BA</span><br/> Tel.: (71) 4003-6767</p>
                <p><strong>Unyleya Editora e Cursos S.A<br/> </strong>Graduação EAD com desconto de até 30% e Pós Graduação EAD desconto até 50%<br/> <span class="LrzXr">Av. Tancredo Neves, 1632 – 301, Caminho das Árvores – Salvador/BA</span><br/> Tel.: (71) 3311-6622</p>
                <p><strong>Instituto Salvador de Ensino e Cultura (Isec)</strong> – Desc. 10%<br/> Av. Jorge Amado, Imbuí – Salvador/BA<br/> Tel.: (71) 3496-4050</p>
                <p><strong>Instituto Baiano de Ensino Superior (Ibes)</strong> – Desc. 10%<br/> Av. Jorge Amado, Imbuí – Salvador/BA<br/> Tel.: (71) 3496-4050</p>
                <h5><strong><br/> PÓS GRADUAÇÃO</strong></h5>
                <p><strong>Inbec</strong> – Desc. 10 à 15%<br/> Rua Rua Jacobina, 64, Edf. Empresarial Rio Vemelho, sala 201, Rio Vermelho – Salvador/BA<br/> Tel.: 3491-0955</p>
                <h5><strong><br/> ESCOLA E COLÉGIO</strong></h5>
                <p><strong>Colégio Nossa Senhora da Luz</strong> – Desc. 15%<br/> Rua Ceara, 85, Pituba – Salvador/BA<br/> Tel.: (71) 3248-7403</p>
                <p><strong>Creche Escola Petit Câlin</strong><br/> Desconto 15% no Grupo 2, Grupo 3 e Grupo 4 e desconto de 20% no grupo 5<br/> Rua Praia de Itapuã, quadra D20, Loteamento 0001, Vilas do Atlântico – Lauro de Freitas/BA<br/> Tel.: (71) 3024-6020</p>
                <p><strong>Colégio Integral</strong> – Desc. de 25% do grupo 2 ao 3º ano do ensino médio<br/> Av. Fernandes Menezes de Góes, 570, Pituba – Salvador-BA<br/> Tel.: 71) 2101-5000</p>
                <p><strong>Colégio Acadêmico</strong> – Desc. 30 à 50% (a depender do curso e turno)<br/> Rua do Pará, 301, Pituba – Salvador-BA<br/> Tel.: (71) 3345-0140</p>
                <h5><strong><br/> CLINICAS/LOJAS</strong></h5>
                <p><strong>Boutique dos olhos</strong> – Desc. 50%<br/> Av. Jose Leite, 182, Torre 11, 002, Caji- Lauro de Freitas/BA<br/> Tel.: (71) 9 8332.0996 / 9 9219.8379</p>
                <p><strong>Clínica de psicologia TAO.PSI </strong>– 1ª consulta grátis e 50% de desconto nas outras consultas<br/>Av. Tancredo Neves, 909, Edf. André Guimarães Business Center, sala 503, Caminho das Árvores – Salvador/BA. <br/>Tel.: (71) 9 9969-3100<strong></strong></p>
                <p><strong>Clinica Oftalmológica de Villas</strong> – Desc. 15%<br/> Av. Luís Tarquínio Pontes, 2580, Ed. Viças Trade Center, sala 202 e 203 – Lauro de Freitas/BA<br/> Tel.: (71) 3037-3744 / (71) 9 9969-3100</p>
                <p><strong>Clinica Meu Implante</strong><br/> Av. ACM, 2487, Edf. Fernandez Plaza, 2487 s/913, Cidadela Center – Salvador/BA<br/> Tel.: (71) 3355-0735 / 9 8209-5556</p>
                <p><strong>Jubiabá Veículos Ltda</strong><br/> Av. Presidente Dutra, 2771, Santa Mônica – Feira de Santana/BA</p>
                <p><strong>Jacuípe Veículos Ltda.</strong><br/> Av. Eduardo Fores da Mota, 825 – Feira de Santana/BA</p>
                <p><strong>Jacuípe Veículos Ltda.</strong><br/> Av. Presidente Dutra, 1180, Santa Mônica – Feira de Santana/BA</p>
                <p><strong>Norauto Veículos Ltda</strong><br/> Av. Presidente Dutra, 849, Centro – Feira de Santana/BA</p>
                <p><strong>Brune Veículos Ltda.</strong><br/> Av. Luís Viana, 6700, Trobogy – Feira de Santana/BA</p>
                <p><strong>Morena Veículos</strong><br/> Av. Luís Eduardo Magalhães, 3301, Cabula – Salvador/BA</p>
                <p><strong>RPK Hospital Med. Veterinária Ltda.</strong><br/> Desconto de 15% à vista; 10% no débito; 5% no cartão de crédito<br/> Rua Território do Guaporé, 244, Pituba – Salvador-BA<br/> Tel. (71) 3240-0032</p>
                <p><strong>Queiroz Pet Shop Ltda.</strong><br/> Desc. de 15% à vista; 10% no débito; 5% no cartão de crédito<br/> Rua Território do Guaporé, 244, Pituba – Salvador/BA<br/> Tel.: (71) 3240-0032</p>
            </Fragment>
        );
    }

}

export default Servicos;
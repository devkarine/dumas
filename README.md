# 🖥️ Dumas

## 📜 Descrição

  Uma plataforma web responsiva, feita em React com Typescript que nos conecta com excelentes chefes de cozinha próximos a nós.

## 🔗 Links Úteis

  <a href="https://www.figma.com/file/LK8CW3OQ04g5UVSDFVaeq2/teste1?type=design&node-id=0-1&mode=design&t=hxOZ7ETVxXjpEnhW-0" target= "_blank">Design Figma</a>  
  <a href="/" target= "_blank">Acrescentar aqui</a>  
  <a href="/" target= "_blank">Acrescentar aqui</a>  

## 📋 Guia de Padronização

- Será usado versão 18 do node;
- Nomes de variáveis e funções devem seguir o padrão camelCase;
- Valores imutáveis devem seguir o pradrão SNAKE_UPPERCASE_WITH;
- Apenas um component react por arquivo, sem uso de export default;
- Arquivos e pastas devem seguir o padrão camelCase;
- Components devem estar numa pasta com o nome do component em PascalCase;
- A pasta do componente terá: index.tsx - arquivo do componente, styled.ts - syled-component, <component>.test.ts - arquivo de teste;
- Quando o componente necessitar de mais de uma tipagem, colocar as tipagens num arquivo chamado types.ts dentro da pasta do componente;
- Tipagem de props deve seguir o padrao ComponentNameProps;
- Todos os arquivos deverão estar nas suas devidas pastas, conforme está estruturado o repositório;
- Todo o código-fonte deve ser escrito em inglês. Isso inclui nomes de variáveis, funções, classes, etc;
- Todos os commits devem seguir a  convenção de commits semânticos no tempo presente, ex: "adiciona tal funcionalidade";

## 🎲 Tecnologias e Bibliotecas

## 🔧 Funcionalidades

### 🔓 Área de Usuários não Logados:

- Deverão ser criadas 3 telas: Login, Cadastro e Recuperar Senha conforme demonstrado no Mock-up de baixa resolução.

#### Autenticação:

- Login
- Sign up (Registro)
- Autocompletar o endereço
- Validação de formulário
- Recuperação de senha

### 🔒 Área do Usuário logado (Consumidor):

- Aqui fica a critério de cada grupo a quantidade de telas. Devem existir telas de: Home, Carrinho e Prato.
- Telas adicionais ficam a critério dos grupos.

#### Home:

- Lista de pratos/chefs próximos
- Mapa com a localização do usuário e chefs próximos
- Lista infinita de outros pratos disponíveis
- Ícone para o carrinho de compras
- Lista de pratos favoritos
- Barra de Pesquisa por chefs e pratos.

#### Edição do Usuário:

- Edição de dados do usuário:
- Salvar endereços do consumidor (possibilidade de vários endereços)
- Adição e edição de números de telefone

#### Carrinho:

- Simulação de checkout com opções de pagamento (link ou QR code)
- Escolha ou adição de endereço
- Opção de retirada de produto do Carrinho

#### Página de Detalhes do Produto:

- Informações: Nome do prato, nome do chef, descrição, adição ao carrinho, preço
- Mapa interativo exibindo a distância entre o usuário e o chef/prato
- Avaliação em forma de nota ou estrelas
- Opção de "like" e "dislike" no prato
- Lista de pratos do mesmo chefe

## Instalando e executando o Projeto

### Clonar o Projeto

      https://git.raroacademy.com.br/francisco.jefferson/projeto-final.git

### Acesse a pasta do projeto no terminal/cmd

      cd projeto-final

### Instalar dependências

      npm install

### Execute a aplicação em modo de desenvolvimento

      npm run dev

## 💻 Telas

<img src="" alt="Gif exibindo uma demonstração do site">

> <a href="" target= "_blank">Acesse a página online</a>

## 👩‍💻 Desenvolvedores

<table align="center">
   <tr>
    <td align="center">
      <div>
        <img src="https://media.licdn.com/dms/image/D4D03AQGdtah92H0PvA/profile-displayphoto-shrink_200_200/0/1688405693654?e=1700092800&v=beta&t=8K1bD7bMKHb7C12qVE4w0msU6-sS6RbxgNavbfpPYhw" width="120px;" alt="Foto de Carolina"/><br>
          <b> Carolina Alves Ribeiro </b><br>
          <b> Desenvolvedora Web Frontend / Head de Design </b><br>
            <a href="https://www.linkedin.com/in/carolinaalvesribeiro/" alt="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/ height="20"></a>


  </tr>

  </tr>

  <tr>
    <td align="center">
      <div>
         <img src="https://media.licdn.com/dms/image/D4D03AQHUjJ6lDYidWQ/profile-displayphoto-shrink_200_200/0/1675764205773?e=1700092800&v=beta&t=H5aB40KWbWU4viS4aogoYN7zwXGeBqBLO1sunYnVw5g" width="120px;" alt="Foto de Jefferson"/><br>
          <b> Francisco Jefferson Ferreira de Lima </b><br>
          <b> Desenvolvedor Web Frontend / Tech Lead </b><br>
            <a href="https://www.linkedin.com/in/devkarine/" alt="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/ height="20"></a>
            


  </tr>

  <tr>
    <td align="center">
      <div>
        <img src="https://media.licdn.com/dms/image/D4E03AQHOaaPMmL8djQ/profile-displayphoto-shrink_200_200/0/1678845688632?e=1700092800&v=beta&t=-5RN1UbL6IlJXUkxN8SEmHXTu7TDS-c8tin7T7NkyJU" width="120px;" alt="Foto de Karine"/><br>
          <b> Karine Pereira </b><br>
          <b> Desenvolvedora Web Frontend / P.O. </b><br>
            <a href="https://www.linkedin.com/in/jefferson-lima-40189525b/" alt="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/ height="20"></a>


  </tr>

</table>

## Cadastro de carro

**Requisitos funcionais**

- Deve ser possível cadastrar um novo carro.

**Regra de negócio**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de uma carro já cadastrado.
- O carro deve ser cadastrado como disponível por padrão.
- Não deve ser possível criar um carro sendo usuário padrão.

## Listagem de carros

**Requisitos funcionais**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio**

- O usuário não precisa estar logado no sistema.

## Cadastro de Especificação do carro

**Requisitos funcionais**

- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

**Regra de negócio**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não ser possível criar cadatrar uma especificação já existente para o mesmo carro.
- Não deve ser possível criar um carro sendo usuário padrão.

## Cadastro de imagens do carro

**Requisitos funcionais**

- Deve ser possível cadastrar a imagem do carro

**Requisitos não funcionais**

- Utilizar o multer para upload dos arquivos

**Regra de negócio**

- O usuário pode cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## Agendamento de aluguel

**Requisitos funcionais**

- Deve ser possível cadastrar um aluguel


**Requisitos não funcionais**


**Regra de negócio**

- O agendamento do alugul deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

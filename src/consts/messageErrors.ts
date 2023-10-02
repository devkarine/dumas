export const messageErrors = {
  email: {
    invalid: 'Insira um email válido',
    required: 'O campo Email é obrigatório'
  },
  password: {
    invalid: 'A senha deve ter pelo menos 6 caracteres',
    required: 'O campo Senha é obrigatório'
  },
  name: {
    invalid: 'Deve conter nome e sobrenome',
    required: 'Nome e sobrenome obrigatórios',
    test: 'validar-nome-completo'
  },
  password_confirm: {
    invalid: 'As senhas não coincidem',
    required: 'A confirmação de senha é obrigatória'
  },
  telephones_attributes: {
    number: {
      invalid: 'Número de telefone inválido',
      required: 'O telefone é obrigatório'
    }
  },
  addresses_attributes: {
    tipo_endereco: {
      required: 'O tipo do endereço é obrigatório'
    },
    zip_code: {
      invalid: 'O CEP deve conter 8 números',
      required: 'O CEP é obrigatório'
    },
    public_place: {
      required: 'A rua é obrigatória'
    },
    neighborhood: {
      required: 'O bairro é obrigatório'
    },
    number: {
      required: 'O número é obrigatório'
    },
    city_id: {
      required: 'A cidade é obrigatória'
    }
  }
};

export const routes = {
  login: '/entrar',
  signUp: {
    profile: '/cadastrar',
    address: '/cadastrar/endereco'
  },

  profile: '/perfil',
  recoverPassword: '/recuperarsenha',
  dish: (id = ':id') => `prato/${id}`,
  home: '/',
  cart: '/carrinho',
  checkout: '/carrinho/checkout',
  rating: '/carrinho/avaliar'

  // TODO: Adicionar rotas da area logada
};

export const apiRoutes = {
  dishes: '/dishes',
  dish: {
    like: (id: string) => `/dishes/${id}/like`,
    dislike: (id: string) => `/dishes/${id}/dislike`,
    detail: (id: string) => `/dishes/${id}`,
    rate: (id: string) => `/dishes/${id}/ratings`,
    ratings: (id: string) => `/dishes/${id}/ratings`
  },
  chef: {
    dishes: (id: string) => `chefs/${id}/dishes`,
    detail: (id: string) => `chefs/${id}`
  },
  chefs: '/chefs',
  state: {
    states: '/states',
    cities: (state: string) => `/states/${state}/cities`
  },
  client: {
    me: '/clients/me',
    update: '/clients/update',
    addresses: '/clients/addresses',
    telephone: '/clients/telephones'
  },

  addresses: {
    cep: (cep: string) => `/addresses/search_zip_code/${cep}`,
    myAddresses: '/clients/addresses'
  },

  order: {
    create: 'clients/orders'
  }
};

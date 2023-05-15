export const swaggerConfig = {
  openapi: "3.0.3",
  info: {
    title: "API Cadastro Cliente Madtrat",
    author: "https://github.com/CaioHAlves",
    contact: {
      name: "API Madtrat",
      url: "https://caiohalves.vercel.app",
      email: "caio.henriquealves@outlook.com"
    }
  },
  paths: {
    "/users/create": {
      post: {
        tags: ["User"],
        description: "Cria um usuario",
        parameters: [
          {in: "header", name: "auth", required: process.env.AMBIENT === "production", type: "string"}
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Users"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Usuario Criado com sucesso"
          }
        }
      }
    },
    "/users/get/{id}": {
      get: {
        tags: ["User"],
        description: "Busca um usuário por ID",
        parameters: [{
          in: "path",
          name: "id",
          required: true
        }, 
        {
          in: "header",
          name: "auth",
          required: process.env.AMBIENT === "production"
        }
        ],
        responses: {
          200: {
            description: "ok"
          }
        } 
      }
    },
    "/users/get": {
      get: {
        tags: ["User"],
        description: "Busca um ou mais usuario por filtros",
        parameters: [
          { in: "header", name: "auth", required: process.env.AMBIENT === "production" },
          { in: "query", name: "name" },
          { in: "query", name: "email" },
          { in: "query", name: "type" }
        ],
        responses: {
          200: {
            description: "ok"
          },
          422: {
            description: "Não foi possivel encontrar usuarios com esses filtros!"
          }
        }
      }
    },
    "/users/update/{id}": {
      patch: {
        tags: ["User"],
        description: "Atualiza um usuario",
        parameters: [
          {in: "header", name: "auth", required: process.env.AMBIENT === "production"},
          {in: "path", name: "id", required: true}
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",

                $ref: "#/components/schemas/Users"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Usuario alterado com sucesso"
          }
        }
      }
    },
    "/users/delete/{id}": {
      delete: {
        tags: ["User"],
        description: "Deleta um usuario por ID",
        parameters: [
          { in: "path", name: "id", required: true },
          { in: "header", name: "auth", required: process.env.AMBIENT === "production" }
        ],
        responses: {
          200: {
            description: "ok"
          },
          422: {
            description: "Não foi possivel deletar usuario!"
          }
        }
      }
    },
    "/users/auth": {
      post: {
        tags: ["User"],
        description: "Efetua Login de um usuário",
        parameters: [
          {in: "header", name: "auth", required: process.env.AMBIENT === "production", type: "string"}
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    description: "Email usuario",
                    example: "user@teste.com"
                  },
                  password: {
                    type: "string",
                    description: "Senha usuario",
                    example: "123456"
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Login efetuado com sucesso"
          }
        }
      }
    },
    "/customers/create": {
      post: {
        tags: ["Customers"],
        description: "Cria um novo cliente para usuario",
        parameters: [
          {in: "header", name: "auth", required: process.env.AMBIENT === "production", type: "string"}
        ],
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "ok"
          }
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Customers"
              }
            }
          }
        }
      }
    },
    "/customers/create-with-link/{userId}": {
      post: {
        tags: ["Customers"],
        description: "Cria um novo cliente para usuario atravez do link gerado na api",
        parameters: [
          {in: "header", name: "auth", required: process.env.AMBIENT === "production", type: "string"},
          {in: "path", name: "userId", required: true, type: "string"},
        ],
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "ok"
          }
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Customers",
              }
            }
          }
        }
      }
    },
    "/customers/cutomers-per-user": {
      get: {
        tags: ["Customers"],
        description: "Busca clientes por filtro",
        parameters: [
          { in: "header", name: "auth", required: process.env.AMBIENT === "production" },
          { in: "query", name: "userId" },
          { in: "query", name: "faseObra" },
          { in: "query", name: "dtVisita" },
          { in: "query", name: "dtProximaVisita" },
          { in: "query", name: "cliente" },
          { in: "query", name: "emailCliente" },
          { in: "query", name: "page" },
          { in: "query", name: "limit" }
        ],
        responses: {
          200: {
            description: "ok"
          },
          422: {
            description: "Não foi possivel obter os registros!"
          }
        }
      }
    },
    "/customers/create-link": {
      post: {
        tags: ["Customers"],
        description: "Gera link para cadastrar um cliente",
        parameters: [
          { in: "query", name: "userId", required: true },
          { in: "query", name: "auth", required: true }
        ],
        responses: {
          200: {
            description: "ok"
          },
          422: {
            description: "Não possivel realizar a requisição"
          }
        }
      }
    },
    "/update-customer/{id}": {
      patch: {
        tags: ["Customers"],
        description: "Atualiza dados de um Cliente",
        parameters: [
          {in: "header", name: "auth", required: process.env.AMBIENT === "production", type: "string"},
          {in: "path", name: "id", required: true, type: "string"}
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Customers"
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Users: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome usuario",
            example: "User Teste"
          },
          password: {
            type: "string",
            description: "Senha usuario",
            example: "123456"
          }
        }
      },
      Customers: {
        type: "object",
        properties: {
          userId: { type: "string", example: "x64oasdioeq77as" },
          data_visita: { type: "number", example: 183645000000 },
          data_proxima_visita: { type: "number", example: 183645000000 },
          fase_obra: { type: "string", example: "Obra teste" },
          observacao: { type: "string", example: "Obs teste" },
          cliente: { 
            type: "object",
            properties: {
              nome_cli: { type: "string", example: "Usuario Teste" },
              tel_cli: { type: "string", example: "19912345678" },
              email: { type: "string", example: "user@teste.com" }
            }
          },
          profissional: {
            type: "object",
            properties: {
              endereco: {
                type: "object",
                properties: {
                  bairro: { type: "string", example: "Bairro teste" },
                  cep: { type: "number", example: 123456 },
                  cidade: { type: "string", example: "Cidade Teste" },
                  estado: { type: "string", example: "Estado Teste" },
                  numero: { type: "number", example: 123456 },
                  rua: { type: "string", example: "Rua Teste" }
                }
              },
              nome_prof: { type: "string", example: "Prof Teste" },
              profissao: { type: "string", example: "Profissao Teste" },
              tel_prof: { type: "string", example: "19912345678" }
            }
          }
        }
      }
    }
  }
}
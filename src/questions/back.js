export const back = [
   {
        "ask": "Como executar um script PHP pela linha de comando?",
        "options": [
            "php script.php",
            "php -a script.php",
            "Não é possível", 
            "php -i script.php"
        ],
        "correct": "php script.php",
        "value": 1,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "Como PHP e javascript interagem?",
        "options": [
            "Carregando javascript de forma nativa no PHP",
            "Diretamente. Chamando a tag <scritp> no servidor",
            "Indiretamente. PHP é carregado pelo servidor e JS pelo cliente", 
            "Diretamente através do composer"
        ],
        "correct": "Indiretamente. PHP é carregado pelo servidor e JS pelo cliente",
        "value": 2,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "Qual a diferença entre require() e require_once()",
        "options": [
            "Não tem diferença",
            "require_once verifica se o arquivo já foi carregado",
            "require verifica se o arquivo já foi carregado",
            "require tem uma parametro a mais que require_once"
        ],
        "correct": "require_once verifica se o arquivo já foi carregado",
        "value": 1,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "Para que a função file_get_contents() é usada?",
        "options": [
            "Lê um arquivo e retorna a string do conteudo",
            "Grava a string de uma variável em um arquivo ",
            "Retorna o path de um arquivo",
            "Retorna o contet type de um arquivo"
        ],
        "correct": "Lê um arquivo e retorna a string do conteudo",
        "value": 1,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "Qual será o resultado deste script?",
        "image": require("../assets/images/back/php_question_hello.png"),
        "options": [
            "undefined variable",
            "hello",
            "world",
            "helloworld"
        ],
        "correct": "world",
        "value": 2,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "O construtor da classe pai é chamada de forma implicita pela classe filha?",
        "options": [
            "Sim",
            "Não, o construtor precisa ser chamado explicitamente como parent::constructor($value)",
            "Não, não é possível chamar o construtor da classe pai em PHP",
            "Sim, após o php 7.0",
        ],
        "correct": "Não, o construtor precisa ser chamado explicitamente como parent::constructor($value)",
        "value": 3,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "Qual será o resultado deste script?",
        "image": require("../assets/images/back/php_question_array_compare.png"),
        "options": [
            "resultaria em erro",
            "Array iguais",
            "Array diferentes",
            "Não é possível comparar array em php"
        ],
        "correct": "Array diferentes",
        "value": 2.5,
        "author": {
          "name": "Fabrício Cunha",
          "photo": require("../assets/images/baricio.png")
        }
    },
    {
        "ask": "No PHP 7.2, qual será o resultado deste script?",
        "image": require("../assets/images/back/php_question_array_compare.png"),
        "options": [
            "Erro de passagem de string para construtor",
            "Erro de acesso de propriedade privada",
            "10",
            "\"10\""
        ],
        "correct": "10",
        "value": 3,
        "author": {
          "name": "Evandro Ishy",
          "photo": require("../assets/images/evandro.jpg")
        }
    },
]
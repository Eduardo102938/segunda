# 🤖 Batalha de Modelos & Engenharia de Prompt (XML)
 ## 📝 Descrição do Projeto
Este projeto consiste em um experimento comparativo de Engenharia de Prompt utilizando a estrutura XML para orientar diferentes modelos de IA na criação de uma página HTML Single Page. O objetivo principal é avaliar a "capacidade de compreensão" e a precisão técnica de cada ferramenta ao seguir diretrizes de design e obrigatoriedades técnicas específicas.
 
Desenvolvido como parte da disciplina de **Engenharia de Prompt e Aplicações em IA**, o sistema testa a eficácia de prompts estruturados para gerar interfaces responsivas e minimalistas, focadas em um cenário real de e-commerce (Loja de Roupas). O experimento analisa desde o layout e paleta de cores até a eficiência no consumo de tokens.
 

*Figura 1: Ambiente de desenvolvimento e estrutura de prompt XML para geração de interfaces.*
 ## 🚀 Tecnologias e Modelos Testados
* **Estrutura:** Prompting em XML (Tags de tarefa, objetivo, design e métricas)
* **Linguagens Geradas:** HTML5, CSS3 (Design Responsivo)
* **Modelos Avaliados:** ChatGPT (GPT-4o/o1), Gemini, Claude (3.5 Sonnet), Qwen, DeepSeek, Grok, Maritaca.
 ## 📊 Resultados e Aprendizados
O experimento revelou diferenças significativas na interpretação de instruções estruturadas entre os modelos.
* **Claude 3.5 Sonnet se destacou:** Apresentou o melhor desempenho em termos de fidelidade ao HTML e usabilidade da interface final.
* **Eficiência de Tokens:** Observou-se uma variação drástica no consumo, desde 650 tokens (DeepSeek) até 4.880 tokens (Claude), evidenciando diferentes níveis de verbosidade para resultados similares.
* **Análise de Erros:** Alguns modelos (como GPT e Maritaca) apresentaram falhas no carregamento de imagens ou botões não funcionais, enquanto o Qwen surpreendeu com resultados próximos aos modelos de elite.
 
![Tabela de Comparação de Modelos e Tokens](IMAGEM_2_AQUI)
*Figura 2: Matriz comparativa de desempenho e métricas de tokens por modelo.*
 ## 🔧 Como Executar
1. **Estruturação:** Defina a tarefa dentro das tags `<tarefa>`, especificando o `<objetivo>` e o `<tema>`.
2. **Diretrizes:** Insira as especificações de `<layout>`, `<paleta_cores>` e `<tipografia>` no bloco de design.
3. **Validação:** Adicione a `<metrica_obrigatoria>` para que a IA retorne estatísticas de execução (ex: contagem de tokens).
 
![Exemplo de Estrutura de Prompt XML](IMAGEM_3_AQUI)
*Figura 3: Fluxo de processamento do prompt estruturado pela inteligência artificial.*
 
---
**Equipe:** Alana Araújo Policarpo, Eduardo Garrido de Almeida Junior, Felipe de Assis Lima.
 
[Voltar ao início](https://github.com/seu-usuario/seu-usuario)

const Login = {
    template: `
        <div>
                <div class="icon-login-cadastro">
                    <h2 class="h2-login">Login</h2>
                    <img class="icon-pokebola" src="/img/Iconpokemon.png">
                </div>
                    <input class="inputs" type="text" placeholder="   Nome de usuário" v-model="nome"><br>
                    <input class="inputs" type="password" placeholder="   Senha" v-model="senha"><br>
                    <button class="button" @click="fazerLogin">Entrar</button><br>
                    <p class="conta">Não tem uma conta? <a class="conta" href="#" @click="alterarLoginCadastro">Cadastre-se</a></p>
                    <div class="flex-button">
                        <input class="checkbox" type="checkbox" name="checkbox1" value="value1">
                        <p>Lembre de mim</p>
            </div>
        </div>
    `,
    data() {
        return {
            nome: '',
            senha: ''
        };
    },
    methods: {
        async fazerLogin() {
            try {
                const response = await fetch('https://jogo-web-com-banco-de-dados-azure.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        senha: this.senha
                    })
                });

                if (response.status === 200) {
                    alert('Login bem-sucedido.');
                    window.location.href = 'index.html';
                } else {
                    alert('Credenciais inválidas.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login.');
            }
        },
        alterarLoginCadastro() {
            this.$emit('alterar', 'Cadastro');
        }
    }
};

const Cadastro = {
    template: `
        <div>
            <div class="icon-login-cadastro">
                    <h2 class="h2-cadastro">Cadastre-se</h2>
                    <img class="icon-pokebola" src="/img/Iconpokemon.png">
            </div>
                    <input class="inputs" type="text" placeholder="   Nome de usuário" v-model="nome"><br>
                    <input class="inputs" type="email" placeholder="   Email" v-model="email"><br>
                    <input class="inputs" type="password" placeholder="   Senha" v-model="senha"><br>
                    <input class="inputs" type="password" placeholder="   Confirme a senha" v-model="confirmarSenha"><br>
                    <button class="button" @click="criarConta">Cadastrar</button><br>
                    <p class="conta">Já tem uma conta? <a class="conta" href="#" @click="alterarLoginCadastro">Login</a></p>
                    <div class="flex-button">
            </div>
        </div>
    `,
    data() {
        return {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        };
    },
    methods: {
        async criarConta() {
            if (this.senha !== this.confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }
            try {
                const response = await fetch('https://jogo-web-com-banco-de-dados-azure.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha
                    })
                });

                if (response.ok) {
                    alert('Conta criada com sucesso.');
                } else {
                    alert('Erro ao criar conta.');
                }
            } catch (error) {
                console.error('Erro ao criar conta:', error);
                alert('Erro ao criar conta.');
            }
        },
        alterarLoginCadastro() {
            this.$emit('alterar', 'Login');
        }
    }
};

const app = Vue.createApp({
    data() {
        return {
            componenteAtual: 'Login'
        };
    },
    methods: {
        alterarComponente(componente) {
            this.componenteAtual = componente;
        }
    },
    components: {
        Login,
        Cadastro
    }
});

app.mount('#app');

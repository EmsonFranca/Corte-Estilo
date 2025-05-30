document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if(menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if(nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Validação do formulário de agendamento
    const formAgendamento = document.getElementById('form-agendamento');
    
    if(formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const servico = document.getElementById('servico').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;
            
            if(nome && telefone && servico && data && horario) {
                // Simulação de envio
                alert('Agendamento realizado com sucesso! Entraremos em contato para confirmação.');
                formAgendamento.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validação de data/horário
    const dataInput = document.getElementById('data');
    const horarioInput = document.getElementById('horario');
    
    if(dataInput && horarioInput) {
        // Definir data mínima como hoje
        const hoje = new Date();
        const dd = String(hoje.getDate()).padStart(2, '0');
        const mm = String(hoje.getMonth() + 1).padStart(2, '0');
        const yyyy = hoje.getFullYear();
        dataInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
        
        // Ajustar horários disponíveis conforme o dia da semana
        dataInput.addEventListener('change', function() {
            const dataSelecionada = new Date(this.value);
            const diaSemana = dataSelecionada.getDay(); // 0=Domingo, 6=Sábado
            
            if(diaSemana === 0 || diaSemana === 1) { // Domingo ou segunda
                horarioInput.disabled = true;
                horarioInput.value = '';
                alert('Nossa barbearia está fechada aos domingos e segundas.');
            } else if(diaSemana === 6) { // Sábado
                horarioInput.disabled = false;
                horarioInput.setAttribute('min', '08:00');
                horarioInput.setAttribute('max', '17:00');
            } else { // Terça a sexta
                horarioInput.disabled = false;
                horarioInput.setAttribute('min', '09:00');
                horarioInput.setAttribute('max', '19:00');
            }
        });
    }
    
    // Ajustar altura do hero para dispositivos móveis
    function adjustHeroHeight() {
        const hero = document.querySelector('.hero');
        if(hero) {
            hero.style.height = window.innerHeight + 'px';
        }
    }
    
    window.addEventListener('resize', adjustHeroHeight);
    adjustHeroHeight();
});